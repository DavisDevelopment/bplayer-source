package bplayer.core.mode;

import tannus.ds.*;
import tannus.io.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class PlaybackModeData {
	/* Constructor Function */
	public function new():Void {
		// initialize Signals
		volumeChanged = new Signal();
		playbackRateChanged = new Signal();
		mutedChanged = new Signal();
		shuffleChanged = new Signal();
		pausedChanged = new Signal();
		changed = new VoidSignal();

		// initialize default values
		volume = 1.0;
		playbackRate = 1.0;
		muted = false;
		shuffle = false;
		paused = false;
	}

/* === Instance Methods === */

	/**
	  * create and return a deep copy of [this]
	  */
	public function clone():PlaybackModeData {
		var d:PlaybackModeData = new PlaybackModeData();
		d.pull( this );
		return d;
	}

	/**
	  * pull data from [o] to [this]
	  */
	public inline function pull(o : PlaybackModeData):Void {
		volume = o.volume;
		playbackRate = o.playbackRate;
		muted = o.muted;
		paused = o.paused;
		shuffle = o.shuffle;
	}

	/**
	  * create a Delta from the two values
	  */
	private inline function delta<T>(previous:Null<T>, current:Null<T>):Delta<T> {
		return new Delta(current, previous);
	}
	private inline function ch():Void {
		changed.fire();
	}

/* === Computed Instance Fields === */

	public var volume(default, set):Float;
	private function set_volume(v : Float):Float {
		volumeChanged.call(delta(volume, (volume = v)));
		ch();
		return volume;
	}

	public var playbackRate(default, set):Float;
	private function set_playbackRate(v : Float):Float {
		playbackRateChanged.call(delta(playbackRate, (playbackRate = v)));
		ch();
		return playbackRate;
	}

	public var muted(default, set):Bool;
	private function set_muted(v : Bool):Bool {
		mutedChanged.call(delta(muted, (muted = v)));
		ch();
		return muted;
	}

	public var shuffle(default, set):Bool;
	private function set_shuffle(v : Bool):Bool {
		shuffleChanged.call(delta(shuffle, (shuffle = v)));
		ch();
		return shuffle;
	}

	public var paused(default, set):Bool;
	private function set_paused(v : Bool):Bool {
		pausedChanged.call(delta(paused, (paused = v)));
		ch();
		return paused;
	}

/* === Instance Fields === */

	public var volumeChanged : Signal<Delta<Float>>;
	public var playbackRateChanged : Signal<Delta<Float>>;
	public var mutedChanged : Signal<Delta<Bool>>;
	public var shuffleChanged : Signal<Delta<Bool>>;
	public var pausedChanged : Signal<Delta<Bool>>;
	public var changed : VoidSignal;
}
