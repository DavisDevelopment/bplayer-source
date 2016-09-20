package bplayer.ww;

import tannus.msg.*;
import tannus.msg.Pipe in Pip;
import tannus.io.Setter;

import js.html.Worker in Ww;

class WebWorkerPipe<T> extends Pip<T> {
	/* Constructor Function */
	public function new(#if !worker worker : Ww #end):Void {
		super();
		#if !worker
		w = worker;
		#end

		var onmsg : Setter<Dynamic>;
		#if worker
		onmsg = Setter.create(untyped onmessage);
		#else
		onmsg = Setter.create( w.onmessage );
		#end
		onmsg.set(function(event : Dynamic) {
			receive.call(untyped event.data);
		});
	}

/* === Instance Methods === */

	override public function send(msg : T):Void {
		(untyped #if worker __js__('postMessage') #else w.postMessage #end)( msg );
	}

/* === Instance Fields === */

#if !worker
	private var w : Ww;
#end
}
