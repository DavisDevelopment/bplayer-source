package bplayer.display;

import gryffin.display.Video in NVid;

import tannus.html.*;

class Video extends NVid {
	/* Constructor Function */
	public function new():Void {
		super();

		__activate();
	}

/* === Instance Methods === */

	/**
	  * activate [this]
	  */
	private function __activate():Void {
		var e:Element = new Element( vid );
		e.appendTo( 'body' );
		e.css('display', 'none');
	}

	/**
	  * toggle playback
	  */
	public inline function togglePlayback():Void {
		(paused?play:pause)();
	}

/* === Instance Fields === */

}
