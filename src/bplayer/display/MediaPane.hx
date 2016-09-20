package bplayer.display;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.Win;
import tannus.html.fs.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;

import bplayer.core.*;
import bplayer.core.TrackType;
import bplayer.core.media.*;
import bplayer.ui.*;
import bplayer.display.Video;

import Math.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class MediaPane extends Ent {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
		renderer = null;
		media = null;
	}

/* === Instance Methods === */

	override public function update(stage : Stage):Void {
		super.update( stage );

		x = player.x;
		y = player.y;
		w = player.w;
		h = player.h;

		if (renderer != null) {
			var t = renderer.target;
			t.x = round( x );
			t.y = round( y );
			t.w = round( w );
			t.h = round( h );
		}
	}

	override public function render(stage:Stage, c:Ctx):Void {
		if (renderer != null) {
			renderer.render(stage, c);
		}
	}

	/**
	  * hand the MediaRenderer off to [this]
	  */
	public function attachMedia(m : Media):Void {
		renderer = m.getRenderer();
	}

/* === Instance Fields === */

	public var player : Player;
	public var media : Null<Media>;
	public var renderer : Null<MediaRenderer<VideoMediaImpl>>;
}
