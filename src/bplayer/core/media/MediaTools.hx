package bplayer.core.media;

import tannus.html.fs.*;

import tannus.io.*;
import tannus.ds.*;

using StringTools;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.ds.StringUtils;
using tannus.math.TMath;
using Slambda;

class MediaTools {
	/**
	  * Convert the given Directory into a MediaGroupProvider
	  */
	public static inline function getMediaGroupProvider(dir : WebDirectoryEntry):WebDirectoryMediaGroupProvider {
		return new WebDirectoryMediaGroupProvider( dir );
	}

	public static function getMediaLineage(m : Media):Array<MediaEntry> {
		var a:Array<MediaEntry> = new Array();
		var entry:Null<MediaEntry> = cast m;
		while (entry != null) {
			a.push( entry );
			entry = entry.getParent();
		}
		a.reverse();
		return a;
	}

	public static function follow(group:MediaGroup, path:MediaPath, callback:MediaProvider->Void):Void {
		if (path.length == 1) {
			var mp = group.getMedia( path.basename );
			callback( mp );
		}
		else {
			throw 'Error: Sub-groups are not yet supported';
		}
	}
	public static function getProvider(entry : GalleryEntry):MediaProvider {
		switch ( entry ) {
			case EMedia(m):
				return m;
			default:
				throw 'Error: Cannot get MediaProvider from ${entry}';
		}
	}
}
