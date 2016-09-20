package crayon;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class Body extends Widget {
	/* Constructor Function */
	public function new(app : Application):Void {
		super();

		el = 'body';
		currentPage = null;
		application = app;
	}

/* === Instance Methods === */

	/**
	  * Open a Page
	  */
	public function open(page : Page):Void {
		if (currentPage != null) {
			currentPage.close();
			page.previousPage = currentPage;
		}

		currentPage = page;
		append( page );
		currentPage = page;
		(page.opened?page.reopen:page.open)( this );
	}

/* === Computed Instance Fields === */

	/* the title of [this] Body */
	public var title(get, set):String;
	private inline function get_title():String return application.title;
	private inline function set_title(v : String):String return (application.title = v);

/* === Instance Fields  === */

	public var currentPage : Null<Page>;
	public var application : Application;
}
