package bplayer.ui.menu;

import tannus.events.*;

import gryffin.ui.*;

import bplayer.db.Mark;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class BookmarksButton extends Item {
	/* Constructor Function */
	public function new():Void {
		super();

		label = 'Bookmarks';
	}

/* === Instance Methods === */


	/**
	  * when [this] gets clicked
	  */
	override public function click(e : MouseEvent):Void {
		open();
	}

	/**
	  * When [this] opens
	  */
	override public function open():Void {
		items = new Array();
		var t = player.currentTrack;
		if (t != null) {
			for (m in t.marks) {
				if (m.type.match(Named(_))) {
					var button = markButton( m );
					append( button );
				}
			}
		}
		super.open();
	}

	/**
	  * Create a MenuItem for a Mark
	  */
	private function markButton(m : Mark):MenuItem {
		var btn = new MenuItem();
		btn.label = m.name;
		btn.on('click', function(e) {
			player.currentTime = m.time;
			close();
		});
		return btn;
	}
}
