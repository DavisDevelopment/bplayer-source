package bp.ui.dia;

import foundation.*;

import tannus.html.Element;
import tannus.ds.Memory;
import tannus.media.Duration;
import tannus.io.*;
import tannus.ds.*;
import tannus.events.*;
import tannus.html.fs.*;
import tannus.chrome.FileSystem in Fs;

import bp.core.*;
import bp.ds.*;
import bp.ui.*;

import Std.*;
import Math.*;
import tannus.math.TMath.*;
import gryffin.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class ChooseDirectoryNotification extends ConfirmNotification {
	/* Constructor Function */
	public function new():Void {
		super();

		chosen = new Signal();
		dismissed = new VoidSignal();

		__prep();
	}

/* === Instance Methods === */

	/**
	  * bind the shits
	  */
	private function __prep():Void {
		rightButton.text &= 'Dismiss';
		leftButton.text &= 'Choose Folder';
		rightButton.click = (function(x) close());
		leftButton.click = (untyped choose);
	}

	/**
	  * Choose a Folder
	  */
	private function choose():Void {
		var dp = Fs.chooseDirectory();
		dp.then(chosen.call.bind( _ ));
	}

	/**
	  * close [this]
	  */
	override public function close():Void {
		super.close();
		dismissed.fire();
	}

	/**
	  * reveal [this]
	  */
	override private function reveal(done : Void->Void):Void {
		var anim:Object->Object->Void = el.method( 'animate' );
		anim({'opacity': '1.0'}, {
			'duration': 400,
			'complete': done
		});
	}

	override private function unreveal(done : Void->Void):Void {
		var anim:Object->Object->Void = el.method( 'animate' );
		anim({'opacity': '0.0'}, {
			'duration': 400,
			'complete': function() {
				destroy();
				done();
			}
		});
	}

	override private function hide():Void {
		css.set('opacity', '0.0');
	}

/* === Instance Fields === */

	public var chosen : Signal<WebDirectoryEntry>;
	public var dismissed : VoidSignal;
}
