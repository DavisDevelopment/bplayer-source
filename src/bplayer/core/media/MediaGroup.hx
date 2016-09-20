package bplayer.core.media;

import tannus.io.Signal;
import tannus.io.VoidSignal;

import tannus.ds.Promise;
import tannus.ds.promises.*;

import gryffin.Tools.defer;

using Slambda;

class MediaGroup implements MediaEntry {
	/* Constructor Function */
	public function new():Void {
		updateEvent = new VoidSignal();
		disconnectEvent = new VoidSignal();
	}

/* === Instance Methods === */

	public function getKey():String {
		throw 'unimplimented';
	}
	public function getPathKey():String throw 'unimplimented';

	public function getTitle():String {
		throw 'unimplimented';
	}

	public function getParent():Null<MediaEntry> {
		return null;
	}

	public function getNames():Array<String> {
		throw 'unimplimented';
	}

	public function getMedia(name : String):MediaProvider {
		return MediaProvider.create(name, getMediaProvider( name ));
	}

	private function getMediaProvider(name : String):MediaProvider.MediaProviderDef {
		throw 'unimplimented';
	}

	public function getAllProviders():Array<MediaProvider> {
		return getNames().map( getMedia );
	}

	public function getAll():ArrayPromise<MediaImpl> {
		return Promise.create({
			var stack = new tannus.ds.AsyncStack();
			var all = new Array();
			for (p in getAllProviders()) {
				var pp = p.getMedia();
				pp.then( all.push );
				pp.unless(function( error ) {
					throw error;
				});
			}
			stack.run(function() {
				return all;
			});
		}).array();
	}

/* === Instance Fields === */

	public var updateEvent : VoidSignal;
	public var disconnectEvent : VoidSignal;
}
