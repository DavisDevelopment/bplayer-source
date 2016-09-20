package bplayer.core.media;

import tannus.io.*;
import tannus.ds.*;
import tannus.ds.promises.*;
import tannus.graphics.Color;

#if !macro
import gryffin.core.*;
import gryffin.display.*;
#end

import bplayer.db.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class MediaImpl implements MediaEntry {
	/* Constructor Function */
	public function new():Void {
		mediaGroup = null;
	}

/* === Instance Methods === */

	/* the display title of the media */
	public function getTitle():String throw 'unimplimented';

	/* the name actually used to load it from storage */
	public function getKey():String throw 'unimplimented';
	public function getPathKey():String throw 'unimplimented';

	/* the 'parent' of [this] */
	public function getParent():Null<MediaEntry> {
		return cast mediaGroup;
	}

	public function getSource():String throw 'unimplimented';

	/* get the object used to render [this] Media */
	public function getContext():MediaContext {
		return new MediaContext( this );
	}

	private inline function getlib(f : ApplicationMediaDatabase->Void):Void {
		BPlayer.instance.getApplicationData(function(db) {
			f( db.library );
		});
	}
	public function hasMediaInfo():BoolPromise {
		return Promise.create({
			getlib(function(lib) @forward lib.hasMediaInfo(getTitle()));
		}).bool();
	}

	/**
	  * attempt to load the MediaInfo associated with [this] Media
	  */
	private function queryMediaInfo():Promise<Null<MediaInfo>> {
		return Promise.create({
			BPlayer.instance.getApplicationData(function( db ) {
				@forward db.library.getMediaInfo(getTitle());
			});
		});
	}
	private function addMediaInfo():Promise<MediaInfo> {
		return Promise.create({
			getlib(function(lib) {
				@forward lib.putMedia( this );
			});
		});
	}
	public function getMediaInfo():Promise<MediaInfo> {
		return Promise.create({
			hasMediaInfo()
			.yep(function() {
				@forward queryMediaInfo();
			})
			.nope(function() {
				@forward addMediaInfo();
			})
			.unless(function(error) {
				throw error;
			});
		});
	}
	public function gmi(callback : Null<MediaInfo>->Void):Void {
		getMediaInfo().then( callback ).unless(function(error) callback( null ));
	}

/* === Instance Fields === */

	public var mediaGroup : Null<MediaGroup>;
}
