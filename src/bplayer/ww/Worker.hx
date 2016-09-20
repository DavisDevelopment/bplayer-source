package bplayer.ww;

import tannus.ds.Object;
import tannus.io.Signal;

import tannus.messaging.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class Worker {
	/* Constructor Function */
	public function new(wrap : WorkerMain):Void {
		w = wrap;
		//socket = new WorkerMessager( w );
		//socket.incoming.on( process );
		listen();
	}

/* === Instance Methods === */

	/**
	  * main entry-point for incoming Messages
	  */
	private function listen():Void {
		var context = new WebWorkerSocketContext();
		context.getSocket( onsocket );
	}

	private function onsocket(s : Socket):Void {
		trace( s );
	}

/* === Instance Fields === */
	
	//public var socket : WorkerMessager;
	private var w : WorkerMain;
}
