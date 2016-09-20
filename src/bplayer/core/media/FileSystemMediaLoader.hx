package bplayer.core.media;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;

import bplayer.core.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class FileSystemMediaLoader extends BaseMediaLoader<WebFSEntry> {
	override private function loadSource(e:WebFSEntry, provide:Null<Dynamic>->Null<MediaProvider>->Void):Void {
		if ( e.isFile ) {
			var m = new FileEntryMediaProvider(cast e);
			provide(null, m);
		}
		else {
			provide('Error: provided entry is a directory', null);
		}
	}
}
