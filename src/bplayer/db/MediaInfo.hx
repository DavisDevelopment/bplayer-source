package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.io.Getter in G;
import tannus.io.Setter in S;

import bplayer.core.*;
import bplayer.core.media.*;

class MediaInfo {
	/* Constructor Function */
	public function new(db:ApplicationData, raw:Dynamic):Void {
		this.db = db;
		this.data = Obj.fromDynamic( raw );

		var self:Obj = Obj.fromDynamic( this );
		self.defineGetter('title', G.create( title ));
		self.define( starred );
		self.define( duration );
		self.define( viewed );
		self.define( rating );
		self.define( last_time );
	}

/* === Instance Methods === */

	/**
	  * change the underlying Object to [raw]
	  */
	public inline function rebase(raw : Dynamic):Void {
		data = Obj.fromDynamic( raw );
	}

	/**
	  * rebase [this] to the remote data
	  */
	public function pull(callback : Void->Void):Void {
		var rawPromise = lib.getMediaInfoObject( title );
		rawPromise.then(function(raw : Null<Dynamic>) {
			if (raw != null) {
				rebase( raw );
			}
			callback();
		});
		rawPromise.unless(function(error) {
			callback();
		});
	}

	/**
	  * push local changes back to the database
	  */
	public function push():Promise<MediaInfo> {
		return lib.putMediaInfoObject(getRaw());
	}

	private inline function r<T>(key : String):T return data.get( key );
	private inline function w<T>(key:String, value:T):T return data.set(key, value);
	private inline function getRaw<T>():T return untyped data.toDyn();

/* === Computed Instance Fields === */

	private var lib(get, never):ApplicationMediaDatabase;
	private inline function get_lib():ApplicationMediaDatabase return db.library;

	public var title(get, never):String;
	private inline function get_title():String return r('title');

	public var starred(get, set):Bool;
	private inline function get_starred():Bool return r('starred');
	private inline function set_starred(v : Bool):Bool return w('starred', v);

	public var duration(get, set):Float;
	private inline function get_duration():Float return r('duration');
	private inline function set_duration(v : Float):Float return w('duration', v);

	public var viewed(get, set):Int;
	private inline function get_viewed():Int return r('viewed');
	private inline function set_viewed(v : Int):Int return w('viewed', v);

	public var rating(get, set):Null<Int>;
	private inline function get_rating():Null<Int> return r('rating');
	private inline function set_rating(v : Null<Int>):Null<Int> return w('rating', v);

	public var last_time(get, set):Null<Float>;
	private inline function get_last_time():Null<Float> return r('last_time');
	private inline function set_last_time(v : Null<Float>):Null<Float> return w('last_time', v);

/* === Instance Fields === */

	private var db : ApplicationData;
	private var data : Obj;
}
