package bplayer.core;

import bplayer.core.mode.*;

@:forward
abstract PlaybackMode (IPlaybackMode) from IPlaybackMode to IPlaybackMode {
	/* Constructor Function */
	public inline function new(mode : IPlaybackMode):Void {
		this = mode;
	}

/* === Instance Methods === */

	/**
	  * create and return a deep copy of [this]
	  */
	public inline function clone():PlaybackMode {
		return this.clone();
	}

	/**
	  * pull data from [o] onto [this]
	  */
	public inline function pull(o : PlaybackMode):Void {
		this.pull( o );
	}

	/**
	  * check whether [a] and [b] are identical
	  */
	@:op(A == B)
	public inline function equals(b : PlaybackMode):Bool {
		return (
			(this.volume == b.volume) &&
			(this.playbackRate == b.playbackRate) &&
			(this.muted == b.muted) &&
			(this.paused == b.paused) &&
			(this.shuffle == b.shuffle)
		);
	}

/* === Factory Methods === */

	/**
	  * create and return a basic playback mode
	  */
	public static inline function base():PlaybackMode {
		return new BasePlaybackMode();
	}

	/**
	  * create a mode with the given data
	  */
	public static function create(volume:Float, rate:Float, muted:Bool, shuffle:Bool, paused:Bool):PlaybackMode {
		var m = base();
		m.volume = volume;
		m.playbackRate = rate;
		m.muted = muted;
		m.paused = paused;
		m.shuffle = shuffle;
		return m;
	}

	/**
	  * create a mode, and pull data from a Player onto it
	  */
	public static inline function fromPlayer(p : Player):PlaybackMode {
		return create(p.volume, p.playbackRate, p.muted, p.data.settings.shuffle, p.paused);
	}
}
