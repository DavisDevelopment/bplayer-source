package bplayer.core.media;

import tannus.io.*;
import tannus.ds.*;
import tannus.graphics.Color;
import tannus.html.fs.*;

import gryffin.core.*;
import gryffin.display.*;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;

class FileMediaImpl extends MediaImpl {
	/* Constructor Function */
	public function new(entry:WebFileEntry, file:WebFile):Void {
		super();
		this.entry = entry;
		this.file = file;
	}

	override public function getSource():String return file.getObjectURL();
	override public function getTitle():String return entry.name;
	override public function getPathKey():String return entry.name;
	override public function getKey():String {
		return '${file.size}#${file.name}';
	}

	private var entry : WebFileEntry;
	private var file : WebFile;
}
