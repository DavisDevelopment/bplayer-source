package bplayer.ww;

import tannus.ds.Object;
import tannus.io.Signal;

import js.html.Worker in WebWorker;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class WorkerPipe {
	/* Constructor Function */
	public function new(name : String):Void {
		onMessage = new Signal();
		worker = new WebWorker( name );
		
		worker.onmessage = _onmsg;
	}

/* === Instance Methods === */

	/**
	  * Send data to the Worker
	  */
	public function postMessage(data : Dynamic):Void {
		worker.postMessage( data );
	}

	/**
	  * Connect [socket]
	  */
	public function connect(cb : WorkerMessager->Void):Void {
		socket = new WorkerMessager( this );
		socket.connectWorker(function() {
			cb( socket );
		});
	}

	/**
	  * handle 'message' Event on [worker]
	  */
	private function _onmsg(event : Dynamic):Void {
		onMessage.call( event.data );
	}

/* === Instance Fields === */

	public var onMessage : Signal<Dynamic>;

	private var worker : WebWorker;
	private var socket : WorkerMessager;
}
