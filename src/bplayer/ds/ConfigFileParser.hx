package bplayer.ds;

import tannus.io.*;
import tannus.ds.*;
import tannus.xml.*;
import tannus.css.*;

import bplayer.core.*;
import bplayer.core.PlayerConfig;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class ConfigFileParser {
	/* Constructor Function */
	public function new():Void {
		null;
	}

/* === Instance Methods === */

	/* parse String */
	public inline function parseString(s : String):PlayerConfig return parse(Elem.parse( s ));
	/**
	  * parse the given Elem into a PlayerConfig
	  */
	public function parse(elem : Elem):PlayerConfig {
		defaultConfig();
		tree = elem;

		for (e in tree.children) {
			process( e );
		}

		return config;
	}

	/**
	  * process an Elem
	  */
	private function process(e : Elem):Void {
		switch ( e.tag ) {
			case 'build':
				extractBuildInfo( e );
			//case 'style':
				//extractStyles( e );
			default:
				return ;
		}
	}

	private function extractBuildInfo(e : Elem):Void {
		config.build.type = e.attributes['type'];
	}

	/**
	  * Create the default [config] object
	  */
	private function defaultConfig():Void {
		config = {
			style: new StyleSheet(),
			build: {
				type: Development
			}
		};
	}

/* === Instance Fields === */

	private var config : PlayerConfig;
	private var tree : Elem;
}
