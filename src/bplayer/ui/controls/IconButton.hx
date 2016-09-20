package bplayer.ui.controls;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.geom.*;

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

class IconButton extends PlayerControlButton {
	/* Constructor Function */
	public function new():Void {
		super();

		labelBox = new TextBox();
		labelBox.fontFamily = 'Ubuntu';
		labelBox.fontSizeUnit = 'px';
		labelBox.fontSize = 10;
		labelBox.color = '#FFF';

		icons = new Array();
	}

/* === Instance Methods === */

	override public function init(s : Stage):Void {
		player.onready( __buildIcons );
	}

	/**
	  * build [this]'s icon(s)
	  */
	private function __buildIcons():Void {
		null;
	}

	/**
	  * get the icon to render
	  */
	private function getIcon():Image {
		return icons[0];
	}

	/**
	  * render [this] Button
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		try {
			var i = getIcon();
			if (i == null) {
				return ;
			}
			c.drawComponent(i, 0, 0, i.width, i.height, x, y, w, h);
			if (label.trim() != '') {
				var b = labelBox;
				c.drawComponent(b, 0, 0, b.width, b.height, x, (y + h - b.height - 1), b.width, b.height);
			}
		}
		catch (error : Dynamic) {
			trace( error );
		}
	}

/* === Computed Instance Fields === */

	public var label(get, set):String;
	private inline function get_label():String return labelBox.text;
	private inline function set_label(v : String):String return (labelBox.text = v);

/* === Instance Fields === */

	public var icons : Array<Image>;
	
	private var labelBox : TextBox;
}
