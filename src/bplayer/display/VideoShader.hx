package bplayer.display;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;

import tannus.io.Ptr;
import tannus.io.Signal;
import tannus.ds.Obj;

import Std.is in istype;

import bplayer.core.*;
import bplayer.display.Video;
import bplayer.display.VideoFilter;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.graphics.ColorTools;

class VideoShader {
	/* Constructor Function */
	public function new(p : VideoPane):Void {
		pane = p;
	}

/* === Instance Methods === */

	/**
	  * Apply transformations to the video's pixel-data
	  */
	public function apply(pixels:Pixels):Void {
		pixels.applyShader({
			for (f in pane.filters) switch ( f ) {
				case VFGreyscale( n ):
					color = color.greyscale( n );

				default:
					null;
			}
		});
	}

/* === Instance Fields === */

	public var pane : VideoPane;
}
