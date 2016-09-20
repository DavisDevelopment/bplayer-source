package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.http.WebRequest;
import tannus.html.fs.*;
import tannus.chrome.FileSystem in Fs;
import tannus.geom2.*;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;
import foundation.Tools.*;

import bplayer.core.*;
import bplayer.db.*;
import bplayer.core.media.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;
using bplayer.core.media.GalleryTools;
using bplayer.core.media.MediaTools;
using Slambda;

class GalleryPage extends Page {
	/* Constructor Function */
	public function new(g:Gallery, d:ApplicationData):Void {
		super();

		data = d;
		gallery = g;
		galleryView = null;
		player = null;
		playerPage = null;
		readyEvent = new VoidSignal();
		readyEvent.once(function() {
			ready = true;
		});
		keyControls = new GalleryKeyControls();

		instance = this;
	}

/* === Instance Methods === */

	/**
	  * When [this] Page actually opens
	  */
	override public function open(body : Body):Void {
		super.open( body );
		
		addGalleryView( gallery );
		css.set('overflow-y', 'scroll');

		body.forwardEvent( 'resize' );
		body.on('resize', onresize);
		onresize(null);

		attachController(cast keyControls);
	}

	/**
	  * reopen [this] Page
	  */
	override public function reopen(body : Body):Void {
		super.reopen( body );

		css.set('display', 'block');
		onresize( null );

		if (scrollPos != null) {
			el.scrollTop( scrollPos.y );
		}
	}

	/**
	  * close [this] Page
	  */
	override public function close():Void {
		css.set('display', 'none');
		active = false;

		disableAllControllers();
	}

	/**
	  * invoke the given function when [this] view is ready
	  */
	public function onready(callback : Void->Void):Void {
		if ( !ready ) {
			defer( callback );
		}
		else {
			readyEvent.once( callback );
		}
	}

	/**
	  * When the Gallery has been loaded
	  */
	private function addGalleryView(?g : Gallery):Void {
		addButton();
		if (g == null) {
			gallery = g;
		}

		if (galleryView != null) {
			galleryView.destroy();
			galleryView = null;
		}

		galleryView = new GalleryView(this, gallery);
		append( galleryView );
		galleryView.onready( readyEvent.fire );
	}

	/**
	  * Build and append the 'tools' widget
	  */
	private function addButton():Void {
		var choose = new Button( 'Add Source Folder' );
		choose.expand(true);
		var c = choose.css;
		c.write({
			'text-align': 'center',
			'display': 'block'
		});
		append( choose );
		choose.on('click', function(event) {
			BPlayer.instance.chooseNewSourceFolder(function() {
				trace('fuck my ass');
			});
		});
	}

	/**
	  * handle the resize event
	  */
	private function onresize(event : Dynamic):Void {
		css.set('max-height', (body.height + 'px'));

		trace([body.width, body.height]);
	}

	/**
	  * handle the 'scroll' event
	  */
	private function onscroll(event : Dynamic):Void {
		var w = body.application.win;
		
		scrollPos = new Point(el.scrollLeft(), el.scrollTop());
	}

/* === Instance Fields === */

	public var data : ApplicationData;
	public var gallery : Null<Gallery>;
	public var galleryView : Null<GalleryView>;
	public var keyControls : GalleryKeyControls;

	public var player : Null<Player>;
	public var playerPage : Null<PlayerPage>;

	private var scrollPos : Null<Point<Int>> = null;
	private var ready : Bool = false;
	private var readyEvent : VoidSignal;

/* === Static Fields === */

	private static var instance : Null<GalleryPage> = null;

	public static inline function getInstance():Null<GalleryPage> {
		return instance;
	}
}
