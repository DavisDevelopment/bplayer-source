package bplayer.core.media;

import tannus.ds.Promise;
import tannus.ds.promises.*;
import tannus.html.fs.WebDirectoryEntry in WebDir;
import tannus.html.fs.*;
import tannus.sys.*;

import gryffin.Tools.defer;

using Slambda;

class SourceDirectoryMediaGroupProvider extends WebDirectoryMediaGroupProvider {
	/* Constructor Function */
	public function new(d:WebDir, key:String):Void {
		super( d );

		entryKey = key;
	}

/* === Instance Methods === */

	override public function getKey():String {
		return entryKey;
	}

	override private function createGroup(entities : Array<WebFileEntry>):MediaGroup {
		return new SourceDirectoryMediaGroup(dir, entities, getKey());
	}

/* === Instance Fields === */

	public var entryKey : String;
}

class SourceDirectoryMediaGroup extends WebDirectoryMediaGroupProvider.WebDirectoryMediaGroup {
	/* Constructor Function */
	public function new(d:WebDir, e:Array<WebFileEntry>, key:String):Void {
		super(d, e);

		entryKey = key;
	}

/* === Instance Methods === */

	override public function getKey():String {
		return entryKey;
	}
	override public function getPathKey():String return entryKey;

/* === Instance Fields === */

	public var entryKey : String;
}
