package bplayer.core.old;

import tannus.sys.Path;
import tannus.sys.Mimes;
import tannus.sys.Mime;
import tannus.html.fs.WebFileEntry;
import tannus.html.fs.WebFile;
import tannus.ds.Task;
import tannus.ds.StandardTask;
import tannus.ds.AsyncStack;
import tannus.ds.AsyncPool;
import tannus.ds.Promise;
import tannus.ds.promises.*;

import bplayer.core.*;

import Std.*;
import Math.*;
import tannus.math.TMath.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.RandomTools;

@:access( bplayer.core.Player )
class TrackLoader extends StandardTask<String, Array<Track>> {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
		entries = new Array();
	}

/* === Instance Methods === */

	/**
	  * prepare to load the given Files
	  */
	public function load(list:Array<WebFileEntry>, done:Void->Void):Void {
		entries = list;

		perform( done );
	}

	/**
	  * perform [this] Task
	  */
	override private function action(done : Void->Void):Void {
		var pool:AsyncPool<Track> = new AsyncPool();
		result = new Array();

		/*
		if (player.shuffle && !restoring) {
			entries = entries.shuffle();
		}
		*/

		for (entry in entries) {
			loadEntry(pool, entry);
		}

		pool.run(function( res ) {
			/* -- collect the tracks that loaded into an Array -- */
			var tracks = new Array();
			for (track in res) {
				if (track.error == null) {
					tracks.push( track.value );
				}
				else {
					// errors.push(cast track.error);
				}
			}

			// append the Tracks to the Playlist
			player.playlist.addTracks( tracks );

			/* -- if the Player has already finished initializing, and there is not currently a Track loaded, load the first one -- */
			if (player._ready && player.currentTrack == null && !player.playlist.empty()) {
				player.loadTrack(player.playlist.at( 0 ));
			}

			done();
		});
	}

	/**
	  * load the given Entry
	  */
	private function loadEntry(pool:AsyncPool<Track>, entry:WebFileEntry):Void {
		var step:Float = (100 / (entries.length * 2));

		pool.push(function(index:Int, provide) {
			var fp = entry.file();
			
			/* update the [status] */
			status = 'Loading ${entry.name}..';
			
			/* if we got the file successfully */
			fp.then(function( file ) {
				if (isMedia( file )) {
					/* create the Track */
					var track = new Track(player, entry, file);

					/* report the progress */
					progress( step );

					/* await the initialization of the Track */
					track.init(function() {
						/* add the Track to the Playlist */
						// result.push( track );

						/* report the progress */
						progress( step );

						/* move on to the next Track */
						provide(null, track);
					});
				}
				else {
					// errors.push(PlayerError.EInvalidType( entry.name ));
					progress( step );
					// next();
					provide("Error: Invalid type", null);
				}

			});

			/* if there was an error getting the file */
			fp.unless(function( error ) {
				provide('Error: Loading failed', null);
				// next();
			});
		});
	}

	/**
	  * check whether the given File is a media File
	  */
	private function isMedia(file : WebFile):Bool {
		return (['video', 'audio'].has( file.type.type ));
	}

	/**
	  * check whether the given File is a playlist File
	  */
	private inline function isPlaylist(p : Path):Bool {
		return [
			'bpls'
		].has( p.extension );
	}



/* === Instance Fields === */

	private var player : Player;
	/* the Array of entries provided */
	private var entries : Array<WebFileEntry>;
	public var restoring : Bool = false;
}
