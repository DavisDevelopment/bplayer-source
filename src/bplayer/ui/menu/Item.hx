package bplayer.ui.menu;

import gryffin.ui.*;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Item extends MenuItem {
	/* Constructor Function */
	public function new():Void {
		super();
	}

/* === Computed Instance Fields === */

	public var player(get, never):Null<Player>;
	private function get_player():Null<Player> {
		if (p == null) {
			if (root != null) {
				if (Std.is(root, AppMenu)) {
					return (p = cast(root, AppMenu).player);
				}
				else {
					if (root.stage != null) {
						return (p = root.stage.get('bplayer.core.Player').selected[0]);
					}
					else {
						return null;
					}
				}
			}
			else {
				return null;
			}
		}
		else {
			return p;
		}
	}

/* === Instance Fields === */

	private var p : Null<Player> = null;
}
