package bplayer.ui;

import foundation.*;
import foundation.Canvas in CanvasWrap;

import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.geom.*;
import tannus.io.*;
import tannus.internal.CompileTime in Ct;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.core.media.*;

import haxe.Template;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;
using bplayer.core.media.MediaTools;
using bplayer.core.media.GalleryTools;

class DockedPlayerView extends Pane {
	/* Constructor Function */
	public function new(p:Player, pa:Page):Void {
		super();

		addClass( 'player-dock' );

		player = p;
		page = pa;
	}

/* === Instance Methods === */

	/**
	  * builds the content of [this]
	  */
	override private function populate():Void {
		var canvas_el:Element = '<canvas><canvas>';
		stage = new Stage(cast canvas_el.at( 0 ));
		canvas = stage.canvas;
		canvas_wrap = new CanvasWrap( canvas );
		append( canvas_wrap );

		reposition();
	}

	/**
	  * position [this] Widget
	  */
	public function reposition():Void {
		// calculate the dimensions of [this] Widget
		var b = page.body;
		stage.resize(Math.ceil( b.width ), 100);

		var c = css;
		c.write({
			'position': 'fixed',
			'left': '0px',
			'bottom': '0px',
			'z-index': '9999'
		});
	}

/* === Instance Fields === */

	public var player : Player;
	public var page : Page;

	public var canvas_wrap : CanvasWrap;
	public var canvas : Canvas;
	public var stage : Stage;
}
