package bplayer.core;

import tannus.io.*;
import tannus.ds.*;

import tannus.events.EventMod;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class PlayerControls {
	/* Constructor Function */
	public function new(p : Player):Void {
		player = p;

		shift = false;
		alt = false;
		ctrl = false;
		meta = false;
	}

/* === Instance Methods === */

	/**
	  * play the media
	  */
	public inline function play():Void {
		m.paused = false;
	}

	/**
	  * pause the media
	  */
	public inline function pause():Void {
		m.paused = true;
	}

	/**
	  * toggle the playback of the media
	  */
	public inline function togglePlayback():Void {
		m.paused = !m.paused;
	}

	/**
	  * toggle whether media is muted
	  */
	public inline function toggleMuted():Void {
		m.muted = !m.muted;
	}

	/**
	  * toggle whether to shuffle the playlist
	  */
	public inline function toggleShuffle():Void {
		m.shuffle = !m.shuffle;
	}

	public inline function jump(mod : Int):Void {
		player.currentTime += (getJumpTime() * mod);
	}

	public inline function adjustPlaybackRate(mod : Int):Void {
		m.playbackRate += ((getPlaybackRateJump() / 100) * mod);
	}

	public inline function resetPlaybackRate():Void {
		m.playbackRate = 1.0;
	}

	/**
	  * navigate back
	  */
	public inline function back():Void {
		player.back();
	}

	/**
	  * shelf [this] Player
	  */
	public function minimize():Void {
		player.minimize();
	}

	/**
	  * adjust the volume
	  */
	public inline function adjustVolume(mod : Int):Void {
		player.volume += ((getVolumeJump() / 100.0) * mod);
	}

	/**
	  * get the number of seconds to jump
	  */
	public function getJumpTime():Int {
		var time:Int = 2;
		if ( shift ) {
			time = 10;
		}
		else if ( alt ) {
			time = 30;
		}
		else if ( ctrl ) {
			time = 60;
		}
		return time;
	}

	public function getPlaybackRateJump():Int {
		var i:Int;
		if ( ctrl ) {
			i = 50;
		}
		else if ( alt ) {
			i = 10;
		}
		else if ( shift ) {
			i = 5;
		}
		else {
			i = 1;
		}
		return i;
	}

	public function getVolumeJump():Int {
		var i:Int = 5;
		if ( shift ) {
			i = 1;
		}
		return i;
	}

	public function applyMods(mods : Array<EventMod>):Void {
		alt = false;
		shift = false;
		meta = false;
		ctrl = false;

		for (m in mods) {
			switch ( m ) {
				case Alt:
					alt = true;
				case Control:
					ctrl = true;
				case Shift:
					shift = true;
				case Meta:
					meta = true;
			}
		}
	}

/* === Computed Instance Fields === */

	public var mode(get, never):PlaybackMode;
	private inline function get_mode():PlaybackMode return player.mode;

	private var m(get, never):PlaybackMode;
	private inline function get_m():PlaybackMode return mode;

/* === Instance Fields === */

	public var player : Player;

	public var shift : Bool;
	public var alt : Bool;
	public var ctrl : Bool;
	public var meta : Bool;
}
