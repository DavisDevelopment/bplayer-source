package bplayer.core.media;

import tannus.io.*;
import tannus.ds.*;
import tannus.ds.promises.*;

import ida.*;

import bplayer.core.*;
import bplayer.core.media.*;
import bplayer.db.*;

import foundation.Tools.*;

import haxe.macro.Expr;
import haxe.macro.Context;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using haxe.macro.ExprTools;
using tannus.macro.MacroTools;

class MediaInfoTools {
/* === Static Methods === */

	/**
	  * shorthand for getting MediaInfo
	  */
	public static function readInfo(m:Media, f:MediaInfo->Void):Void {
		m.getMediaInfo().then( f );
	}

	/**
	  * shorthand for editing the MediaInfo
	  */
	public static function editInfo(m:Media, edit:MediaInfo->Void, ?callback:Void->Void):Void {
		if (callback == null) callback = (function() null);
		readInfo(m, function(info : MediaInfo) {
			edit( info );
			info.push().always( callback );
		});
	}
}
