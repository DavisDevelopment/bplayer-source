package bplayer.ui;

import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.events.*;

import foundation.*;
import crayon.*;
import vex.core.*;
import vex.svg.*;
import gryffin.core.*;
import gryffin.display.*;

import bplayer.core.*;
import bplayer.display.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class PageHeader extends Row {
	/* Constructor Function */
	public function new(p : Page):Void {
		super();

		page = p;

		_build();
	}

/* === Instance Methods === */

	/**
	  * Build [this]
	  */
	private function _build():Void {
		heading = new Heading( 2 );
		heading.textAlign = Center;
		heading.fontFamily = 'Ubuntu';
		append( heading );
		heading.after( '<hr/>' );

		var back = new Button( 'Back' );
		back.prepend(new Icon( X ));
		back.on('click', function(e) page.back());
		append( back );

		__listen();
	}

	override public function activate():Void {
		super.activate();
	}
	
	/**
	  * Listen for events
	  */
	private inline function __listen():Void {
	}

/* === Computed Instance Fields === */

	public var title(get, set):String;
	private inline function get_title():String return heading.text;
	private inline function set_title(v : String):String return (heading.text = v);

/* === Instance Fields === */

	public var page : Page;
	public var heading : Heading;
}
