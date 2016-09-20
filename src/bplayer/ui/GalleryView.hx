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
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;
using bplayer.core.media.MediaTools;
using bplayer.core.media.GalleryTools;

@:access( bplayer.ui.GalleryViewRow )
class GalleryView extends Pane {
	/* Constructor Function */
	public function new(p:Page, g:Gallery):Void {
		super();

		gallery = g;
		page = p;
		rows = new Array();
		styled = false;
		readyEvent = new VoidSignal();
		readyEvent.once(function() {
			ready = true;
		});

		build();
	}

/* === Instance Methods === */

	/**
	  * invoke [callback] when [this] view is ready
	  */
	public function onready(callback : Void->Void):Void {
		if ( ready ) {
			defer( callback );
		}
		else {
			readyEvent.once( callback );
		}
	}

	/**
	  * Create the content of [this] view
	  */
	override private function populate():Void {
		if ( !styled ) {
			_style();
			styled = true;
		}

		var row : GalleryViewRow;
		for (entry in gallery) {
			if (rows.empty() || row.full) {
				row = new GalleryViewRow( this );
				addRow( row );
				trace( row );
			}
			row.addEntry( entry );
		}

		readyEvent.fire();
	}

	/**
	  * add a new Row to [this]
	  */
	private function addRow(row : GalleryViewRow):Void {
		rows.push( row );
		append( row );
	}

	/**
	  * apply styling to [this] widget
	  */
	private function _style():Void {
		var c = css;

		addClass( 'gallery-main' );
	}

	/**
	  * get an entry by index
	  */
	public function getEntryByIndex(index : Int):Null<GalleryEntryView> {
		var row = rows[Std.int(index / 4)];
		if (row != null) {
			return row.entryViews[Std.int(index % 4)];
		}
		else {
			return null;
		}
	}

	/**
	  * get a set of entries
	  */
	public function getEntrySlice(start:Int, end:Int):Array<GalleryEntryView> {
		var results:Array<GalleryEntryView> = new Array();
		for (i in start...end) {
			results.push(getEntryByIndex( i ));
		}
		return results;
	}

	/**
	  * Get the currently Selected entries
	  */
	public function getSelectedEntryViews():Array<GalleryEntryView> {
		var sev = new Array();
		for (row in rows) {
			for (index in 0...row.entries.length) {
				var entry:GalleryEntryView = cast row.pane( index );
				if ( entry.selected ) {
					sev.push( entry );
				}
			}
		}
		return sev;
	}

	/**
	  * get the current selection
	  */
	public function getSelection():Selection {
		return new Selection(getSelectedEntryViews().map.fn(_.entry.getProvider()));
	}

	/**
	  * Select all entries
	  */
	public function setSelectedForAll(value : Bool):Void {
		for (e in entries()) {
			e.setSelected( value );
		}
	}
	public inline function selectAll():Void setSelectedForAll( true );
	public inline function deselectAll():Void setSelectedForAll( false );
	public function toggleSelectedForAll():Void {
		for (e in entries()) {
			e.toggleSelected();
		}
	}

	/**
	  * get the total number of entry views
	  */
	public inline function getEntryViewCount():Int return gallery.length;

	/**
	  * iterate over all the entry views
	  */
	public function entries(start:Int=0, ?end:Int):GalleryView_EntryIterator {
		if (end == null) {
			end = getEntryViewCount();
		}

		return new GalleryView_EntryIterator(this, start, end);
	}

/* === Instance Fields === */

	public var page : Page;
	public var gallery : Gallery;
	public var rows : Array<GalleryViewRow>;
	private var styled : Bool;

	private var ready : Bool = false;
	private var readyEvent : VoidSignal;
}


class GalleryView_EntryIterator {
	private var ii:IntIterator;
	private var g:GalleryView;
	public inline function new(g:GalleryView, start:Int, end:Int):Void {
		this.g = g;
		this.ii = new IntIterator(start, end);
	}
	public inline function hasNext():Bool return ii.hasNext();
	public inline function next():GalleryEntryView return g.getEntryByIndex(ii.next());
}
