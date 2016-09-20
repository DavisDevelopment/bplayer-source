package bplayer.ui.controls;

class ButtonPosition {
	public function new(?a:FloatStyle, ?b:FloatStyle):Void {
		x = Left;
		y = Left;
		if (a != null) x = a;
		if (b != null) y = b;
	}

/* === Instance Fields === */

	private var x : FloatStyle;
	private var y : FloatStyle;
}
