package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.http.WebRequest;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class PlaylistPage extends Page {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
	}

/* === Instance Methods === */

	override public function open(body : Body):Void {
		super.open( body );

		var headr = new PageHeader( this );
		headr.title = 'Playlist';
		append( headr );

		playlist = new PlaylistView(this, player);
		append( playlist );

		__style();
	}

	private function __style():Void {
		var c = css;
		var win = body.application.win;
		var vp = win.viewport;

		c['height'] = (vp.h + 'px');
		c['overflow-y'] = 'scroll';

		forwardEvent( 'scroll' );
		//on('scroll', function(event) {
		//})
	}

/* === Instance Fields === */

	public var player : Player;
	public var playlist : PlaylistView;
}
