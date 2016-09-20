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

import Std.*;
import Math.*;
import tannus.math.TMath.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class VolumeButton extends IconButton {
	/* Constructor Function */
	public function new():Void {
		super();

		side = Right;
		widget = new VolumeWidget( this );
		widget.hide();
	}

/* === Instance Methods === */

	/**
	  * build [this]'s icon(s)
	  */
	override private function __buildIcons():Void {
		icons = Icons.volumeIcons(64, 64).macmap(_.toImage());
		icons.push(Icons.muteIcon(64, 64).toImage());
	}

	/**
	  * when [this] Button gets linked to its parent
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );
		parent.addSibling( widget );
	}

	@:access( bplayer.ui.controls.VolumeWidget )
	override public function update(stage : Stage):Void {
		label = (round((hovered?widget.getFactor():player.volume) * 100) + '');

		super.update( stage );
	}

	/**
	  * get the icon to render
	  */
	override private function getIcon():Image {
		return icons[getIconIndex()];
	}

	private function getIconIndex():Int {
		if ( player.muted ) {
			return 4;
		}

		var vol:Int = round(player.volume * 100);
		var index : Int = (
			if (vol.inRange(0, 25)) 0
			else if (vol.inRange(26, 50)) 1
			else if (vol.inRange(51, 75)) 2
			else if (vol.inRange(76, 100)) 3
			else 4
		);
		return index;
	}

	private function maybeHide():Void {
		var mp = stage.getMousePosition();
		if (mp == null) {
			widget.hide();
		}
		else if (containsPoint( mp ) || widget.containsPoint( mp )) {
			return ;
		}
		else widget.hide();
	}

	/**
	  * [this] Button has been clicked
	  */
	override public function click(event : MouseEvent):Void {
		pc.toggleMuted();
	}
	override public function mouseenter(event : MouseEvent):Void {
		widget.show();
		widget.calculateGeometry( rect );
	}
	override public function mouseleave(event : MouseEvent):Void {
		wait(800, maybeHide);
	}
	override public function calculateGeometry(r : Rectangle):Void {
		super.calculateGeometry( r );
		widget.calculateGeometry( r );
	}

/* === Instance Fields === */

	private var widget : VolumeWidget;
}
