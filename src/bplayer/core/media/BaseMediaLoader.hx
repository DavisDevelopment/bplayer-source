package bplayer.core.media;

import tannus.io.*;
import tannus.ds.*;

import bplayer.core.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class BaseMediaLoader<T> extends StandardTask<String, Array<MediaProvider>> {
	/* Constructor Function */
	public function new():Void {
		super();

		result = new Array();
		sources = new Array();
		errors = new Array();
	}

/* === Instance Methods === */

	/**
	  * trigger the loading of some shit
	  */
	public function load(srcs:Array<T>, ?callback:Array<MediaProvider>->Void):Void {
		sources = srcs;
		perform(function() {
			if (callback != null) {
				callback( result );
			}
		});
	}

	/**
	  * main action body
	  */
	override private function action(complete : Void->Void):Void {
		var stack = new AsyncStack();
		for (src in sources) {
			stack.push(function(next) {
				loadSource(src, function(error, media) {
					if (error != null) {
						errors.push( error );
					}
					else if (media != null) {
						result.push( media );
					}
					next();
				});
			});
		}
		stack.run( complete );
	}

	/**
	  * load a media
	  */
	private function loadSource(source:T, callback:Null<Dynamic>->Null<MediaProvider>->Void):Void {
		callback(null, null);
	}

/* === Instance Fields === */

	private var sources : Array<T>;
	public var errors : Array<Dynamic>;
}
