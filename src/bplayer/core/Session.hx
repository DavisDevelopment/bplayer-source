package bplayer.core;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.chrome.FileSystem in Fs;

import bplayer.core.media.*;
import bplayer.core.Queue;

import haxe.Serializer;
import haxe.Unserializer;

using Lambda;
using tannus.ds.ArrayTools;
using Slambda;
using StringTools;
using tannus.ds.StringUtils;
using tannus.chrome.FileSystemTools;
using bplayer.core.media.GalleryTools;

class Session {
	/* Constructor Function */
	public function new():Void {
		queue = new Array();
		playing = {
			index: -1,
			time: 0
		};
	}

/* === Instance Methods === */

	@:access( bplayer.core.Player )
	public function pullFromPlayer(p : Player):Void {
		queue = new Array();
		for (index in 0...p.queue.length) {
			var m = p.queue.get( index );
			var url = getUrlForMediaProvider( m );
			if (url != 'error') {
				queue.push({url: url});
			}
		}
		if (p.provider != null) {
			playing.index = p.queue.indexOf( p.provider );
			playing.time = Math.floor( p.currentTime );
		}
	}

	@:access( bplayer.core.media.FileEntryMediaProvider )
	private function getUrlForMediaProvider(media : MediaProvider):String {
		if (Std.is(media, FileEntryMediaProvider)) {
			return Fs.retainEntry(cast (cast(media, FileEntryMediaProvider).entry));
		}

		return 'error';
	}

	/**
	  * output [this] Session to a ByteArray
	  */
	public function toByteArray():ByteArray {
		var out:ByteArray = new ByteArray();
		out.pushFloat( queue.length );
		for (m in queue) {
			out.pushFloat( m.url.length );
			out.pushString( m.url );
		}
		out.push(playing.index > -1 ? 1 : 0);
		if (playing.index > -1) {
			out.push( playing.index );
			out.pushFloat( playing.time );
		}
		return out;
	}

	public function pullFromByteArray(data : ByteArray):Void {
		data.seek( 0 );
		var len:Int = data.readInt32();
		for (i in 0...len) {
			queue.push({
				url: data.readString(data.readInt32())
			});
		}
		var isPlaying:Bool = (data.readByte() == 1);
		if ( isPlaying ) {
			playing.index = data.readByte();
			playing.time = data.readInt32();
		}
	}

	public function apply(player:Player, done:Void->Void):Void {
		var ep = queue.map.fn( _.url ).restoreAll();
		ep.then(function( entries ) {
			// var files:Array<WebFileEntry> = entries.filter.fn(_.isFile).map.fn(cast _);
			var loader = new FileSystemMediaLoader();
			loader.load(entries, function(providers) {
				var playlist = new Queue( providers );
				player.setQueue(playlist, false, function() {
					var nowPlaying = playlist.get( playing.index );
					player.load(nowPlaying, function() {
						player.currentTime = playing.time;

						done();
					});
				});
			});
			done();
		});
		ep.unless(function(error) throw error);
	}

	/**
	  * serialize [this] Session 
	  */
	@:keep
	public function hxSerialize(s : Serializer):Void {
		var w = s.serialize.bind();
		w( queue.length );
		for (item in queue) {
			w( item.url );
		}
		w( playing.index );
		w( playing.time );
	}

	/**
	  * unserialize [this] Session
	  */
	@:keep
	public function hxUnserialize(u : Unserializer):Void {
		queue = new Array();
		playing = {
			index: -1,
			time: 0
		};

		var v = u.unserialize.bind();
		
		var count:Int = v();
		for (i in 0...count) {
			queue.push({
				url: v()
			});
		}
		playing.index = v();
		playing.time = v();
	}

	/**
	  * check whether [this] is empty
	  */
	public inline function empty():Bool {
		return queue.empty();
	}

/* === Instance Fields === */

	public var queue : Array<SessionQueueItem>;
	public var playing : NowPlaying;

/* === Class Methods === */

	public static function fromPlayer(p : Player):Session {
		var sess = new Session();
		sess.pullFromPlayer( p );
		return sess;
	}

	public static function fromByteArray(data : ByteArray):Session {
		var s = new Session();
		s.pullFromByteArray( data );
		return s;
	}
}

typedef SessionQueueItem = {
	var url : String;
};

typedef NowPlaying = {
	var index : Int;
	var time : Int;
};

typedef NowPlayingDelta = {
	var index : Delta<Int>;
	var time : Delta<Int>;
};

typedef SessionDelta = {
	var queue : Delta<Queue>;
	var playing : NowPlayingDelta;
};
