package bplayer.core.media;

@:forward(
	getContext,
	hasMediaInfo,
	getMediaInfo
)
abstract Media (MediaImpl) from MediaImpl {
	/* Constructor Function */
	public inline function new(m : MediaImpl):Void {
		this = m;
	}

/* === Instance Fields === */

	public var title(get, never):String;
	private inline function get_title():String return this.getTitle();

	public var key(get, never):String;
	private inline function get_key():String return this.getKey();
	
	public var source(get, never):String;
	private inline function get_source():String return this.getSource();
}
