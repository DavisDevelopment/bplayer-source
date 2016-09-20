package bplayer.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;

import bplayer.core.*;
import bplayer.ui.menu.*;

import chrome.app.AppWindow;
import chrome.Windows.current in appwin;

import Math.*;
import tannus.math.TMath.*;

using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class AppMenu extends Menu {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
		win = appwin();
		box = new TextBox();
		box.fontFamily = 'Ubuntu';
		box.fontSize = 11;
		box.color = '#FFFFFF';
		mx = 0;
	}

/* === Instance Methods === */

	/**
	  * Build [this] App menu
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		/*
		append(new MediaButton());
		append(new BookmarksButton());
		*/
	}

	/**
	  * update [this] Menu
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		w = stage.width;
		h = 28;

		box.text = win.contentWindow.document.title;
		box.autoScale(null, (h - 7));

		var higherPriority:Array<Entity> = stage.get('[priority > $priority]').selected;
		if (!higherPriority.empty()) {
			var highest:Int = higherPriority.macmax( _.priority ).priority;
			priority = (highest + 1);
		}

		if ( hideMenu ) {
			h = 0;
		}

		var mp = stage.getMousePosition();
		hovered = (mp != null && containsPoint( mp ));
	}

	/**
	  * render [this] Menu
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		if ( !hideMenu ) {
			c.save();

			// draw the background
			var lg = gradient( c );
			c.fillStyle = lg;
			c.fillRect(x, y, w, h);

			/* if we should not show the title */
			if ( !showTitle ) {
				// draw the menu-items
				for (item in items) {
					if ( item.enabled )
						item.render(stage, c);
				}
			}
			else {
				var by:Float = (y + ((h - box.height) / 2));
				c.drawComponent(box, 0, 0, box.width, box.height, (x + 10), by, box.width, box.height);
			}

			c.restore();
		}
	}

	/**
	  * position the shit
	  */
	override public function positionItems(s : Stage):Void {
		super.positionItems( s );

		for (item in items) {
			mx = max(mx, (item.x + item.w));
		}
	}

/* === Computed Instance Fields === */
	
	public var hideMenu(get, never):Bool;
	private inline function get_hideMenu():Bool {
		return false;//(player.isFullscreen() && !player.show_ui);
	}

	public var showTitle(get, never):Bool;
	private inline function get_showTitle():Bool {
		return !(hovered || isAnyOpen());
	}

/* === Instance Fields === */

	public var win : AppWindow;
	public var player : Player;
	public var box : TextBox;
	public var hovered : Bool;

	private var mx : Float;
}
