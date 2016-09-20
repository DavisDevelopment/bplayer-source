package bplayer.sys;

import tannus.html.fs.*;
import tannus.io.*;
import tannus.ds.*;

import bplayer.System;
import gryffin.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class FileSystem {
/* === Static Methods === */

	/**
	  * Programmatically open a dialog asking the user to select one or more files
	  */
	public static function chooseFiles():Promise<Array<WebFileEntry>> {
		if ( System.isChromeApp ) {
			return Promise.create({
				var options:tannus.chrome.FileSystem.ChooseEntryOptions = {
					acceptsMultiple: true
				};
				tannus.chrome.FileSystem.chooseEntry(options, function( raw_entries ) {
					var entries:Array<WebFileEntry> = new Array();
					for (e in raw_entries) {
						if ( e.isFile ) {
							entries.push(cast e);
						}
					}
					return entries;
				});
			});
		}
		else {
			return Promise.create({
				defer(function() {
					return new Array();
				});
			});
		}
	}
}
