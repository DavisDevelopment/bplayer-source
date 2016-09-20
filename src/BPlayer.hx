package ;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.*;
import tannus.html.fs.*;
import tannus.sys.*;
import tannus.chrome.FileSystem in Fs;

import crayon.*;
import foundation.Tools.*;

import chrome.app.AppWindow;

import bplayer.db.ApplicationData;
import bplayer.ds.GallerySorters;

import bplayer.core.*;
import bplayer.core.media.*;
import bplayer.ui.*;

//import ida.Database;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;
using bplayer.core.media.GalleryTools;
using bplayer.core.media.MediaTools;

@:expose( 'bplayer.BPlayer' )
class BPlayer extends Application {
	/* Constructor Funciton */
	public function new():Void {
		super();

		background = win.get( '__backgroundPage' );
		launchData = win.get( 'launchData' );

		player = null;
		playerPage = null;

		rootGallery = null;
		galleryPage = null;

		app_data = null;
	}

/* === Instance Methods === */

	/**
	  * Starting the BPlayer
	  */
	override public function start():Void {
		getApplicationData(function(db : ApplicationData) {
			if (launchData != null) {
				processLaunchData();
			}
			else {
				processDatabase();
			}
		});
	}

	/**
	  * process the provided launch data
	  */
	private function processLaunchData():Void {
		var l:LaunchData = launchData;
		if (l.id != null) {
			trace('handler id: ${l.id}');

			if (l.items != null && (l.items.length > 0)) {
				var providers = l.items.map.fn(_.entry.toMediaProvider());
				trace( providers );
				openPlayer(function() {
					for (p in providers) {
						player.addMedia( p );
					}
				});
			}
		}
		else {
			processDatabase();
		}
	}

	/**
	  * process the app's database
	  */
	private function processDatabase():Void {
		var d = app_data;
		if (d.sessions.session != null) {
			// get the Session
			var session = d.sessions.loadSession();
			trace( session );

			// if the session is empty
			if (session.empty()) {
				openRootGalleryPage();
			}
			else {
				openPlayer(function() {
					player.setSession(session, function() {
						trace('Session restored');
					});
				});
			}
		}
		else {
			openRootGalleryPage();
		}
	}

	/**
	  * load the ApplicationData
	  */
	public function getApplicationData(callback : ApplicationData->Void):Void {
		if (app_data == null) {
			app_data = new ApplicationData();
		}
		app_data.onready(callback.bind( app_data ));
		app_data.init();
	}

	/**
	  * Open up the Gallery page
	  */
	public function openGalleryPage(gallery:Gallery, callback:Void->Void):Void {
		if (galleryPage == null) {
			galleryPage = new GalleryPage(gallery, app_data);
			galleryPage.onready( callback );
		}
		if ( !galleryPage.active ) {
			body.open( galleryPage );
		}
	}

	/**
	  * Open the root Gallery page
	  */
	public function openRootGalleryPage(?callback : Void->Void):Void {
		if (callback == null) {
			callback = (function() null);
		}

		getRootGallery(function( gallery ) {
			gallery.sort( GallerySorters.alphabetical );

			openGalleryPage(gallery, callback);
		});
	}

	/**
	  * Open a PlayerPage
	  */
	public inline function openPlayerPage():Void {
		body.open(getPlayerPage());
	}

	/**
	  * obtain a reference to the Player
	  */
	public function getPlayer():Player {
		if (player == null) {
			player = new Player();
			player.data = app_data;
			win.expose('player', player);
		}
		return player;
	}

	/**
	  * obtain a reference to the Player Page
	  */
	public function getPlayerPage():PlayerPage {
		if (playerPage == null) {
			playerPage = new PlayerPage(app_data, getPlayer());
		}
		return playerPage;
	}

	/**
	  * open up the Player page
	  */
	public function openPlayer(?callback : Void->Void):Void {
		if (!getPlayerPage().active) {
			body.open(getPlayerPage());
		}
		getPlayer().onready(function() {
			if (callback != null) {
				callback();
			}
		});
	}

	/**
	  * resolve a MediaPath
	  */
	public function resolveMediaPath(path : MediaPath):Promise<MediaProvider> {
		return Promise.create({
			try {
				var rootKey:String = path.getRoot();
				var afterRoot = path.slice( 1 );
				var mgp = app_data.getFolderGroup( rootKey );
				mgp.then(function( group ) {
					trace('Got [${group.getTitle()}] group');
					group.follow(afterRoot, function( provider ) {
						trace('Got MediaProvider');
						return provider;
					});
				});
				mgp.unless(function( error ) {
					throw error;
				});
			}
			catch (error : Dynamic) {
				throw error;
			}
		});
	}

	public function openMediaFromPath(path : MediaPath):Void {
		resolveMediaPath( path ).then(function( provider ) {
			openPlayer(function() {
				var p = getPlayer();
				p.clear();
				p.load(provider, function() {
					trace('successfully opened and loaded media from MediaPath');
				});
			});
		});
	}

	public function chooseNewSourceFolder(callback : Void->Void):Void {
		var dp = Fs.chooseDirectory();
		dp.then(function( dir ) {
			app_data.addFolderToGallery( dir );
			callback();
		});
		dp.unless(function( error ) {
			trace( error );
		});
	}

	/**
	  * Obtain a reference to the root Gallery
	  */
	public function getRootGallery(callback : Gallery->Void):Void {
		if (rootGallery == null) {
			var p = app_data.loadGallery();
			p.then(function(g : Gallery) {
				rootGallery = g;
				callback( rootGallery );
			});
			p.unless(function(error) {
				console.error( error );
			});
		}
		else {
			defer(callback.bind( rootGallery ));
		}
	}

/* === Instance Fields === */

	private var background : Dynamic;
	private var launchData : Null<LaunchData>;
	
	private var rootGallery : Null<Gallery>;
	private var galleryPage : GalleryPage;

	private var player : Null<Player>;
	private var playerPage : Null<PlayerPage>;

	private var app_data : Null<ApplicationData>;

/* === Static Methods === */

	/* Main Function */
	public static function main():Void {
		instance = new BPlayer();
		instance.start();
	}

	public static var instance : BPlayer;
}

private typedef LaunchItem = {type:Mime, entry:WebFileEntry};
typedef LaunchData = {
	?id : String,
	?items : Array<LaunchItem>
};
