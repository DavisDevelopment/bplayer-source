package bplayer.core.media;

import tannus.ds.Promise;
import tannus.ds.promises.*;

import gryffin.Tools.defer;

using Slambda;

class MediaGroupProvider {
	/* Constructor Function */
	public function new():Void {

	}

/* === Instance Methods === */

	/**
	  * Get the number 
	  */
	public function get():Promise<MediaGroup> {
		throw 'unimplimented';
	}

	/**
	  * Get the name of [this] group
	  */
	public function getTitle():String {
		throw 'unimplimented';
	}
	public function getKey():String {
		throw 'unimplimented';
	}

/* === Instance Fields === */
}
