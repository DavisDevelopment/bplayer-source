package bplayer.ui.menu;

import gryffin.ui.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class MediaButton extends Item {
	/* Constructor Function */
	public function new():Void {
		super();

		label = 'Media';

		append(new OpenButton());
	}
}
