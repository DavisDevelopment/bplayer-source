package bplayer.ui.menu;

import tannus.events.*;

import gryffin.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class OpenButton extends Item {
	/* Constructor Function */
	public function new():Void {
		super();

		label = 'Open File(s)..';
		key = 'Ctrl+O';
	}

/* === Instance Methods === */

	/**
	  * When [this] item gets clicked
	  */
	override public function click(event : MouseEvent):Void {
		player.open();
	}
}
