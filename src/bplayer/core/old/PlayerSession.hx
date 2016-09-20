package bplayer.core.old;

import tannus.ds.*;
import tannus.html.fs.*;
import tannus.chrome.FileSystem in Fs;

import tannus.media.Duration;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class PlayerSession {
	/* Constructor Function */
	public function new():Void {
		name = 'main';
		playlist = new Array();
		playing = {track:'', time:0};
	}

/* === Instance Methods === */

	/**
	  * Extract [this]'s data from the given Player
	  */
	public function extractFrom(p : Player):Void {
		if (p.playlist.empty()) {
			playlist = null;
		}
		else {
			var l:Array<TrackState> = playlist = new Array();
			for (t in p.playlist) {
				l.push({
					track_id: t.id,
					entry_id: t.getEntryId()
				});
			}
		}
		
		var track:Maybe<Track> = p.currentTrack;
		
		playing = track.ternary({
			track: _.id,
			time: p.currentTime
		}, null);
	}

	/**
	  * Restore [this] Session to the given Player
	  */
	public function restoreTo(p:Player, ?cb:Void->Void):Void {
		if (playlist != null && playing != null) {
			playlistEntries(function( entries ) {
				p.loadEntries(entries, function() {
					var t = p.playlist.getTrackById( playing.track );
					if (t != null) {
						p.loadTrack(t, function() {
							p.currentTime = playing.time;

							if (cb != null) cb();
						});
					}
					else {
						if (cb != null) cb();
					}
				});
			});
		}
		else {
			if (cb != null) {
				cb();
			}
		}
	}

	/**
	  * load the playlist entries
	  */
	private function playlistEntries(f : Array<WebFileEntry>->Void):Void {
		var stack:AsyncPool<WebFileEntry> = new AsyncPool();
		for (ts in playlist) {
			stack.push(function(index, done) {
				trace( ts.entry_id );
				var crp = Fs.canRestore( ts.entry_id );
				crp.yep(function() {
					Fs.restoreEntry(ts.entry_id, function(e) {
						done(null, cast e);
					});
				});
				crp.nope(done.bind('Error: Failed to restore entry "${ts.entry_id}"', null));
			});
		}
		stack.run(function( res ) {
			var entries = res.macmapfilter((_.value != null && _.error == null), _.value);
			f( entries );
		});
	}

/* === Instance Fields === */

	public var name : String;
	public var playlist : Null<Array<TrackState>>;
	public var playing : Null<PlayingState>;
}

typedef PlayingState = {
	var track : String;
	var time : Float;
};

typedef TrackState = {
	var track_id : String;
	var entry_id : String;
};
