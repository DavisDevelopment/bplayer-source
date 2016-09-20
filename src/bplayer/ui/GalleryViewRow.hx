package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.geom.*;
import tannus.io.*;
import tannus.internal.CompileTime in Ct;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.core.media.*;

import haxe.Template;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;
using bplayer.core.media.MediaTools;
using bplayer.core.media.GalleryTools;

class GalleryViewRow extends FlexRow {
	/* Constructor Function */
	public function new(gv : GalleryView):Void {
		super([3, 3, 3, 3], false);
		addClass('gallery-row');
		addClass('align-spaced');

		galleryView = gv;
		entries = new DataView( 4 );
		panes = new Array();
		entryViews = new Array();
	}

/* === Instance Methods === */

	/**
	  * Add a GalleryEntry to [this] Row
	  */
	public function addEntry(entry : GalleryEntry):GalleryEntryView {
		entries.add( entry );
		var view = new GalleryEntryView( entry );
		view.columns.on( 'small' ).is( 3 );
		view.row = this;
		panes.push( view );
		entryViews.push( view );
		append( view );
		return view;
	}

/* === Computed Instance Fields === */

	public var full(get, never):Bool;
	private inline function get_full():Bool return entries.full;

/* === Instance Fields === */

	public var galleryView : GalleryView;

	private var entries : DataView<GalleryEntry>;
	private var entryViews : Array<GalleryEntryView>;
}
