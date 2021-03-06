package chrome;

import tannus.ds.Promise;

import chrome.app.AppWindow.CreateWindowOptions;
import chrome.app.AppWindow;

class Windows {

	/**
	  * Create a new AppWindow
	  */
	public static function create(url:String, ?options:CreateWindowOptions, cb:AppWindow->Void):Void {
		lib.create(url, options, cb);
	}

	public static inline function current():AppWindow {
		return lib.current();
	}

	public static inline function onClosed(w:AppWindow, f:Void->Void):Void {
		w.contentWindow.get( 'chrome' ).app.window.onClosed.addListener( f );
	}
	
	/* Reference to chrome.app.window to be used internally */
	private static var lib:Dynamic = {untyped __js__('chrome.app.window');};
}
