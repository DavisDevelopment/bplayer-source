package bplayer.db;

import tannus.ds.tuples.Tup2;

import bplayer.db.MarkType;

class Mark {
	/* Constructor Function */
	public function new(time:Float, type:MarkType):Void {
		this.type = type;
		this.time = time;
	}
	
/* === Instance Methods === */

	public function toRaw():RawMark {
		var dat:Tup2<Int, Dynamic> = switch ( type ) {
			case Start: new Tup2(0, null);
			case Named(n): new Tup2(1, n);
		};
		return {
			time: time,
			data: dat
		};
	}

/* === Computed Instance Fields === */

	public var name(get, never):String;
	private function get_name():String {
		switch ( type ) {
			case Named( n ):
				return n;

			case Start:
				return 'Start of Track';
		}
	}

/* === Instance Fields === */

	public var type : MarkType;
	public var time : Float;

/* === Instance Fields === */

	public static function fromRaw(m : RawMark):Mark {
		return new Mark(m.time, (switch ( m.data._0 ) {
			case 0: Start;
			case 1: Named(cast m.data._1);
			default: Start;
		}));
	}
}
