package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.ds.promises.*;
import tannus.http.*;
import tannus.mvc.*;
import tannus.storage.SubStorage;
import tannus.storage.chrome.ChromeStorage;
import tannus.chrome.Storage.local in storageArea;
import tannus.html.fs.*;
import tannus.html.fs.WebDirectoryEntry in WebDir;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.Runtime;

import bplayer.core.*;
import bplayer.core.media.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class ApplicationData extends StoredModel {
	/* Constructor Function */
	public function new():Void {
		super();

		var cs = new ChromeStorage( storageArea );
		storage = cs;

		__attachAttributes();
	}

/* === Instance Methods === */

	/**
	  * Attach sub-models to [this]
	  */
	private function __attachAttributes():Void {
		//rd = new ApplicationDirectory( this );
		settings = new ApplicationSettings( this );
		profile = new ApplicationProfile( this );
		sessions = new ApplicationSessions( this );
		library = new ApplicationMediaDatabase( this );
	}

	/**
	  * Checks whether there is anything in the Gallery
	  */
	public function isGalleryEmpty():Bool {
		return galleryFolders.empty();
	}

	/**
	  * add a folder to our registry
	  */
	public function addFolderToGallery(dir : WebDir):Void {
		var key = Fs.retainEntry(cast dir);
		var list = galleryFolders;
		if (!list.has( key )) {
			list.push( key );
		}
		galleryFolders = list;
		save();
	}

	/**
	  * remove a folder from the Gallery
	  */
	public function removeFolderFromGallery(dir : WebDir):Void {
		var key = Fs.retainEntry(cast dir);
		var list = galleryFolders;
		list.remove( key );
		galleryFolders = list;
		save();
	}

	/**
	  * load the Gallery folders
	  */
	public function loadGalleryFolders():ArrayPromise<WebDir> {
		var stack:AsyncPool<WebDir> = new AsyncPool();
		var keys = galleryFolders;
		for (key in keys) {
			stack.push(function(index, provide) {
				var res = Fs.canRestore( key );
				res.nope(function() {
					provide('Folder is no longer restorable', null);
				});
				res.yep(function() {
					Fs.restoreEntry(key, function( entry ) {
						if (Runtime.lastError == null) {
							var folder = new WebDir(cast entry);
							provide(null, folder);
						}
						else {
							provide(Runtime.lastError, null);
						}
					});
				});
			});
		}
		return Promise.create({
			stack.run(function( results ) {
				var folders = results.macmap( _.value );
				return folders;
			});
		}).array();
	}

	/**
	  * load the providers
	  */
	public function loadRootLevelGalleryProviders():ArrayPromise<MediaGroupProvider> {
		return Promise.create({
			var gfp = loadGalleryFolders();
			gfp.then(function(folders) {
				var providers:Array<MediaGroupProvider> = new Array();
				var keys = galleryFolders;
				for (index in 0...folders.length) {
					providers.push(new SourceDirectoryMediaGroupProvider(folders[index], keys[index]));
				}
				return providers;
			});
			gfp.unless(function(error) {
				throw error;
			});
		}).array();
	}

	/**
	  * load a specific Directory
	  */
	private function loadDirectoryByName(key : String):Promise<WebDir> {
		return Promise.create({
			Fs.restoreEntry(key, function( entry ) {
				if (Runtime.lastError == null && entry != null) {
					var folder = new WebDir(cast entry);
					return folder;
				}
				else {
					throw Runtime.lastError;
				}
			});
		});
	}

	/**
	  * Get a MediaGroup by name
	  */
	public function getFolderGroup(key : String):Promise<MediaGroup> {
		return Promise.create({
			var dp = loadDirectoryByName( key );
			dp.then(function( dir ) {
				trace('#magic');
				@forward (new SourceDirectoryMediaGroupProvider(dir, key).get());
			});
			dp.unless(function( error ) {
				throw error;
			});
		});
	}

/* === Computed Instance Fields === */

	public var galleryFolders(get, set):Array<String>;
	private inline function get_galleryFolders():Array<String> return mget( 'locations' ).or(new Array());
	private inline function set_galleryFolders(v : Array<String>):Array<String> {
		return set('locations', v);
	}

/* === Instance Fields === */

	//public var rd : ApplicationDirectory;
	public var settings : ApplicationSettings;
	public var profile : ApplicationProfile;
	public var sessions : ApplicationSessions;
	public var library  : ApplicationMediaDatabase;
}
