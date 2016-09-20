package bplayer.ww;

import tannus.io.Signal;

interface Pipe {
	var onMessage : Signal<Dynamic>;
	
	function postMessage(data : Dynamic):Void;
}
