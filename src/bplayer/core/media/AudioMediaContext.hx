package bplayer.core.media;

import tannus.geom.*;

import gryffin.core.*;
import gryffin.display.*;

import bplayer.display.Audio;
import bplayer.display.AudioVisualizer;
import bplayer.display.SpectographAudioVisualizer;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class AudioMediaContext extends MediaContext {
	/* Constructor Function */
	public function new(m : AudioMediaImpl):Void {
		super( m );

		audio = new Audio();
		audio.src = media.getSource();
		mo = cast audio;
		visualizer = null;
		audio.oncanplay.once(function() {
			player = BPlayer.instance.getPlayer();
			visualizer = Type.createInstance(visualizer_class, untyped [this, player]);
			visualizer.buildTree(function() {
				readyEvent.fire();
			});
		});
	}

/* === Instance Methods === */

	/**
	  * paint [video] onto the canvas
	  */
	override private function paint(stage:Stage, c:Ctx):Void {
		if (visualizer != null) {
			visualizer.render(stage, c);
		}
		else {
			c.save();
			c.fillStyle = 'black';
			c.fillRect(target.x, target.y, target.w, target.h);
			c.restore();
		}
	}

	/**
	  * per-frame logic
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		if (visualizer != null) {
			visualizer.update( stage );
		}
	}

	/**
	  * when [this] gets attached to the Player
	  */
	override public function attach(p : Player):Void {
		super.attach( p );
		player = p;
	}

	private function onready(f : Void->Void):Void {
		if ( _ready ) {
			gryffin.Tools.defer( f );
		}
		else {
			readyEvent.once( f );
		}
	}

/* === Computed Instance Fields === */

	private var visualizer_class(get, never): Class<AudioVisualizer>;
	private function get_visualizer_class():Class<AudioVisualizer> {
		return cast SpectographAudioVisualizer;
	}

/* === Instance Fields === */

	private var audio : Audio;
	private var visualizer : Null<AudioVisualizer>;
	private var player : Null<Player>;
}
