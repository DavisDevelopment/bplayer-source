package bplayer.core.media;

import tannus.io.RegEx;
import tannus.sys.Path;
import tannus.ds.Stack;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using Slambda;

@:expose
class MediaPath {
	/* Constructor Function */
	public function new(a : Array<String>):Void {
		d = a.copy();
	}

/* === Instance Methods === */

	public inline function slice(start:Int, ?end:Int):MediaPath return new MediaPath(d.slice(start, end));
	public inline function clone():MediaPath return slice( 0 );
	public inline function isValid():Bool {
		return (length > 0 && isReference(d[0]));
	}
	public inline function toStack():Stack<String> {
		return new Stack( d );
	}
	public function toString():String {
		return ('/' + d.join( '/' ));
	}
	public function getRoot():String {
		if (!isValid()) {
			throw 'Error: "${d[0]}" is not a valid path-root';
		}
		return d[0];
	}

/* === Computed Instance Fields === */

	public var basename(get, never):String;
	private inline function get_basename():String return d[length - 1];

	public var length(get, never):Int;
	private inline function get_length():Int return d.length;

	public var folder(get, never):MediaPath;
	private inline function get_folder():MediaPath return slice(0, -1);

/* === Instance Fields === */

	private var d : Array<String>;

/* === Utility Methods === */

	private static function isReference(s : String):Bool {
		return (s.has( ':' ));
	}

	private static inline function fromEntries(a : Array<MediaEntry>):MediaPath {
		return new MediaPath(a.map.fn(_.getPathKey()));
	}

	public static inline function pathTo(m : Media):MediaPath {
		return fromEntries(MediaTools.getMediaLineage( m ));
	}

	public static inline function fromString(s : String):MediaPath {
		return new MediaPath(s.split( '/' ).map.fn(_.trim()).filter.fn(!_.empty()));
	}
}
