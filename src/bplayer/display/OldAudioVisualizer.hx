package bplayer.display;

import tannus.io.*;
import bplayer.ui.PlayerControls;
import tannus.ds.*;
import tannus.html.Win;
import tannus.html.fs.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;
import tannus.graphics.Color;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.audio.*;

import bplayer.core.*;
import bplayer.core.TrackType;
import bplayer.ui.*;

import Math.*;
import tannus.math.TMath.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

@:access( gryffin.audio.Audio )
class OldAudioVisualizer extends Ent {
	/* Constructor Function */
	public function new(p : MediaPane):Void {
		super();

		pane = p;

		//link();
	}

/* === Instance Methods === */

	public function setup():Void {
		// link();
	}

	/**
	  * Initialize the connections used by [this]
	  */
	@:allow( bplayer.display.AudioProcessor )
	private function link():Void {
		if ( reddy ) {
			return ;
		}

		/*
		ctx = new AudioContext();
		*/
		//ctx = pane.player.audioProcessor.context;
		src = ctx.createSource( pane.audio );

		splitter = ctx.createChannelSplitter( 2 );
		src.connect( splitter );

		left_analyser = ctx.createAnalyser();
		splitter.connect(left, [0]);

		right_analyser = ctx.createAnalyser();
		splitter.connect(right, [1]);

		merger = ctx.createChannelMerger( 2 );
		left_analyser.connect(merger, [0, 0]);
		right_analyser.connect(merger, [0, 1]);
		merger.connect( ctx.destination );
		
		left.fftSize = 512;
		right.fftSize = 512;
		left.smoothing = 0.3;
		right.smoothing = 0.3;

		/* expose interactive values */

		/*
		var w = tannus.html.Win.current;

		function get_smoothing() return left.smoothing;
		function set_smoothing(v : Float) {
			left.smoothing = v;
			return right.smoothing = v;
		}
		var rsmoothing = new Ptr(get_smoothing, set_smoothing);
		w.exposeRef('smoothing', rsmoothing);

		function get_fft() return left.fftSize;
		function set_fft(v : Int) {
			left.fftSize = v;
			return right.fftSize = v;
		}
		var rfft = new Ptr(get_fft, set_fft);
		w.exposeRef('fft', rfft);
		*/

		reddy = true;
	}

	/**
	  * Update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		if (reddy && !pane.player.paused) {
			ldata = left.getByteTimeDomainData();
			rdata = right.getByteTimeDomainData();
		}

		if ( !pane.player.paused ) {
			//trace( data.length );
		}
	}

	/**
	  * Render [this]
	  */
	override public function render(s:Stage, c:Ctx):Void {
		renderBackground(s, c);
		if (reddy && ldata != null && rdata != null) {
			renderAudio(s, c);
		}
	}

	/**
	  * Render [this] for when the audio is paused
	  */
	public function renderBackground(s:Stage, c:Ctx):Void {
		c.save();
		c.beginPath();
		c.fillStyle = 'black';
		c.drawRect( pane.rect );
		c.closePath();
		c.fill();
		c.restore();
	}

	/**
	  * render the audio visualization
	  */
	public function renderAudio(s:Stage, c:Ctx):Void {
		waveform1(s, c);
		waveform2(s, c);
		//frequencyWaveform(s, c);
	}

	/**
	  * Render the first half of the time-domain waveform stroke
	  */
	public function waveform1(s:Stage, c:Ctx):Void {
		var colors = getPrimaryWaveColors();
		c.save();
		c.lineWidth = 2;

		/* draw the left channel waveform */
		c.beginPath();
		c.strokeStyle = colors[0].toString();
		drawAudioDataVertices(ldata, c);
		c.stroke();

		/* draw its reflection */
		c.beginPath();
		c.strokeStyle = colors[1].toString();
		drawInvertedAudioDataVertices(ldata, c);
		c.stroke();

		c.restore();
	}

	/**
	  * Render the second half of the time-domain waveform stroke
	  */
	public function waveform2(s:Stage, c:Ctx):Void {
		var colors = getSecondaryWaveColors();
		c.save();
		c.lineWidth = 2;

		c.beginPath();
		c.strokeStyle = colors[0].toString();
		drawAudioDataVertices(rdata, c);
		c.stroke();

		c.beginPath();
		c.strokeStyle = colors[1].toString();
		drawInvertedAudioDataVertices(rdata, c);
		c.stroke();

		c.restore();
	}

	/**
	  * Get the color of the primary waveform
	  */
	private function getPrimaryWaveColors():Array<Color> {
		var t = pane.player.theme;
		if (pwc == null) {
			var base = t.secondary;
			var colors:Array<Color> = new Array();
			colors.push(base.lighten( 15 ));
			colors.push(base.darken( 50 ));
			pwc = colors.map( t.save );
			return colors;
		}
		else {
			return pwc.map( t.restore );
		}
	}

	/**
	  * Get the color of the secondary waveform
	  */
	private function getSecondaryWaveColors():Array<Color> {
		var t = pane.player.theme;
		if (swc == null) {
			var base = pane.player.theme.secondary.invert();
			var colors = new Array();
			colors.push(base.darken( 10 ));
			colors.push(base.darken( 35 ));
			swc = colors.map( t.save );
			return colors;
		}
		else {
			return swc.map( t.restore );
		}
	}

	/**
	  * Create a VertexArray from AudioData
	  */
	public function drawAudioDataVertices(d:AudioData<Int>, c:Ctx, ?r:Rectangle):Void {
		if (r == null) r = pane.rect;
		var h:Float = (r.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (r.w * 1.0 / d.length);
		var x:Float = 0;
		for (i in 0...d.length) {
			var offset:Float = ((d.length / 2) - abs((d.length / 2) - i));
			offset = (offset / (d.length / 2));
			var n = (d[i] / 128.0);
			var y = (mid + (mid - (n * mid)) * offset);
			(i == 0 ? c.moveTo : c.lineTo)(x, y);
			x += sliceWidth;
		}
	}

	/**
	  * Create a VertexArray from AudioData
	  */
	public function drawInvertedAudioDataVertices(d:AudioData<Int>, c:Ctx, ?r:Rectangle):Void {
		if (r == null) r = pane.rect;
		var h:Float = (r.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (r.w * 1.0 / d.length);
		var x:Float = 0;
		for (i in 0...d.length) {
			var offset:Float = ((d.length / 2) - abs((d.length / 2) - i));
			offset = (offset / (d.length / 2));
			var n = ((255 - d[i]) / 128.0);
			var y = (mid + (mid - (n * mid)) * offset);
			(i == 0 ? c.moveTo : c.lineTo)(x, y);
			x += sliceWidth;
		}
	}

/* === Computed Instance Fields === */

	public var controls(get, never):PlayerControls;
	private inline function get_controls():PlayerControls return pane.player.controls;

	public var left(get, never):AudioAnalyser;
	private inline function get_left():AudioAnalyser return left_analyser;

	public var right(get, never):AudioAnalyser;
	private inline function get_right():AudioAnalyser return right_analyser;

/* === Instance Fields === */

	public var pane : MediaPane;

	public var ctx : AudioContext;
	public var src : AudioSource;
	public var splitter : AudioChannelSplitter;
	public var merger : AudioChannelMerger;
	public var left_analyser : AudioAnalyser;
	public var right_analyser : AudioAnalyser;

	private var ldata : Null<AudioData<Int>> = null;
	private var rdata : Null<AudioData<Int>> = null;

	private var reddy : Bool = false;
	private var pwc : Null<Array<Int>> = null;
	private var swc : Null<Array<Int>> = null;
}
