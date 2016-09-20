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

class AudioMediaImpl extends FileMediaImpl {
	override public function getContext():MediaContext {
		return new AudioMediaContext( this );
	}
}
