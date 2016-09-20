package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.http.*;
import tannus.mvc.*;
import tannus.storage.SubStorage;
import tannus.storage.chrome.ChromeStorage;
import tannus.chrome.Storage.local in storageArea;
import tannus.media.Duration;
import tannus.media.TimeRanges;
import tannus.media.TimeRange;

import bplayer.core.*;

import smith.core.Value;
import smith.core.Callback;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class TrackMetaValue extends Value<TrackMeta> {
	/* Constructor Function */
	public function new(db:ApplicationData, id:String):Void {
		d = db;
		this.id = id;
	}

/* === Instance Methods === */

	public function init(t:Track, cb:Void->Void):Void {
		var ep = d.library.getTrackEntry( id );
		ep.then(function( entry ) {
			if (entry != null) {
				//var tm = new TrackMeta( entry );
				entry = null;
				cb();
			}
			else {
				//cb('No track by given id', null);
				d.library.putTrack(t, function(err) {
					if (err == null) {
						cb();
					}
					else {
						trace('ERROR: $err');
					}
				});
			}
		});
	}

	override public function get(cb : Cb<TrackMeta>):Void {
		var ep = d.library.getTrackEntry( id );
		ep.then(function( entry ) {
			if (entry != null) {
				var tm = new TrackMeta( entry );
				cb(null, tm);
			}
			else {
				cb('No track by given id', null);
			}
		});
	}

	@:access( bplayer.db.TrackMeta )
	override public function set(tm:TrackMeta, cb:Ercb):Void {
		d.library.putTrackEntry(tm.meta, cb);
	}

/* === Instance Fields === */

	private var d : ApplicationData;
	private var id : String;
}
