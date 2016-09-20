package bplayer.core.media;

import tannus.ds.*;
import tannus.io.*;
import tannus.math.Random;

import bplayer.core.Queue;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class Selection extends Queue {
	/* Constructor Function */
	public function new(?array : Array<MediaProvider>):Void {
		super( array );
	}

/* === Instance Methods === */

	/**
	  * play [this] Selection
	  */
	public function play(p : Player):Void {
		p.clear();
		loadWith(p, function() {
			p.play();
		});
	}

	/**
	  * append [this] Selection to the Player's currently active Queue
	  */
	public function addToQueue(p : Player):Void {
		loadWith(p, function() {
			if ( p.data.settings.shuffle ) {
				var r = new Random();
				p.queue = new Queue(r.shuffle( p.queue.tracks ));
			}
		});
	}

/* === Computed Instance Fields === */

}
