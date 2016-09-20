package bplayer.ui.controls;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.io.Ptr;
import tannus.geom2.*;
import tannus.events.MouseEvent;
import tannus.graphics.Color;
import tannus.media.Duration;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

@:access( bp.ui.Seekbar )
class ThumbPreviewBox extends Ent {
	/* Constructor Function */
	public function new(seekbar : Seekbar):Void {
		super();

		bar = seekbar;
		border = new Border(6, '#333333', 5);
		tbox = new TextBox();
		tbox.fontFamily = 'Ubuntu';
		tbox.fontSize = 14;
		tbox.fontSizeUnit = 'px';
		tbox.color = '#FFFFFF';
	}

/* === Instance Methods === */

	/**
	  * Initialize [this]
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );
	}

	/**
	  * Update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		updateSize( stage );

		if (target != null) {
			centerX = target.x;
			y = (bar.y - h - 18);


			var progress = bar.progress;
			var ct = Duration.fromSecondsF(progress.of( bar.player.duration.totalSeconds ));
			tbox.text = ct.toString();
		}
	}

	/**
	  * Update the dimensions of [this]
	  */
	private function updateSize(stage : Stage):Void {
		/*
		if (thumb != null) {
			// 20% of the viewport
			var vp:Rect<Int> = player.displayRect;

			// scale the thumbnail to be 20% of the viewport height
			var thumbRect:Rect<Int> = new Rect(0, 0, thumb.width, thumb.height);
			thumbRect.scale(null, vp.height);

			w = thumbRect.w;
			h = (thumbRect.h + 20);
		}
		*/
		w = (tbox.width + 30);
		h = 20;
	}

	/**
	  * Render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		if ( !bar.hovered ) {
			return ;
		}

		c.save();
		/* draw the thumbnail */
		if (thumb != null) {
			c.drawComponent(thumb, 0, 0, thumb.width, thumb.height, x, y, w, (h - 20));
		}

		/* draw the time-box */
		c.beginPath();
		c.fillStyle = border.color.toString();
		c.rect(x, (y + h - 20), w, 20);
		c.closePath();
		c.fill();

		/* draw the time text */
		var ttr:Rect<Float> = new Rect(x, (y + h - 20), w, 20);
		var ttx:Float = (ttr.centerX - (tbox.width / 2));
		var tty:Float = (ttr.centerY - (tbox.height / 2));
		c.drawComponent(tbox, 0, 0, tbox.width, tbox.height, ttx, tty, tbox.width, tbox.height);

		/* draw the border */
		c.beginPath();
		c.shadowBlur = 10;
		c.shadowColor = border.color.darken( 12 ).toString();
		c.strokeStyle = border.color.toString();
		c.lineWidth = border.width;
		if (border.radius == 0) {
			c.drawRect( rect );
		}
		else {
			c.drawRoundRect(rect, border.radius);
		}
		c.closePath();
		c.stroke();
		c.restore();
	}

/* === Computed Instance Fields === */

	/* the Player */
	private var player(get, never):Player;
	private inline function get_player():Player return bar.player;

	/* the Thumbnail itself */
	private var thumb(get, never):Null<Pixels>;
	private inline function get_thumb():Null<Pixels> return bar._thumb;

	/* the Point at which the user is hovering */
	private var target(get, never):Null<Point<Int>>;
	private function get_target():Null<Point<Int>> {
		var p = bar.hoverLocation;
		if (p == null) {
			return null;
		}
		else {
			return new Point(Math.floor( p.x ), Math.floor( p.y ));
		}
	}

/* === Instance Fields === */

	public var bar : Seekbar;
	public var border : Border;
	public var tbox : TextBox;
}
