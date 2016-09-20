package bplayer.core.mode;

import tannus.ds.*;
import tannus.io.*;
import tannus.ds.tuples.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class BasePlaybackMode implements IPlaybackMode {
	/* Constructor Function */
	public function new():Void {
		d = new PlaybackModeData();

		volumeChanged = d.volumeChanged;
		playbackRateChanged = d.playbackRateChanged;
		mutedChanged = d.mutedChanged;
		pausedChanged = d.pausedChanged;
		shuffleChanged = d.shuffleChanged;
		changed = d.changed;
	}

/* === Instance Methods === */

	/**
	  * create and return a deep copy of [this]
	  */
	public function clone():PlaybackMode {
		var mode = new BasePlaybackMode();
		mode.d = d.clone();
		return mode;
	}

	/**
	  * pull data from [o] onto [this]
	  */
	public function pull(o : IPlaybackMode):Void {
		volume = o.volume;
		playbackRate = o.playbackRate;
		muted = o.muted;
		paused = o.paused;
		shuffle = o.shuffle;
	}

/* === Instance Fields === */

	public var volume(get, set):Float;
	private function get_volume():Float return d.volume;
	private function set_volume(v : Float):Float {
		return (d.volume = v);
	}

	public var playbackRate(get, set):Float;
	private function get_playbackRate():Float return d.playbackRate;
	private function set_playbackRate(v : Float):Float {
		return (d.playbackRate = v);
	}

	public var muted(get, set):Bool;
	private function get_muted():Bool return d.muted;
	private function set_muted(v : Bool):Bool {
		return (d.muted = v);
	}

	public var paused(get, set):Bool;
	private function get_paused():Bool return d.paused;
	private function set_paused(v : Bool):Bool {
		return (d.paused = v);
	}

	public var shuffle(get, set):Bool;
	private function get_shuffle():Bool return d.shuffle;
	private function set_shuffle(v : Bool):Bool {
		return (d.shuffle = v);
	}

	public var volumeChanged : Signal<Delta<Float>>;
	public var playbackRateChanged : Signal<Delta<Float>>;
	public var mutedChanged : Signal<Delta<Bool>>;
	public var shuffleChanged : Signal<Delta<Bool>>;
	public var pausedChanged : Signal<Delta<Bool>>;
	public var changed : VoidSignal;

	private var d : PlaybackModeData;
}
