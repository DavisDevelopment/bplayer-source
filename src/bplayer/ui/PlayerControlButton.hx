package bplayer.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.events.*;

import bplayer.core.*;
import bplayer.core.media.*;

import Std.*;
import Std.is in istype;
import Math.*;
import tannus.math.TMath.*;
import gryffin.Tools.*;

using Lambda;
using tannus.ds.ArrayTools;
using StringTools;
using tannus.ds.StringUtils;

class PlayerControlButton extends Ent {
	/* Constructor Function */
	public function new():Void {
		super();

		side = Left;
		controls = null;

		_listen();
	}

/* === Instance Methods === */

	/**
	  * update [this] Button
	  */
	@:access( gryffin.core.Stage )
	override public function update(stage : Stage):Void {
		/* obtain a reference to the containing PlayerControls instance, if we don't have one already */
		if (controls == null) {
			controls = parentUntil(function(e) return istype(e, PlayerControls));
			/* fire the 'linked' event */
			if (controls != null) {
				dispatch('linked', controls);
			}
		}
		else {
			w = h = (controls.h * 0.7);
		}

		// store the value of [hovered]
		var hov:Bool = hovered;

		// store the current mouse position
		var mp:Point = stage.getMousePosition();

		// update the value of [hovered] to reflect whether the cursor is currently over [this]
		hovered = (mp != null && containsPoint( mp ));

		// store the last Event that occurred on the Stage
		var ev:Event = stage.mouseWatcher.getLastEvent();

		switch ([hov, hovered]) {
			/* Mouse Enter */
			case [false, true]:
				dispatch('mouseenter', ev.clone());

			/* Mouse Leave */
			case [true, false]:
				dispatch('mouseleave', ev.clone());

			default:
				null;
		}

		super.update( stage );
	}

	/**
	  * render [this] Button
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);
	}

	/**
	  * handle events
	  */
	private function _listen():Void {
		on('click', click);
		on('mouseenter', mouseenter);
		on('mouseleave', mouseleave);
	}

	/**
	  * [this] Button has been clicked
	  */
	public function click(event : MouseEvent):Void {
		//trace( event );
	}
	public function mouseenter(event : MouseEvent):Void {
		//trace( event );
	}
	public function mouseleave(event : MouseEvent):Void {
		//trace( event );
	}


/* === Computed Instance Fields === */

	/* the video player */
	public var player(get, never):Player;
	private inline function get_player():Player return controls.player;

	public var mode(get, never):PlaybackMode;
	private inline function get_mode():PlaybackMode return player.mode;

	public var pc(get, never):PlayerControls;
	private inline function get_pc():PlayerControls return player.controls;

	/* the current Track */
	public var media(get, never):Null<Media>;
	private inline function get_media():Null<Media> return player.currentMedia;

	public var enabled(get, never):Bool;
	private function get_enabled():Bool {
		return true;
	}

/* === Instance Fields === */

	public var side : PlayerControlSide;
	public var controls : Null<PlayerControlsView>;
	public var hovered : Bool = false;
}
