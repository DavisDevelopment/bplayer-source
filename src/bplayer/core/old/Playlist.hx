package bplayer.core;

import tannus.io.*;
import tannus.ds.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class Playlist {
	/* Constructor Function */
	public function new(?trackList : Array<Track>):Void {
		name = 'My Playlist';
		tracks = new Array();
		if (trackList != null) {
			tracks = trackList;
			for (t in tracks) {
				t.list = this;
			}
		}
		altered = new VoidSignal();
	}

/* === Instance Methods === */

	/**
	  * Add a Track to [this] Playlist
	  */
	public function addTrack(t : Track):Void {
		if (!tracks.has( t )) {
			tracks.push( t );
			t.list = this;
			alt();
		}
	}

	/**
	  * Add a set of Tracks to [this]
	  */
	public function addTracks(l : Array<Track>):Void {
		var sl = length;
		for (t in l) {
			if (!tracks.has( t )) {
				tracks.push( t );
				t.list = this;
			}
		}
		if (length > sl)
			alt();
	}

	/**
	  * Remove a Track from [this]
	  */
	public function removeTrack(t : Track):Bool {
		if (tracks.has( t )) {
			t.list = null;
			var had = tracks.remove( t );
			alt();
			return had;
		}
		else {
			return false;
		}
	}

	/**
	  * remove a set of Tracks from [this]
	  */
	public function removeTracks(l : Array<Track>):Void {
		var sl = length;
		for (t in l) {
			tracks.remove( t );
		}
		if (length != sl)
			alt();
	}

	public function hasTrack(t : Track):Bool {
		for (track in tracks) {
			if (track.equals( t )) {
				return true;
			}
		}
		return false;
	}

	public function trackIndex(t : Track):Int {
		var i:Int = 0;
		while (i < tracks.length) {
			if (tracks[i].equals( t )) {
				return i;
			}
			i++;
		}
		return -1;
	}

	/**
	  * Get a Track by its index
	  */
	public inline function getTrackByIndex(index : Int):Null<Track> {
		return tracks[index];
	}
	public inline function at(index : Int):Null<Track> return getTrackByIndex( index );

	/**
	  * Get a Track by its id
	  */
	public inline function getTrackById(id : String):Null<Track> {
		return tracks.macfirstMatch(_.id == id);
	}

	/**
	  * Get a Track by name
	  */
	public inline function getTrackByTitle(name : String):Null<Track> {
		return tracks.macfirstMatch(_.title == name);
	}

	/**
	  * add a Track at the given index
	  */
	public function insertTrack(track:Track, index:Int):Void {
		tracks.remove( track );
		tracks.insert(index, track);
		alt();
	}

	/**
	  * get a filtered clone of [this] Playlist
	  */
	public function filtered(f : Track->Bool):Playlist {
		return new Playlist(tracks.filter( f ).macmap(_.clone()));
	}

	/**
	  * filter [this] Playlist inplace
	  */
	public function filter(f : Track->Bool):Void {
		var r = tracks.splitfilter( f );
		tracks = r.pass;
		alt();
	}

	/**
	  * sort [this] Playlist inplace
	  */
	public function sort(compare : Track -> Track -> Int):Void {
		haxe.ds.ArraySort.sort(tracks, compare);
		alt();
	}

	/**
	  * Iterate over [this] Playlist
	  */
	public function iterator():Iterator<Track> {
		return tracks.iterator();
	}

	private inline function alt():Void altered.fire();

/* === Computed Instance Fields === */

	public var length(get, never):Int;
	private inline function get_length():Int return tracks.length;

/* === Instance Fields === */

	public var name : String;
	public var altered : VoidSignal;

	private var tracks : Array<Track>;
}
