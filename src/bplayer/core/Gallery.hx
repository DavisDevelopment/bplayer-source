package bplayer.core;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.Win;
import tannus.html.fs.*;
import tannus.css.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;
import tannus.events.*;

import chrome.app.AppWindow;
import chrome.Windows.current in currentWindow;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.Tools.*;

import bplayer.display.*;
import bplayer.ui.*;
import bplayer.db.*;

import Math.*;
import tannus.math.TMath.*;

import js.html.Blob;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.math.RandomTools;
using bplayer.core.media.MediaTools;
using bplayer.core.media.GalleryTools;

class Gallery {
	/* Constructor Function */
	public function new():Void {
		entries = new Array();
	}

/* === Instance Methods === */

	/**
	  * Add an entry to [this] Gallery
	  */
	public function addEntry(e : GalleryEntry):Void {
		entries.push( e );
	}

	/**
	  * Get Entry
	  */
	public function getEntry(index : Int):GalleryEntry {
		return entries[index];
	}

	/**
	  * Iterate over [this] Gallery
	  */
	public inline function iterator():GalleryIterator {
		return new GalleryIterator( this );
	}

	/**
	  * Sort [this] Gallery by the given function 
	  */
	public function sort(compare : GalleryEntry -> GalleryEntry -> Int):Void {
		haxe.ds.ArraySort.sort(entries, compare);
	}

/* === Computed Instance Fields === */

	public var length(get, never):Int;
	private inline function get_length():Int return entries.length;

/* === Instance Fields === */

	private var entries : Array<GalleryEntry>;
}

class GalleryIterator {
	private var g : Gallery;
	private var i : Int;
	public inline function new(g : Gallery):Void {
		this.g = g;
		i = 0;
	}
	public inline function hasNext():Bool return (i < g.length);
	public inline function next():GalleryEntry return g.getEntry( i++ );
}
