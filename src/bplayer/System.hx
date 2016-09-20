package bplayer;

import tannus.ds.*;
import tannus.html.Win;

import js.Lib;
import js.Browser;

import bplayer.sys.EnvironmentType;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using Reflect;

class System {
/* === Static Methods === */

	/**
	  * initialize [this] class
	  */
	public static function __init__():Void {
		null;
	}

/* === Static Computed Fields === */

	/* the platform on which [this] running */
	public static var isChromeApp(get, never):Bool;
	private static function get_isChromeApp():Bool {
		var w = Win.current;
		if (w.hasField( 'chrome' )) {
			var chrome:Dynamic = w.get( 'chrome' );
			var app:Dynamic = chrome.getProperty( 'app' );
			if (app != null && app.hasField( 'runtime' )) {
				return true;
			}
		}
		return false;
	}

/* === Static Fields === */
}
