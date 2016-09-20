package bplayer.display;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;

import tannus.io.Ptr;
import tannus.io.Signal;
import tannus.ds.Obj;

import Std.is in istype;

import bplayer.core.*;
import bplayer.display.Video;
import bplayer.display.VideoFilter;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class VideoPane extends Ent {
	/* Constructor Function */
	public function new(p : MediaPane):Void {
		super();

		pane = p;
		par = null;
		can = Canvas.create(0, 0);
		filters = new Array();
		shader = new VideoShader( this );
		//addFilter(VFGreyscale( 0.5 ));
	}

/* === Instance Methods === */

	/**
	  * Initialize [this] VideoPane
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );
	}

	/**
	  * Update [this] VideoPane
	  */
	override public function update(s : Stage):Void {
		super.update( s );

		if (!pane.player.paused) {
			if (can.width != video.width || can.height != video.height) {
				can.resize(video.width, video.height);
			}
			applyShader();
		}

		/* == update the geometry of [this] VideoPane */
		rect.cloneFrom( pane.rect );
	}

	/**
	  * Render [this] VideoPane
	  */
	override public function render(s:Stage, c:Ctx):Void {
		c.save();

		c.beginPath();
		c.fillStyle = 'black';
		c.drawRect( rect );
		c.fill();
		c.closePath();
		
		var vr = videoRect;
		if (filters.empty()) {
			c.drawComponent(video, 0, 0, video.width, video.height, vr.x, vr.y, vr.w, vr.h);
		}
		else {
			c.drawComponent(can, 0, 0, can.width, can.height, vr.x, vr.y, vr.w, vr.h);
		}
		
		c.restore();
	}

	/**
	  * Add a Filter to [this] Video
	  */
	public function addFilter(f : VideoFilter):Void {
		var ex = filters.macfirstMatch(_.equals( f ));
		if (ex == null) {
			filters.push( f );
		}
	}

	/**
	  * Apply filters to [this] Video
	  */
	private function applyShader():Void {
		can.context.drawComponent(video, 0, 0, can.width, can.height, 0, 0, can.width, can.height);
		if (!filters.empty() && (video.width > 0 && video.height > 0)) {
			var pixels = can.pixels;
			shader.apply( pixels );
			pixels.save();
		}
	}

/* === Computed Instance Fields === */

	public var video(get, never):Video;
	private inline function get_video():Video return pane.video;

	/* the nearest parent that's an instance of Ent */
	public var entParent(get, never):Null<Ent>;
	private inline function get_entParent():Null<Ent> {
		return parentUntil(function(e) {
			return istype(e, Ent);
		});
	}

	/* the rectangle that the video should occupy */
	public var videoRect(get, never):Rectangle;
	private function get_videoRect():Rectangle {
		var r:Rectangle = rect.clone();
		r.w = video.aspectRatio.topValue( r.h );
		r.centerX = centerX;
		return r;
	}

/* === Instance Fields === */

	public var pane : MediaPane;
	public var can : Canvas;
	public var filters : Array<VideoFilter>;
	public var shader : VideoShader;

	private var par : Null<Ent>;
}
