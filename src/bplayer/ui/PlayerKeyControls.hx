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

class PlayerKeyControls extends KeyControls<PlayerPage> {
/* === Instance Methods === */

	override private function handleKey(event : KeyboardEvent):Void {
		if (ignore( event )) {
			return ;
		}
		else {
			c.applyMods(event.getModifiers());
			if (event.type == 'keydown') {
				switch ( event.key ) {
					case Space:
						c.togglePlayback();

					case Backspace:
						c.back();

					case LetterS:
						c.adjustVolume( -1 );

					case LetterD:
						c.adjustVolume( 1 );

					case OpenBracket:
						c.adjustPlaybackRate( -1 );

					case CloseBracket:
						c.adjustPlaybackRate( 1 );

					case Equals:
						c.resetPlaybackRate();

					case LetterM:
						c.toggleMuted();

					case Left:
						c.jump( -1 );

					case Right:
						c.jump( 1 );

					case LetterN:
						player.skip( 1 );

					case LetterP:
						player.skip( -1 );

					case LetterO:
						if ( event.ctrlKey ) {
							player.openUserSelectedFiles();
						}

					default:
						trace( event );
				}
			}
			else {
				switch ( event.key ) {
					default:
						null;
				}
			}
		}
	}

/* === Instance Fields === */

	private var player(get, never):Player;
	private inline function get_player():Player return page.player;

	private var c(get, never):PlayerControls;
	private inline function get_c():PlayerControls return player.controls;
}
