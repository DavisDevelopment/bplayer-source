package ;

import tannus.io.*;
import tannus.messaging.*;

import bplayer.ww.*;

class WorkerMain implements Pipe {
	/* Constructor Function */
	public function new():Void {
		onMessage = new Signal();

		werk = new Worker( this );

		function mr(event : Dynamic) {
			onMessage.call( event.data );
		}
		untyped __js__('onmessage = mr');
	}

/* === Instance Methods === */

	/**
	  * method which first receives incoming Messages
	  */
	//public function handleMessage(event : Dynamic):Void {
		//var raw_msg:Dynamic = event.data;

		//werk.process( message );
	//}

	/**
	  * Captures the messages that are in the correct format
	  */
	//public function process(raw : Dynamic):Void {
		 //(is safe message)
		//var ism = SafeMessage.isSafeMessage( raw );
		//if ( ism ) {
			//var msg = Message.fromSafe(
		//}
	//}

	/**
	  * Send a Message back to the Boss
	  */
	public function postMessage(data : Dynamic):Void pm( data );

/* === Computed Instance Fields === */

	private var pm(get, never):Dynamic->Void;
	private inline function get_pm():Dynamic->Void {
		return untyped __js__( 'postMessage' );
	}

/* === Instance Fields === */

	public var onMessage : Signal<Dynamic>;
	public var werk : Worker;

/* === Static Methods === */

	/* Main Function */
	public static function main():Void {
		new WorkerMain();
	}
}
