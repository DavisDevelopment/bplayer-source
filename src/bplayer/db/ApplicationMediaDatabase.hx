package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.ds.promises.*;
import tannus.html.fs.*;
import tannus.http.*;

import ida.*;

import bplayer.core.*;
import bplayer.core.media.*;

import foundation.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class ApplicationMediaDatabase {
	/* Constructor Function */
	public function new(_db : ApplicationData):Void {
		d = _db;
		onreddy = new VoidSignal();
		init();
	}

/* === Instance Methods === */

	/**
	  * invoke [callback] when [this] Model is ready for use
	  */
	public inline function onready(callback : Void -> Void):Void {
		(reddy ? defer : onreddy.once)( callback );
	}

	/**
	  * Initialize [this] Model
	  */
	private function init():Void {
		var dbp = Database.open(DBNAME, 1, build_db);
		dbp.then(function( _db ) {
			db = _db;
			reddy = true;
			onreddy.fire();
		});
		dbp.unless(function(err) {
			console.error( err );	
		});
	}

	/**
	  * construct the database
	  */
	private function build_db(db : Database):Void {
		/* -- build the [media_info] table -- */
		var info = db.createObjectStore('media_info', {
			keyPath : 'title'
		});

		var i = info.createIndex.bind();
		//i('title', 'title', {
			//unique: true
		//});
		i('duration', 'duration');
		i('starred', 'starred');
		i('viewed', 'viewed');
		i('rating', 'rating');
		i('last_time', 'last_time');
	}

	/**
	  * get a MediaInfo by id
	  */
	public function getMediaInfoObject(id : String):Promise<Null<Dynamic>> {
		return Promise.create({
			function query() {
				var table = tl( 'media_info' );
				var infoObjectPromise = table.get( id );
				infoObjectPromise.then(function(rawMediaInfo : Null<Dynamic>):Void {
					return rawMediaInfo;
				});
				infoObjectPromise.unless(function( error ) {
					console.error( error );
					throw error;
				});
			}

			onready( query );
		});
	}

	/**
	  * get a MediaInfo by id
	  */
	public function getMediaInfo(title : String):Promise<Null<MediaInfo>> {
		return getMediaInfoObject( title ).transform(function(raw : Null<Dynamic>):Null<MediaInfo> {
			if (raw == null) {
				return null;
			}
			else {
				return new MediaInfo(d, raw);
			}
		});
	}

	/**
	  * Insert or update the given media info
	  */
	public function putMediaInfoObject(rawInfo : Dynamic):Promise<MediaInfo> {
		return Promise.create({
			function query() {
				var table = tl('media_info', 'readwrite');
				var putPromise = table.put( rawInfo );
				putPromise.then(function(title : Dynamic) {
					@forward getMediaInfo(cast title);
				});
				putPromise.unless(function(error : Dynamic) {
					throw error;
				});
			}

			onready( query );
		});
	}

	/**
	  * create new row for the given Media
	  */
	public function putMedia(m : Media):Promise<MediaInfo> {
		var rawRow:Dynamic = {
			title: m.title,
			duration: -1,
			starred: false,
			viewed: 0,
			rating: null,
			last_time: null
		};

		return putMediaInfoObject( rawRow );
	}

	/**
	  * check whether there is a row for the given title
	  */
	public function hasMediaInfo(title : String):BoolPromise {
		return getMediaInfoObject( title ).transform(function(raw : Null<Dynamic>):Bool {
			return (raw != null);
		}).bool();
	}

	/**
	  * get a Transaction object
	  */
	private inline function tl(table:String, ?mode:String) {
		return db.transaction(table, mode).objectStore( table );
	}
	
/* === Instance Fields === */

	public var d : ApplicationData;
	public var db : Database;

	private var onreddy : VoidSignal;
	private var reddy : Bool = false;

/* === Static Fields === */

	private static inline var DBNAME:String = 'library';
}
