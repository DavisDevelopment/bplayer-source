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

class ApplicationSessions extends StoredModel {
	/* Constructor Function */
	public function new(db : ApplicationData):Void {
		super();

		var sub = new SubStorage(Getter.create( db.storage ));
		sub.prefix = 'sessions.';
		storage = sub;

		db.require('sessions', init);
	}

/* === Instance Methods === */

	/**
	  * Save the given Session
	  */
	public function saveSession(s : Session):Void {
		if (s.empty()) {
			session = null;
		}
		else {
			session = s;
		}
	}

	/**
	  * Load the Session
	  */
	public inline function loadSession():Null<Session> {
		return session;
	}

/* === Computed Instance Fields === */

	public var session(get, set):Null<Session>;
	private inline function get_session():Null<Session> return get(MAINSESS);
	private inline function set_session(v : Null<Session>):Null<Session> return set(MAINSESS, v);

/* === Static Fields === */

	private static inline var MAINSESS:String = 'main';
}
