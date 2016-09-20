package bplayer.ds;

import tannus.ds.*;
import tannus.io.*;

import bplayer.core.*;
import bplayer.core.media.*;

import Slambda.fn;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.math.RandomTools;
using bplayer.core.media.MediaTools;
using bplayer.core.media.GalleryTools;

class GallerySorters {
	/**
	  * Sort alphabetically
	  */
	public static function alphabetical(x:GalleryEntry, y:GalleryEntry):Int {
		return Reflect.compare(x.getTitle(), y.getTitle());
	}
}
