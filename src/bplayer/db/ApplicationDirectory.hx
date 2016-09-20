package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.http.*;
import tannus.mvc.*;

import ida.*;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class ApplicationDirectory extends StoredModel {
	/* constructor function */
	public function new(d : ApplicationData):Void {
		super();

		var sub = new SubStorage(Getter.create( db.storage ));
		sub.prefix = 'dir:';
		storage = sub;

		d.require('resources', init);
	}

/* === Instance Methods === */

	public function selectDirectory():Promise<WebDirectoryEntry> {
		//var cd = bplayer.ui.AppMenu
	}

/* === Instance Fields === */

	private var dirId(get, set):Null<String>;
	private inline function get_dirId():Null<String> return get( 'dir_id' );
	private inline function set_dirId(v : Null<String>):Null<String> return set('dir_id', v);
}
