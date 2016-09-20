package bplayer.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.events.MouseEvent;
import tannus.graphics.Color;

import bplayer.core.*;
import bplayer.ui.controls.*;

import Std.*;
import Std.is in istype;
import Math.*;
import tannus.math.TMath.*;

using Lambda;
using tannus.ds.ArrayTools;

class PlayerControlsView extends Ent {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
		hovered = false;

		addChild(new Seekbar( this ));

		addChild(new PlaybackButton());
		addChild(new ShuffleButton());
		addChild(new PreviousButton());
		addChild(new FullscreenButton());
		addChild(new SpeedButton());
		addChild(new VolumeButton());
		addChild(new NextButton());
	}

/* === Instance Methods === */

	/**
	  * update [this]
	  */
	override public function update(stage : Stage):Void {
		var mp = stage.getMousePosition();
		hovered = (mp != null && containsPoint( mp ));

		super.update( stage );
	}

	/**
	  * render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		if ( enabled ) {
			c.save();
			c.beginPath();
			c.fillStyle = getBackgroundColor().toString();
			c.drawRect( rect );
			c.closePath();
			c.fill();
			c.restore();

			super.render(stage, c);
		}
	}

	/**
	  * Get the background for [this]
	  */
	public function getBackgroundColor():Color {
		if (bg_id == null) {
			var bg:Color = player.theme.primary.lighten( 12 );
			bg_id = player.theme.save( bg );
		}
		return player.theme.restore( bg_id );
	}

	/**
	  * Update [this]'s geometry
	  */
	override public function calculateGeometry(r : Rectangle):Void {
		w = (player.w * 0.9);
		h = 60;
		y = ((player.y + player.h) - h - 30);
		centerX = player.centerX;

		positionButtons();

		super.calculateGeometry( rect );
	}

	/**
	  * position the buttons
	  */
	private function positionButtons():Void {
		var buttons:Array<PlayerControlButton> = cast getChildren().macfilter(istype(_, PlayerControlButton));
		var lbx:Float = x;
		var rbx:Float = (x + w);
		var margin:Float = 5;

		for (button in buttons) {
			if ( !button.enabled ) {
				continue;
			}

			switch ( button.side ) {
				case Left:
					button.x = lbx;
					lbx += button.w;
					lbx += margin;

				case Right:
					rbx -= button.w;
					rbx -= margin;
					button.x = rbx;
			}

			button.y = (y + (h - button.h));
		}
	}

	override public function addChild(e : Entity):Void {
		if (Std.is(e, PlayerControlButton)) {
			cast(e, PlayerControlButton).controls = this;
		}
		super.addChild( e );
	}

/* === Computed Instance Fields === */

	/* whether or not to render [this] */
	public var enabled(get, never):Bool;
	private inline function get_enabled():Bool {
		return (player.show_ui || hovered);
	}

/* === Instance Fields === */

	public var player : Player;
	public var hovered : Bool = false;

	private var bg_id : Null<Int> = null;
}
