package bplayer.display;

import tannus.io.*;
import tannus.ds.*;

import gryffin.audio.*;

import Std.*;
import Math.*;
import tannus.math.TMath;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

@:access( bplayer.core.Player )
class AudioProcessor {
	/* Constructor Function */
	public function new(p : Player):Void {
		player = p;
		mpane = player.pane;

		context = new AudioContext();
		player.onready(function() {
			mpane.visualizer.ctx = context;
			mpane.visualizer.link();
		});
		//shader = context.createShader(4096, 2, 2);
		//srcs();

		//__bind();
	}

/* === Instance Methods === */

	/**
	  * Process the raw audio data
	  */
	public function process(sample : AudioShaderScope):Void {
		var ib = sample.input;
		var ob = sample.output;

		for (channel in 0...ib.numberOfChannels) {
			var ic = ib.getChannelData( channel );
			var oc = ob.getChannelData( channel );
			
			for (i in 0...ic.length) {
				oc[i] = ic[i];
			}
		}

		//trace('processing..');
	}

	/**
	  * Bind events from Player onto [this]
	  */
	private function __bind():Void {
		// listen for track-changes
		player.trackChange.on( _trackChange );

		player.onready(function() {
			if (player.currentTrack != null) {
				player.pane.visualizer.ctx = context;
				player.pane.visualizer.link();
				link();
			}
		});

		//shader.processEvent.on( process );
	}

	private function _trackChange(delta : Delta<Track>):Void {
		if ( delta.current.exists ) {
			relink(switch ( delta.current.type ) {
				case TAudio: asource;
				case TVideo: vsource;
			});
		}
		/*
		if (delta.current.exists && delta.previous.exists) {
			var changed:Bool = (!delta.current.type.equals( delta.previous.type ));
			if ( changed ) {
				relink();
			}
		}
		else if ( delta.current.exists ) {
			link();
		}
		*/
	}

	public function link():Void {
		//asource.connect( shader );
		//shader.connect( context.destination );
	}

	public function relink(src : AudioSource):Void {
		desrc();
		//src.connect( shader );
		switch ( player.currentTrack.type ) {
			case TAudio:
				if ( !player._ready ) {
					shader.connect( context.destination );
					player.onready(relink.bind( src ));
				} else shader.connect( player.pane.visualizer.splitter );

			case TVideo:
				//shader.connect( context.destination );
		}
	}

	private function desrc():Void {
		//try asource.disconnect(untyped shader) catch(err:Dynamic) trace( err );
		//try vsource.disconnect(untyped shader) catch(err:Dynamic) trace( err );
		asource.disconnect();
		vsource.disconnect();
		shader.disconnect();
		//try shader.disconnect(untyped player.pane.visualizer.splitter) catch (err:Dynamic) trace( err );
		//try shader.disconnect(untyped context.destination) catch (err:Dynamic) trace( err );
	}

	private function srcs():Void {
		asource = context.createSource( mpane.audio );
		vsource = context.createSource( mpane.video );
	}

/* === Instance Fields === */

	public var player : Player;
	public var mpane : MediaPane;

	public var context : AudioContext;
	public var asource : AudioSource;
	public var vsource : AudioSource;
	//public var shader : AudioShader;
	public var shader : AudioSource;
}
