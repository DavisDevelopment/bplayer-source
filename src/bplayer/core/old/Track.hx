package bplayer.core;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.chrome.FileSystem in Fs;
import tannus.media.Duration;

import gryffin.media.MediaObject;
import gryffin.display.*;

import bplayer.display.Video;
import bplayer.db.TrackMeta;
import bplayer.db.TrackMetaValue;
import bplayer.db.MarkType;
import bplayer.db.Mark;
import bplayer.core.media.Media;
import bplayer.core.media.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class Track {
	/* Constructor Function */
	public function new(m : Media):Void {
		media = m;
		fmi = cast media;
		renderer = fmi.getRenderer();
		//id = '${file.size}#$title';
		id = m.key;
		list = null;

		/* give metadata fields default-values */
		marks = new Array();
		duration = new Duration();
	}

/* === Instance Methods === */

	/**
	  * Create and return a clone of [this] Track
	  */
	@:access( bplayer.db.TrackMetaValue )
	public function clone():Track {
		var tc = new Track(null, entry, file);
		//tc.metav = metav;
		//tc.marks = marks;
		return tc;
	}

	/**
	  * Initialize [this] Track
	  */
	public function init(callback : Void->Void):Void {
		/*metav.init(this, function() {
			metav.get(function(err, meta) {
				if (err != null) {
					trace( err );
					return ;
				}
				else {
					marks = meta.marks;
					duration = meta.duration;
				}

				callback();
			});
		});*/
		callback();
	}

	private function _jsify():Void {
		var self:Obj = this;
		self.defineGetter('title', title.asGetter());
		self.defineGetter('type', type.asGetter());
	}

	/**
	  * Test for equality with [other]
	  */
	public inline function equals(other : Track):Bool {
		return (id == other.id);
	}

/* === Computed Instance Fields === */

	public var location(get, never):String;
	private inline function get_location():String return fmi.getSource();

	public var type(get, never):TrackType;
	private function get_type():TrackType {
		if (file.type.type == 'audio') {
			return TrackType.TAudio;
		}
		else if (file.type.type == 'video') {
			return TrackType.TVideo;
		}
		else {
			throw 'Error: "${file.type}" is not an acceptable MIME type for a Track';
			return TrackType.TAudio;
		}
	}

	public var title(get, never):String;
	private inline function get_title():String return media;

	public var index(get, never):Int;
	private inline function get_index():Int return -1;//list.trackIndex( this );

/* === Instance Fields === */

	public var id : String;
	public var media : Media;
	public var fmi : FileMediaImpl;
	public var renderer : MediaRenderer<FileMediaImpl>;
	//public var entry : WebFileEntry;
	//public var file : WebFile;
	public var list : Null<Playlist>;
	//public var metav : TrackMetaValue;


	/* == metadata fields == */
	public var marks : Array<Mark>;
	public var duration : Duration;

	private var loc : Null<String> = null;
}
