package ;

import tannus.chrome.*;
import tannus.ds.Object;
import chrome.Runtime;
import chrome.Windows;
import chrome.app.AppWindow;

import tannus.html.Win;
import tannus.chrome.messaging.BGServer in Server;
import tannus.chrome.messaging.ExtMessager in Socket;

using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Background {
	/* Constructor Function */
	public function new():Void {
		playerWindows = new Array();

		listen();
	}

/* === Instance Methods === */

	/**
	  * When [this] Application is launched
	  */
	public function launch(data : Object):Void {
		newPlayerWindow( data );
	}

	/**
	  * Create a new Player window
	  */
	public function newPlayerWindow(?data:Object, ?callback:AppWindow->Void):Void {
		Windows.create('pages/index.html', {}, function(app : AppWindow) {
			var win:Object = new Object( app.contentWindow );
			win['launchData'] = data;
			win['__backgroundPage'] = this;
			app.maximize();
			app.focus();
			playerWindows.push( app );
			if (callback != null) {
				callback( app );
			}
		});
	}

	/**
	  * Get all Player windows
	  */
	public function getAllWindows():Array<AppWindow> {
		return playerWindows;
	}

	/**
	  * Get all players
	  */
	public function getAllPlayers(?except : Dynamic):Array<Dynamic> {
		var players = getAllWindows().macmap(_.contentWindow.get( 'player' ));
		if (except != null) {
			players.remove( except );
		}
		return players;
	}

	/**
	  * listen for events
	  */
	public function listen():Void {
		Runtime.onLaunch(launch.bind(_));
	}

/* === Instance Fields === */

	public var playerWindows : Array<AppWindow>;

/* === Static Functions === */

	/* Main Function */
	public static function main():Void {
		var bg = new Background();
	}
}
