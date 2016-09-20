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

class ApplicationSettings extends StoredModel {
	/* Constructor Function */
	public function new(db : ApplicationData):Void {
		super();

		var sub = new SubStorage(Getter.create( db.storage ));
		sub.prefix = 'settings.';
		storage = sub;

		db.require('settings', init);
	}

/* === Computed Instance Fields === */

	public var shuffle(get, set):Bool;
	private inline function get_shuffle():Bool return mget( 'shuffle' ).or( false );
	private inline function set_shuffle(v : Bool):Bool return set('shuffle', v);

	public var volume(get, set):Float;
	private inline function get_volume():Float return mget( 'volume' ).or( 1.0 );
	private inline function set_volume(v : Float):Float return set('volume', v);
	
	public var speed(get, set):Float;
	private inline function get_speed():Float return mget( 'speed' ).or( 1.0 );
	private inline function set_speed(v : Float):Float return set('speed', v);
}
