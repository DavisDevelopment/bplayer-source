package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.geom.*;
import tannus.io.*;
import tannus.internal.CompileTime in Ct;
import tannus.events.*;

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
class GalleryEntryView extends FlexPane {
	/* Constructor Function */
	public function new(e : GalleryEntry):Void {
		super();

		entry = e;

		build();
	}

/* === Instance Methods === */

	/**
	  * build the layout of [this] widget 
	  */
	override private function populate():Void {
		addClass( 'gallery-block' );

		image = new foundation.Image();
		image.addClass( 'thumb' );
		image.src = '../assets/icons/video.svg';
		append( image );

		var title = new Span();
		title.addClass('title');
		title.text = entry.getTitle();
		append( title );
		
		el.set('title', entry.getTitle());
		el.plugin('tooltip');

		forwardEvents(['click'], null, MouseEvent.fromJqEvent);
		on('click', onclick);
	}

	/**
	  * when [this] gets clicked
	  */
	private function onclick(event : MouseEvent):Void {
		if ( event.ctrlKey ) {
			toggleSelected();
		}
		else if ( event.shiftKey ) {
			var gv:GalleryView = cast parentWidgetUntil.fn(Std.is(_, GalleryView));
			var selectedEntries = gv.getSelectedEntryViews();
			var index:Int = getIndex();
			if (selectedEntries.empty()) {
				return ;
			}
			else {
				var firstIndex:Int = selectedEntries[0].getIndex();
				var lastIndex:Int = selectedEntries[selectedEntries.length - 1].getIndex();

				// determine what the range will be
				var range:Null<Iterator<GalleryEntryView>> = null;
				if (index < firstIndex) {
					range = gv.entries(index, firstIndex);
				}
				else if (index > lastIndex) {
					range = gv.entries(lastIndex, index);
				}
				else {
					return ;
				}

				// select that range
				if (range != null) {
					for (entry in range) {
						entry.toggleSelected();
					}
				}
			}
		}
		else {
			var app = BPlayer.instance;

			if ( selected ) {
				var gv:GalleryView = cast parentWidgetUntil.fn(Std.is(_, GalleryView));
				var selection:Selection = gv.getSelection();
				app.openPlayer(function() {
					var player = app.getPlayer();
					player.onready(function() {
						selection.play( player );
					});
				});
			}
			else {
				app.openPlayer(function() {
					var player:Player = app.getPlayer();
					player.onready(function() {
						player.clear();
						switch ( entry ) {
							case EMedia( media ):
								player.addMedia( media );

							default:
								player.back();
						}
					});
					Win.current.expose('player', player);
				});
			}
		}
	}

	/**
	  * fuck shark nipple bombings
	  */
	public function toggleSelected():Void {
		var options = {
			duration: 250,
			children: true,
			complete: function() {
				trace('bitch');
			}
		};

		el.plugin('toggleClass', untyped ['selected', options]);
	}

	/**
	  * set Selected
	  */
	public function setSelected(value : Bool):Void {
		var options = {
			duration: 250,
			children: true,
			complete: function() {
				trace('bitch');
			}
		};

		var action:String = ((value ? 'add' : 'remove') + 'Class');
		el.plugin(action, untyped ['selected', options]);
	}

	/**
	  * get the index of [this]
	  */
	public inline function getIndex():Int {
		return (row.galleryView.rows.indexOf( row ) + row.entryViews.indexOf( this ));
	}

/* === Computed Instance Fields === */

	public var selected(get, set):Bool;
	private function get_selected():Bool {
		return is( '.selected' );
	}
	private function set_selected(v : Bool):Bool {
		(v?addClass:removeClass)('selected');
		return selected;
	}

/* === Instance Fields === */

	public var entry : GalleryEntry;
	public var image : foundation.Image;
	public var row : Null<GalleryViewRow> = null;
}
