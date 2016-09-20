package bplayer.core;

import tannus.ds.*;
import tannus.io.*;

import bplayer.core.media.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Queue {
	/* Constructor Function */
	public function new(?list : Array<MediaProvider>):Void {
		tracks = new Array();
		title = 'My Playlist';
		changed = new VoidSignal();

		if (list != null) {
			tracks = tracks.concat( list );
		}
	}

/* === Instance Methods === */

	/**
	  * add a MediaProvider to [this] Playlist
	  */
	public function push(m : MediaProvider):Void {
		if (!has( m )) {
			tracks.push( m );
			alt();
		}
	}
	public function pop():Null<MediaProvider> {
		var res = tracks.pop();
		alt();
		return res;
	}
	public function unshift(m : MediaProvider):Void {
		if (!has( m )) {
			tracks.unshift( m );
			alt();
		}
	}
	public function shift():Null<MediaProvider> {
		var res = tracks.shift();
		alt();
		return res;
	}
	public function copy():Queue {
		return new Queue(tracks.copy());
	}
	public function concat(q : Queue):Queue {
		return new Queue(tracks.concat( q.tracks ));
	}
	public function slice(pos:Int, ?end:Int):Queue {
		return new Queue(tracks.slice(pos, end));
	}

	/**
	  * sort [this] Queue using the given predicate
	  */
	public function sort(f : MediaProvider->MediaProvider->Int):Void {
		tracks.sort( f );
		alt();
	}

	/**
	  * insert a MediaProvider at the given index
	  */
	public function insert(m:MediaProvider, i:Int):Void {
		tracks.insert(i, m);
		alt();
	}

	/**
	  * move the given MediaProvider to the given index
	  */
	public function move(m:MediaProvider, index:Int):Void {
		if (has( m )) {
			remove( m );
		}
		insert(m, index);
	}

	/**
	  * check whether [this] contains the given MediaProvider
	  */
	public function has(m : MediaProvider):Bool {
		return tracks.has( m );
	}

	/**
	  * remove a MediaProvider from [this] Playlist
	  */
	public function remove(m : MediaProvider):Bool {
		var rem = tracks.remove( m );
		if ( rem ) {
			alt();
		}
		return rem;
	}

	/**
	  * get the given MediaProvider's index
	  */
	public function indexOf(m : MediaProvider):Int {
		return tracks.indexOf( m );
	}

	/**
	  * get the MediaProvider at the given index
	  */
	public function get(index : Int):Null<MediaProvider> {
		return tracks[index];
	}

	/**
	  * get the MediaProvider after the given one
	  */
	public function getNext(m : MediaProvider):Null<MediaProvider> {
		return get(indexOf( m ) + 1);
	}

	/**
	  * get the MediaProvider before the given one
	  */
	public function getPrevious(m : MediaProvider):Null<MediaProvider> {
		return get(indexOf( m ) - 1);
	}

	public function loadWith(player:Player, callback:Void->Void):Void {
		var stack = new AsyncStack();
		for (m in tracks) {
			stack.push(function( done ) {
				player.addMedia(m, null, done);
			});
		}
		stack.run(function() {
			callback();
		});
	}

	/**
	  * report that [this] Queue has been changed
	  */
	private inline function alt():Void {
		changed.fire();
	}

	public inline function empty():Bool return tracks.empty();

/* === Computed Instance Fields === */

	public var length(get, never):Int;
	private function get_length():Int return tracks.length;

/* === Instance Fields === */

	public var title : String;
	public var changed : VoidSignal;

	private var tracks : Array<MediaProvider>;
}
