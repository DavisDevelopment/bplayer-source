package bplayer.core.media;

import tannus.html.fs.*;

import tannus.io.*;
import tannus.ds.*;
import tannus.ds.promises.*;

import bplayer.core.Gallery;
import bplayer.core.GalleryEntry;
import bplayer.db.ApplicationData;

using StringTools;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.ds.StringUtils;
using tannus.ds.promises.PromiseTools;
using tannus.math.TMath;
using Slambda;

class GalleryTools {
	/**
	  * extracts the GalleryEntries from the given MediaGroupProvider 
	  */
	public static function entries(gp : MediaGroupProvider):ArrayPromise<GalleryEntry> {
		return Promise.create({
			var result = new Array();
			// start loading the MediaGroup
			var mgp = gp.get();
			/* when it has finished loading */
			mgp.then(function( mg ) {
				var providers = mg.getAllProviders();
				var entries = providers.map.fn(GalleryEntry.EMedia( _ ));
				return entries;
			});
			mgp.unless(function( error ) {
				throw error;
			});
		}).array();
	}

	/**
	  * Builds a Gallery from the given MediaGroupProvider
	  */
	public static function gallery(group : MediaGroupProvider):GalleryPromise {
		return new GalleryPromise(function(accept, reject) {
			var ep = entries( group );
			ep.then(function( entries ) {
				var gallery = new Gallery();
				for (e in entries) {
					gallery.addEntry( e );
				}
				accept( gallery );
			});
			ep.unless( reject );
		});
	}

	/**
	  * extracts the GalleryEntries from all of the given MediaGroupProviders
	  */
	public static function allEntries(providers : Array<MediaGroupProvider>):ArrayPromise<GalleryEntry> {
		return Promise.create({
			var results:Array<Array<GalleryEntry>> = new Array();
			var stack = new AsyncStack();
			for (p in providers) {
				stack.push(function( done ) {
					var pelp = entries( p );
					pelp.unless.fn(throw _);
					pelp.then(function( el ) {
						results.push( el );
						done();
					});
				});
			}
			stack.run(function() {
				return results.flatten();
			});
		}).array();
	}

	/**
	  * Build a Gallery from an Array of MediaGroupProviders
	  */
	public static function arrayGallery(providers : Array<MediaGroupProvider>):GalleryPromise {
		return new GalleryPromise(function(accept, reject) {
			var ep = allEntries( providers );
			ep.then(function( entries ) {
				var gallery = new Gallery();
				for (e in entries) {
					gallery.addEntry( e );
				}
				accept( gallery );
			});
			ep.unless( reject );
		});
	}

	/**
	  * Get the title for the given entry
	  */
	public static function getTitle(e : GalleryEntry):String {
		switch ( e ) {
			case EMedia( m ):
				return m.getName();
			case EGroup( g ):
				return g.getTitle();
		}
	}
	public static function getMedia(entry:GalleryEntry, callback:MediaImpl->Void):Void {
		switch ( entry ) {
			case EMedia( m ):
				m.getMedia().then( callback );
			case EGroup( g ):
				throw 'cannot perform this action on a group';
		}
	}
	public static function getContext(entry:GalleryEntry, callback:MediaContext->Void):Void {
		getMedia(entry, function( media ) {
			callback(media.getContext());
		});
	}

	/**
	  * Convert a FileEntry into a MediaProvider
	  */
	public static inline function toMediaProvider(wfe : WebFileEntry):MediaProvider {
		return new FileEntryMediaProvider( wfe );
	}

	/**
	  * Convert a Promise<Gallery> into a GalleryPromise
	  */
	public static function galleryPromise(promise : Promise<Gallery>):GalleryPromise {
		return new GalleryPromise(function(yep, nope) {
			promise.then( yep ).unless( nope );
		});
	}

	/**
	  * load a Gallery from the ApplicationData
	  */
	public static function loadGallery(database : ApplicationData):GalleryPromise {
		return galleryPromise(Promise.create({
			var pp = database.loadRootLevelGalleryProviders();
			pp.then(function(providers : Array<MediaGroupProvider>) {
				var gp = arrayGallery( providers );
				gp.then(function(gallery : Gallery) {
					return gallery;
				});
				gp.unless.fn(throw _);
			});
			pp.unless.fn(throw _);
		}));
	}
}
