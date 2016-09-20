package bplayer.core.media;

interface MediaEntry {
	function getTitle():String;
	function getKey():String;
	function getPathKey():String;
	function getParent():Null<MediaEntry>;
}
