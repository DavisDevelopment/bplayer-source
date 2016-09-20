package bplayer.ww;

import js.html.Worker in WebWorker;

import tannus.ds.*;
import tannus.io.*;
import tannus.msg.*;

using Slambda;

class Boss {
	public function new(script : String):Void {
		path = script;
		worker = new WebWorker( path );
		c = new WebWorkerSocketContext( worker );
		root = null;
		readyEvent = new VoidSignal();

		c.getSocket(function( rewt ) {
			if (rewt == null) return ;
			if (root == null) {
				root = rewt;
				readyEvent.fire();
			}
		});
	}

	public inline function onready(action : Void->Void):Void {
		root.ternary(gryffin.Tools.defer, readyEvent.once)( action );
	}
	public inline function socket(action : Socket->Void):Void {
		onready(function() action( root ));
	}
	public inline function send(n:String, dat:Dynamic, ?onres:Dynamic->Void):Void {
		socket.fn(_.send(n, dat, onres));
	}
	public inline function on(action:String, handler:Message<Dynamic>->Void):Void {
		socket.fn(_.on(action, handler));
	}
	public inline function terminate():Void worker.terminate();

	private var path : String;
	private var worker : WebWorker;
	private var c : WebWorkerSocketContext;
	private var root : Maybe<Socket>;

	private var readyEvent : VoidSignal;
}
