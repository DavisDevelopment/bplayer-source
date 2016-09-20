package bplayer.display;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.*;
import tannus.html.fs.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;

import gryffin.core.*;
import gryffin.display.*;

import bplayer.core.*;
import bplayer.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Audio extends gryffin.audio.Audio {
	/* Constructor Function */
	public function new():Void {
		super();

		__activate();
	}

/* === Instance Methods === */

	/**
	  * initialize [this] Audio
	  */
	private function __activate():Void {
		var e:Element = new Element( sound );
		e.appendTo( 'body' );
		e.css('display', 'none');
	}

	/**
	  * Toggle Playback
	  */
	public function togglePlayback():Void {
		(paused?play:pause)();
	}

/* === Instance Methods === */

}
