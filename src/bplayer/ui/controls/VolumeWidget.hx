package bplayer.ui.controls;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.geom.*;
import tannus.events.*;
import tannus.math.*;

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

class VolumeWidget extends Ent {
	/* Constructor Function */
	public function new(b : VolumeButton):Void {
		super();

		btn = b;
		tri = new Triangle();

		on('click', click);
	}

/* === Instance Methods === */

	/**
	  * update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		var mp = stage.getMousePosition();
		hovered = (mp != null && containsPoint( mp ));
	}

	/**
	  * render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		c.save();
		/* draw the background */
		var bgr = rect.clone();
		bgr.enlarge(10, 10);
		var bgc = btn.controls.getBackgroundColor();
		c.beginPath();
		c.fillStyle = bgc.toString();
		c.drawRect( bgr );
		c.closePath();
		c.fill();

		/* draw the full triangle */
		c.beginPath();
		c.strokeStyle = 'black';
		c.fillStyle = btn.player.theme.tertiary.toString();
		c.drawTriangle( tri );
		c.closePath();
		c.fill();
		c.stroke();

		/* draw the highlighted triangle */
		c.beginPath();
		c.fillStyle = btn.player.theme.secondary.toString();
		c.drawTriangle(getHighlightedTriangle(getFactor()));
		c.closePath();
		c.fill();
		c.restore();
	}

	/**
	  * update [this] Geometry
	  */
	override public function calculateGeometry(r : Rectangle):Void {
		var whr = new Ratio(12, 16);

		w = btn.w;
		w += (w * 0.2);
		h = whr.bottomValue( w );
		centerX = btn.centerX;
		y = (btn.controls.y - h - 8);

		b = new Point(x, y);
		a = new Point((x + (w / 2)), (y + h));
		c = new Point((x + w), y);
		//tri = new Triangle(a, b, c);

		super.calculateGeometry( r );
	}

	/**
	  * Get the Triangle for the highlighted area, based on the given factor
	  */
	private function getHighlightedTriangle(f : Float):Triangle {
		var hb:Point = a.lerp(b, f);
		var hc:Point = a.lerp(c, f);
		return new Triangle(a.clone(), hb, hc);
	}

	/**
	  * Get the factor from the given Point
	  */
	private function getPointFactor(p : Point):Float {
		if (tri.containsPoint( p )) {
			return ((a.y - p.y) / h);
		} else return 0.0;
	}

	/**
	  * Get the factor for the current volume
	  */
	private function getCurrentFactor():Float return player.mode.volume;

	/**
	  * get the 'active' factor
	  */
	private function getFactor():Float {
		return (hovered?getPointFactor(stage.getMousePosition()):getCurrentFactor());
	}

	/**
	  * handle a 'click' event
	  */
	private function click(event : MouseEvent):Void {
		var f:Float = getPointFactor( event.position );
		player.mode.volume = f;
		hide();
	}

/* === Computed Instance Fields === */

	public var a(get, set):Point;
	private inline function get_a():Point return tri.one;
	private inline function set_a(v : Point):Point return (tri.one = v);
	public var b(get, set):Point;
	private inline function get_b():Point return tri.two;
	private inline function set_b(v : Point):Point return (tri.two = v);
	public var c(get, set):Point;
	private inline function get_c():Point return tri.three;
	private inline function set_c(v : Point):Point return (tri.three = v);
	
	public var player(get, never):Player;
	private inline function get_player():Player return btn.player;

/* === Instance Fields === */

	public var tri : Triangle;
	public var hovered : Bool = false;

	private var btn : VolumeButton;
}
