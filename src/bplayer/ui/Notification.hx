package bplayer.ui;

import foundation.*;

import tannus.html.Element;
import tannus.ds.Memory;
import tannus.media.Duration;

import bplayer.core.*;
import bplayer.ds.*;

import Std.*;
import Math.*;
import tannus.math.TMath.*;
import gryffin.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Notification extends Pane {
	/* Constructor Function */
	public function new():Void {
		super();

		drawer = null;

		__style();
	}

/* === Instance Methods === */

	/**
	  * apply styling to [this] Notification
	  */
	private function __style():Void {
		var c = css;
		addClasses(['notification']);

		var props = {
			width: '100%',
			padding: '16px',
			'background-color': '#2199e8',
			'margin-top': '10px'
		};
		c.writeObject( props );
		hide();
	}

	/**
	  * [this] Notification has been added to the drawer
	  */
	public function init(d : NotificationDrawer):Void {
		drawer = d;
	}

	/**
	  * Open [this] Notification
	  */
	public function open():Void {
		if (drawer != null) {
			reveal(dispatch.bind('open', null));
		}
	}

	/**
	  * Close [this] Notification
	  */
	public function close():Void {
		if (drawer != null) {
			unreveal(dispatch.bind('close', null));
		}
	}

	/**
	  * (meant to overridden) reveal [this]
	  */
	private function reveal(done : Void->Void):Void {
		css.set('display', 'block');
		done();
	}

	/**
	  * (meant to be overridden) "un-reveal" [this]
	  */
	private function unreveal(done : Void->Void):Void {
		destroy();
		done();
	}

	/**
	  * the action used to 'hide' [this] Notification immediately upon creation
	  */
	private function hide():Void {
		css.set('display', 'none');
	}

/* === Instance Fields === */

	public var drawer : Null<NotificationDrawer>;
}
