package bplayer.ww;

import tannus.messaging.*;
import tannus.ds.Object;
import tannus.io.Signal;

import Std.*;

class WorkerMessager extends Messager {
	/* Constructor Function */
	public function new(p:Pipe, server:Bool=#if worker false #else true #end):Void {
		super();

		pipe = p;
		is_server = server;

		__init();
	}

/* === Instance Methods === */

	/**
	  * Initialize [this]
	  */
	private function __init():Void {
		var _onmsg = function(data : Object):Void {
			if (SafeMessage.isSafeMessage(data)) {
				if (peer == null) {
					var safe:SafeMessage = (cast data);
					var msg:Message = Message.fromSafe(this, safe);
					receiveFromPeer( msg );
				} else {
					var safe:SafeMessage = (cast data);
					var msg:Message = Message.fromSafe(this, safe);
					receiveFromPeer( msg );
				}
			} else {
				trace( data );
			}
		};

		//pipe.onMessage( _onmsg );
		pipe.onMessage.on( _onmsg );
		
		once('meta:connect', function(msg) {
			msg.reply( true );
		});
	}

	/**
	  * Connect [this] Server Socket to a Window
	  */
	public function connectWorker(cb:Void->Void):Void {
		//peer = wp;
		var msg:Message = new Message(this, {});
		awaitingReply[msg.id] = (function(connected:Bool) {
			peer = pipe;
			cb();
		});
		msg.channel = 'meta:connect';

		pipe.postMessage(msg.safe());
	}

	/**
	  * Send a Message to the Peer Window
	  */
	override public function sendToPeer(msg : Message):Void {
		var safe = msg.safe();
		
		pipe.postMessage( safe );
	}

	/**
	  * Receive a Message from the Peer
	  */
	override public function receiveFromPeer(msg : Message):Void {
		incoming.call( msg );
		switch (msg.type) {
			case Normal:
				if (msg.channel != '') {
					var sig = chanSig(msg.channel);
					sig.call( msg );
				}

			case Reply:
				var func = awaitingReply[msg.id];
				if (func != null)
					func( msg.data );

			default:
				null;
		}
	}

/* === Instance Fields === */

	/* Whether [this] is the Server Socket */
	private var is_server : Bool;

	/* The Pipe being used by [this] Messager */
	private var pipe : Pipe;
	private var peer : Pipe;
}
