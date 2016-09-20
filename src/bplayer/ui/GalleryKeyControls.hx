package bplayer.ui;

import foundation.*;

import crayon.*;

import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.events.KeyboardEvent;
import tannus.events.Key;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class GalleryKeyControls extends KeyControls<GalleryPage> {
/* === Instance Methods === */

	override private function handleKey(event : KeyboardEvent):Void {
		if (ignore( event )) {
			return ;
		}
		else {
			if (event.type == 'keydown') {
				switch ( event.key ) {
					case LetterA if ( event.ctrlKey ):
						gv.toggleSelectedForAll();

					case Enter, Space:
						var sel = gv.getSelection();
						if (!sel.empty()) {
							sel.play( player );
						}

					case LetterO if ( event.ctrlKey ):
						if ( event.shiftKey ) {
							app.chooseNewSourceFolder(function() {
								// update gallery-page
								return ;
							});
						}
						else {
							app.openPlayer(function() {
								player.openUserSelectedFiles(function( anyOpened ) {
									if ( !anyOpened ) {
										player.back();
									}
								});
							});
						}

					default:
						return ;
				}
			}
			else {
				switch ( event.key ) {
					default:
						return ;
				}
			}
		}
	}

/* === Instance Fields === */

	public var gv(get, never):GalleryView;
	private inline function get_gv() return page.galleryView;

	public var app(get, never):BPlayer;
	private inline function get_app() return BPlayer.instance;
	
	public var player(get, never):Player;
	private inline function get_player() return app.getPlayer();
}
