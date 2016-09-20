package bplayer.ui.controls;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.geom.*;
import tannus.events.*;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import Math.*;
import tannus.math.TMath.*;

import bplayer.core.*;
import bplayer.display.*;
import bplayer.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class SpeedButton extends IconButton {
	/* Constructor Function */
	public function new():Void {
		super();

		side = Right;
	}

/* === Instance Methods === */

	/**
	  * update [this]
	  */
	override public function update(stage : Stage):Void {
		label = (round(player.playbackRate * 100) + '%');
		super.update( stage );
	}

	/**
	  * build [this]'s icon(s)
	  */
	override private function __buildIcons():Void {
		icons.push(Icons.clockIcon(64, 64).toImage());
	}

	/**
	  * get the icon to render
	  */
	override private function getIcon():Image {
		return super.getIcon();
	}

	/**
	  * [this] Button has been clicked
	  */
	override public function click(event : MouseEvent):Void {
		pc.resetPlaybackRate();
	}
}
