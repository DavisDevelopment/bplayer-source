package bplayer.ui.controls;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.geom.*;
import tannus.events.*;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.display.*;
import bplayer.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class ShuffleButton extends IconButton {
	/* Constructor Function */
	public function new():Void {
		super();

		side = Left;
	}

/* === Instance Methods === */

	/**
	  * build [this]'s icon(s)
	  */
	override private function __buildIcons():Void {
		icons.push(Icons.shuffleIcon(64, 64).toImage());
		icons.push(Icons.shuffleIcon(64, 64, function(p) {
			p.style.fill = player.theme.secondary.toString();
		}).toImage());
	}

	/**
	  * get the icon to render
	  */
	override private function getIcon():Image {
		return icons[player.data.settings.shuffle ? 1 : 0];
	}

	/**
	  * [this] Button has been clicked
	  */
	override public function click(event : MouseEvent):Void {
		pc.toggleShuffle();
	}
}
