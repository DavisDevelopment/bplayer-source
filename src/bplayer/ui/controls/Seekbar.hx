package bplayer.ui.controls;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.geom.*;
import tannus.events.*;
import tannus.math.*;
import tannus.media.Duration;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.MediaObject;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.display.*;
import bplayer.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Seekbar extends Ent {
	/* Constructor Function */
	public function new(c : PlayerControlsView):Void {
		super();

		controls = c;

		currentBox = new TextBox();
		initBox( currentBox );
		totalBox = new TextBox();
		initBox( totalBox );

		hoverLocation = null;
		thumb = new ThumbPreviewBox( this );

		on('click', click);
	}

/* === Instance Methods === */

	/**
	  * Initialize [this] shit
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		player.addChild( thumb );
	}

	/**
	  * Update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		// determine whether the cursor is current over [this]
		var mp = stage.getMousePosition();
		var _hov = hovered;
		hovered = (mp != null && containsPoint( mp ));

		// update the text of the text-boxes
		currentBox.text = Duration.fromFloat( player.currentTime ).toString();
		totalBox.text = player.duration.toString();

		// update [hoverLocation]
		if ( hovered ) {
			hoverLocation = mp.clone();
		} 
		else {
			hoverLocation = null;
		}

		// handle the mouseenter and mouseleave events
		switch ([_hov, hovered]) {
			case [false, true]:
				mouseenter();

			case [true, false]:
				mouseleave();

			default:
				null;
		}
	}

	/**
	  * Render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		if (player.currentMedia == null) {
			return ;
		}

		c.save();
		/* draw text */
		var b = currentBox;
		c.drawComponent(b, 0, 0, b.width, b.height, (x + 5), y, b.width, b.height);
		b = totalBox;
		c.drawComponent(b, 0, 0, b.width, b.height, (x + w - b.width - 5), y, b.width, b.height);

		/* draw played rect */
		c.beginPath();
		c.fillStyle = getPlayedColor().toString();
		c.drawRect(getCurrentRect());
		c.closePath();
		c.fill();

		/* draw remaining rect */
		c.beginPath();
		c.fillStyle = 'white';
		c.drawRect(getRemainingRect());
		c.closePath();
		c.fill();
		c.restore();
	}

	/**
	  * Calculate geometry
	  */
	override public function calculateGeometry(r : Rectangle):Void {
		x = r.x;
		y = r.y;
		w = r.w;
		h = 10;
		/*
		w = (r.w - (currentBox.width + totalBox.width));
		x = (r.x + ((r.w - w) / 2));
		y = r.y;
		h = 15;
		*/

		//currentBox.autoScale(null, h);
		//totalBox.autoScale(null, h);
	}

	/**
	  * When [this] gets clicked
	  */
	private function click(event : MouseEvent):Void {
		player.progress = getCurrentPercent();
	}

	/**
	  * When the user begins to hover over [this]
	  */
	private function mouseenter():Void {
		return ;
	}

	private function mouseleave():Void {
		null;
	}

	/**
	  * Get the 'current time' Percent
	  */
	private function getCurrentPercent():Percent {
		if ( !hovered ) {
			return player.progress;
		}
		else {
			var mp:Point = stage.getMousePosition();
			mp.x -= (x + currentBox.width + 10);
			return Percent.percent(mp.x, (w - currentBox.width - totalBox.width - 20));
		}
	}

	/**
	  * get the current time
	  */
	private function getCurrentTime():Duration {
		var cp:Percent = getCurrentPercent();
		var seconds:Float = cp.of( player.duration.totalSeconds );
		return Duration.fromFloat( seconds );
	}

	/**
	  * Get the rectangle for what's been played
	  */
	private function getCurrentRect():Rectangle {
		var bw:Float = (w - currentBox.width - totalBox.width - 20);
		return new Rectangle((x + currentBox.width + 10), y, getCurrentPercent().of( bw ), h);
	}

	/**
	  * Get the rectangle for what hasn't been played
	  */
	private function getRemainingRect():Rectangle {
		var bw:Float = (w - currentBox.width - totalBox.width - 20);
		var cw:Float = getCurrentPercent().of( bw );
		return new Rectangle((x + currentBox.width + 10 + cw), y, (bw - cw), h);
	}

	/**
	  * Get the played color
	  */
	private function getPlayedColor():Color {
		return player.theme.secondary;
	}

	/**
	  * Initialize the given TextBox
	  */
	private function initBox(b : TextBox):Void {
		b.fontFamily = 'Ubuntu';
		b.fontSize = 10;
		b.fontSizeUnit = 'px';
		b.color = '#FFFFFF';
	}

/* === Computed Instance Fields === */

	public var player(get, never):Player;
	private inline function get_player():Player return controls.player;

	public var progress(get, never):Percent;
	private inline function get_progress():Percent return getCurrentPercent();

/* === Instance Fields === */

	public var controls : PlayerControlsView;
	public var currentBox : TextBox;
	public var totalBox : TextBox;
	public var hovered : Bool = false;
	public var thumb : ThumbPreviewBox;
	public var hoverLocation : Null<Point>;
	public var _thumb : Null<Pixels>;

	private var enterLocation : Null<Point>;
}
