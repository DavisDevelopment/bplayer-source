package bplayer.ww;

import tannus.msg.*;
import tannus.msg.Pipe in Pip;
import tannus.io.Setter;

import js.html.Worker in Ww;

class WebWorkerSocketContext extends SocketContext<Socket> {
	public function new(#if !worker worker:Ww #end):Void {
		super();

		pipe = new WebWorkerPipe(#if !worker worker #end);
	}

	public function getSocket(cb : Socket->Void):Void {
		var socket:Socket = createSocket();
		attachSocket( socket );
		socket.connect(function() {
			trace('SOCKET CONNECTED');
		});
	}

	override public function createSocket(?a:Address):Socket {
		var s:WebWorkerSocket = new WebWorkerSocket();
		if (a != null)
			s.address = a;
		s.address.socketId = s.id;
		return s;
	}
}
