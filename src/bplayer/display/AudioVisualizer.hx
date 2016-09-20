package bplayer.display;

import tannus.io.*;
import bplayer.core.PlayerControls;
import tannus.ds.*;
import tannus.html.Win;
import tannus.geom.*;
import tannus.graphics.Color;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.audio.*;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.ui.*;
import bplayer.core.media.*;
import bplayer.core.media.AudioMediaContext in Media;

import Math.*;
import tannus.math.TMath.*;
import Slambda.fn;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

@:access( bplayer.core.media.MediaContext )
@:access( bplayer.core.media.AudioMediaContext )
@:access( gryffin.audio.Audio )
class AudioVisualizer {
	/* Constructor Function */
	public function new(m:Media, p:Player):Void {
		media = m;
		player = p;

		context = null;
	}

/* === Instance Methods === */

	/**
	  * Build out the AudioNode hierarchy
	  */
	public function buildTree(?callback : Void->Void):Void {
		if (callback == null) {
			callback = (function() return null);
		}

		if (context != null) {
			context.close(function() {
				return ;
			});
		}

		/* == Build Nodes == */
		context = new AudioContext();
		var c = context;
		
		source = c.createSource(cast media.audio);
		splitter = c.createChannelSplitter( 2 );
		merger = c.createChannelMerger( 2 );
		leftAnalyser = c.createAnalyser();
		rightAnalyser = c.createAnalyser();

		/* == Connect Nodes == */

		// split the audio stream into 2 channels
		source.connect( splitter );
		splitter.connectChannel(leftAnalyser, 0);
		splitter.connectChannel(rightAnalyser, 1);
		leftAnalyser.connect(merger, [0, 0]);
		rightAnalyser.connect(merger, [0, 1]);
		merger.connect( context.destination );

		config();

		ready = true;

		defer( callback );
	}

	/**
	  * Free up any resources used by [this]
	  */
	public function destroy():Void {
		context.close(function() {
			trace('AudioContext closed');
		});
	}

	/**
	  * Configure [this] AudioVisualizer
	  */
	public inline function config(fftSize:Int=2048, smoothing:Float=0.8):Void {
		this.fftSize = fftSize;
		this.smoothing = smoothing;
	}

	/**
	  * Perform per-frame logic
	  */
	public function update(stage : Stage):Void {
		null;
	}

	/**
	  * Render visualization
	  */
	public function render(stage:Stage, c:Ctx):Void {
		null;
	}

/* === Computed Instance Fields === */

	public var audio(get, never):Audio;
	private inline function get_audio():Audio return media.audio;

	public var fftSize(get, set):Int;
	private inline function get_fftSize():Int return leftAnalyser.fftSize;
	private inline function set_fftSize(v : Int):Int {
		return (leftAnalyser.fftSize = rightAnalyser.fftSize = v);
	}

	public var smoothing(get, set):Float;
	private inline function get_smoothing():Float return leftAnalyser.smoothing;
	private inline function set_smoothing(v : Float):Float return (leftAnalyser.smoothing = rightAnalyser.smoothing = v);

/* === Instance Fields === */

	public var media : Media;
	public var player : Player;
	public var context : AudioContext;
	public var source : AudioSource;
	public var splitter : AudioChannelSplitter;
	public var merger : AudioChannelMerger;
	public var leftAnalyser : AudioAnalyser;
	public var rightAnalyser : AudioAnalyser;

	private var ready : Bool = false;
}
