package bplayer.ds;

import tannus.ds.*;
import tannus.internal.TypeTools;
import Type.ValueType;

using Type;

class Clipboard {
/* === Static Methods === */

	/**
	  * Get the current data
	  */
	public static inline function getData():Null<ClipboardData> {
		return data;
	}

	/**
	  * Set the data
	  */
	public static function setData(value : Dynamic):ClipboardData {
		if (data == null) {
			data = new ClipboardData( value );
		}
		else {
			data.value = value;
		}
		return data;
	}

/* === Static Fields === */

	private static var data : Null<ClipboardData> = null;
}

class ClipboardData {
	/* Constructor Function */
	public function new(v : Dynamic):Void {
		value = v;
	}

/* === Computed Insance Fields === */

	/* the value of [this] */
	public var value(default, set):Dynamic;
	private function set_value(v : Dynamic):Dynamic {
		type = v.typeof();
		return (value = v);
	}

/* === Instance Fields === */

	public var type : ValueType;
}
