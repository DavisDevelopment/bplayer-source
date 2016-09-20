package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.http.WebRequest;
import tannus.html.fs.WebFileEntry;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;

import bplayer.core.*;
import bplayer.db.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class PlayerPage extends Page {
	/* Constructor Function */
	public function new(d:ApplicationData, p:Player):Void {
		super();

		data = d;
		player = p;
		player.data = data;
		player.page = this;
		keyControls = new PlayerKeyControls();
	}

/* === Instance Methods === */

	/**
	  * build [this] Page
	  */
	override public function open(body : Body):Void {
		super.open( body );

		canvas = body.application.win.document.createCanvasElement();
		append( canvas );
		stage = new Stage(cast canvas);
		stage.fill();

		stage.addChild( player );
		attachController(cast keyControls);
	}

	/**
	  * Close [this] Page
	  */
	override public function close():Void {
		stage.pause();
		css.set('display', 'none');
		active = false;
		detachController(cast keyControls);
	}
	
	/**
	  * restore [this] Page
	  */
	override public function reopen(body : Body):Void {
		super.reopen( body );
		stage.resume();
		css.set('display', 'block');
		attachController(cast keyControls);
	}

/* === Instance Fields === */

	public var canvas : Dynamic;
	public var stage : Stage;
	public var player : bplayer.core.Player;
	public var menu : AppMenu;
	public var data : ApplicationData;
	public var keyControls : PlayerKeyControls;

	public var shelved : Bool = false;
}
