package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.http.*;
import tannus.mvc.*;
import tannus.storage.SubStorage;
import tannus.storage.chrome.ChromeStorage;
import tannus.chrome.Storage.local in storageArea;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class ApplicationProfile extends StoredModel {
	/* Constructor Function */
	public function new(db : ApplicationData):Void {
		super();

		var sub = new SubStorage(Getter.create( db.storage ));
		sub.prefix = 'profile';
		storage = sub;

		db.require('profile', init);
	}

/* === Instance Methods === */

	/**
	  * converts PlaybackMode to ModeData
	  */
	private function mode2data(m : PlaybackMode):ModeData {
		return {
			volume: m.volume,
			playbackRate: m.playbackRate,
			muted: m.muted,
			shuffle: m.shuffle,
			paused: m.paused
		};
	}

	/**
	  * converts ModeData to PlaybackMode
	  */
	private function data2mode(d : ModeData):PlaybackMode {
		return PlaybackMode.create(
			d.volume,
			d.playbackRate,
			d.muted,
			d.shuffle,
			d.paused
		);
	}

/* === Computed Instance Fields === */

	public var mode(get, set):Null<PlaybackMode>;
	private function get_mode():Null<PlaybackMode> {
		if (hasAttribute( 'mode' )) {
			var data:ModeData = getAttribute( 'mode' );
			return data2mode( data );
		}
		else {
			return null;
		}
	}
	private function set_mode(m : Null<PlaybackMode>):Null<PlaybackMode> {
		if (m == null) {
			remove( 'mode' );
			return null;
		}
		else {
			setAttribute('mode', mode2data( m ));
			return m;
		}
	}
}

private typedef ModeData = {
	var volume : Float;
	var playbackRate : Float;
	var muted : Bool;
	var shuffle : Bool;
	var paused : Bool;
};
