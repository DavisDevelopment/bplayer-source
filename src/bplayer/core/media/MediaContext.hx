package bplayer.core.media;

import tannus.io.*;
import tannus.geom2.*;
import tannus.media.Duration;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.MediaObject;

class MediaContext {
	/* Constructor Function */
	public function new(m : MediaImpl):Void {
		media = m;
		canvas = Canvas.create(0, 0);
		target = new Rect();

		readyEvent = new VoidSignal();
		canManipulateEvent = new VoidSignal();
		_ready = false;
		readyEvent.once(function() _ready = true);
	}

/* === Instance Methods === */

	/**
	  * set the dimensions for [this] Renderer
	  */
	public function resize(width:Int, height:Int):Void {
		canvas.resize(width, height);
		target.w = width;
		target.h = height;
	}

	/**
	  * set the position of [this]s target
	  */
	public inline function move(pos : Point<Int>):Void {
		target.topLeft = pos;
	}
	public inline function moveTo(x:Int, y:Int):Void {
		move(new Point(x, y));
	}

	/**
	  * update [this]
	  */
	public function update(stage : Stage):Void {
		if (!(target.w == canvas.width && target.h == canvas.height)) {
			resize(target.w, target.h);
		}
	}

	/**
	  * render [this] onto the main Stage
	  */
	public function render(stage:Stage, c:Ctx):Void {
		var cc = canvas.context;
		cc.clearRect(0, 0, width, height);

		paint(stage, cc);

		c.drawComponent(canvas, 0, 0, canvas.width, canvas.height, target.x, target.y, target.w, target.h);
	}

	/**
	  * render [this]
	  */
	private function paint(stage:Stage, c:Ctx):Void {
		c.beginPath();
		c.fillStyle = 'black';
		c.rect(0, 0, canvas.width, canvas.height);
		c.closePath();
		c.fill();
	}

	/**
	  * when [this] gets attached to the Player
	  */
	public function attach(p : Player):Void {
		p.page.title = media.getTitle();
	}

	/**
	  * when [this] gets detached from the Player
	  */
	public function detach(p : Player):Void {
		mo.pause();
		mo.clear();
	}

	/**
	  * get the MediaObject
	  */
	public inline function getMediaObject():MediaObject return mo;

/* === Playback Control Methods === */

	public function play():Void mo.play();
	public function pause():Void mo.pause();
	public function togglePlayback():Void {
		(paused ? play : pause)();
	}

	public function stop():Void {
		mo.clear();
		mo.destroy();
		trace( 'media stopped' );
	}

/* === Computed Instance Fields === */

	public var width(get, never):Int;
	private inline function get_width():Int return canvas.width;

	public var height(get, never):Int;
	private inline function get_height():Int return canvas.height;

	public var duration(get, never):Duration;
	private inline function get_duration():Duration return mo.duration;

	public var currentTime(get, set):Float;
	private inline function get_currentTime():Float return mo.currentTime;
	private inline function set_currentTime(v : Float):Float return (mo.currentTime = v);
	
	public var volume(get, set):Float;
	private inline function get_volume():Float return mo.volume;
	private inline function set_volume(v : Float):Float return (mo.volume = v);
	
	public var playbackRate(get, set):Float;
	private inline function get_playbackRate():Float return mo.playbackRate;
	private inline function set_playbackRate(v : Float):Float return (mo.playbackRate = v);

	public var paused(get, never):Bool;
	private inline function get_paused():Bool return mo.paused;
	
	public var muted(get, set):Bool;
	private inline function get_muted():Bool return mo.muted;
	private inline function set_muted(v:Bool):Bool return (mo.muted = v);

/* === Instance Fields === */

	public var media : MediaImpl;
	public var mediaType : MediaType;
	public var canvas : Canvas;
	public var target : Rect<Int>;

	public var readyEvent : VoidSignal;
	public var canManipulateEvent : VoidSignal;
	private var _ready : Bool;
	private var mo : MediaObject;
}
