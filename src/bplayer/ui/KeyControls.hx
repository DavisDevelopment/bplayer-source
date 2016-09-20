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

class KeyControls<T:Page> extends PageController<T> {
	/* Constructor Function */
	public function new():Void {
		super();
	}

/* === Instance Methods === */

	/**
	  * when [this] gets attached to a Page
	  */
	override public function attach(p : T):Void {
		super.attach( p );
		bind();
	}

	/**
	  * bind [this] to all KeyboardEvents from the Body
	  */
	private function bind():Void {
		page.body.forwardEvent('keyup', null, KeyboardEvent.fromJqEvent);
		page.body.forwardEvent('keydown', null, KeyboardEvent.fromJqEvent);

		page.body.on('keydown', handleKey);
		page.body.on('keyup', handleKey);
	}

	override public function detach(p : T):Void {
		unbind();
		super.detach( p );
	}

	/**
	  * when [this] is detached from the Page
	  */
	private function unbind():Void {
		page.body.unforwardEvent( 'keyup' );
		page.body.unforwardEvent( 'keydown' );
		page.body.off( 'keyup' );
		page.body.off( 'keydown' );
	}

	/**
	  * Handle an incoming KeyboardEvent
	  */
	private function handleKey(event : KeyboardEvent):Void {
		
	}

	/**
	  * Determine whether to ignore the given Event
	  */
	private function ignore(event : KeyboardEvent):Bool {
		return isDisabled();
	}
}
