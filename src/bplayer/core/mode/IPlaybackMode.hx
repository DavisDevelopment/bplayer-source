package bplayer.core.mode;

import tannus.ds.*;
import tannus.io.*;

interface IPlaybackMode {
	var volume(get, set):Float;
	var playbackRate(get, set):Float;
	var muted(get, set):Bool;
	var shuffle(get, set):Bool;
	var paused(get, set):Bool;

	var volumeChanged : Signal<Delta<Float>>;
	var playbackRateChanged : Signal<Delta<Float>>;
	var mutedChanged : Signal<Delta<Bool>>;
	var shuffleChanged : Signal<Delta<Bool>>;
	var pausedChanged : Signal<Delta<Bool>>;
	var changed : VoidSignal;

	function clone():IPlaybackMode;
	function pull(m : IPlaybackMode):Void;
}
