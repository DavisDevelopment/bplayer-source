package bplayer.core.media;

import tannus.ds.Promise;
import tannus.ds.promises.*;
import tannus.html.fs.WebDirectoryEntry in WebDir;
import tannus.html.fs.*;
import tannus.sys.*;

import gryffin.Tools.defer;

using Slambda;

class WebDirectoryMediaGroupProvider extends MediaGroupProvider {
	/* Constructor Function */
	public function new(dir : WebDir):Void {
		super();
		this.dir = dir;
	}

/* === Instance Methods === */

	/**
	  * load the MediaGroup
	  */
	override public function get():Promise<MediaGroup> {
		//return cast dir.readEntries().map.fn( _.name ).transform.fn([names] => new WebDirectoryMediaGroup(dir, names));
		//return cast dir.readEntries().map.fn( _.name ).transform(function(names : Array<String>) {
			//return createGroup( names );
		//});
		return cast dir.readEntries().transform(function(ea) {
			return createGroup(cast ea);
		});
	}

	private function createGroup(entries : Array<WebFileEntry>):MediaGroup {
		return new WebDirectoryMediaGroup(dir, entries);
	}

	/**
	  * get the title
	  */
	override public function getTitle():String {
		return dir.name;
	}
	override public function getKey():String {
		return dir.name;
	}

/* === Instance Fields === */

	private var dir : WebDir;
}

class WebDirectoryMediaGroup extends MediaGroup {
	/* Constructor Function */
	public function new(d:WebDir, entries:Array<WebFileEntry>):Void {
		super();
		this.entries = entries.copy();
		names = entries.map.fn( _.name );
		dir = d;
	}

/* === Instance Methods === */

	override public function getNames():Array<String> {
		return names;
	}
	override public function getTitle():String {
		return dir.name;
	}
	override public function getKey():String {
		return dir.name;
	}
	override public function getPathKey():String return dir.name;

	/**
	  * retrieve a MediaProvider by name
	  */
	override public function getMedia(name : String):MediaProvider {
		return new FileEntryMediaProvider(entries[names.indexOf( name )]);
		/*
		return function(accept, reject) {
			var entry = dir.getFile( name );
			entry.then(function(entry : WebFileEntry) {
				var provider : MediaProvider;

				provider = new FileEntryMediaProvider( entry );
				provider.mediaGroup = this;

				provider.getMedia().then( accept ).unless( reject );
			});
			entry.unless( reject );
		};
		*/
	}

/* === Instance Fields === */

	private var names : Array<String>;
	private var entries : Array<WebFileEntry>;
	private var dir : WebDir;
}
