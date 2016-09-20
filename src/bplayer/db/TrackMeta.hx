package bplayer.db;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.http.*;
import tannus.mvc.*;
import tannus.storage.SubStorage;
import tannus.storage.chrome.ChromeStorage;
import tannus.chrome.Storage.local in storageArea;
import tannus.media.Duration;
import tannus.media.TimeRanges;
import tannus.media.TimeRange;

import bplayer.core.*;

import gryffin.display.*;

import smith.core.Value;

import js.html.Blob;
import js.html.ImageData;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class TrackMeta {
	/* Constructor Function */
	public function new(meta : Dynamic):Void {
		this.meta = meta;
		o = Obj.fromDynamic( meta );
		om = Obj.fromDynamic( m );
	}

/* === Computed Instance Fields === */

	public var id(get, never):String;
	private inline function get_id():String return o['id'];

	public var title(get, never):String;
	private inline function get_title():String return id.after('#');

	public var size(get, never):Int;
	private inline function get_size():Int return Std.parseInt(id.before('#'));

	public var file_id(get, set):String;
	private inline function get_file_id():String return o['file_id'];
	private inline function set_file_id(v : String):String return (o['file_id'] = v);

	public var duration(get, set):Float;
	private inline function get_duration():Float return o['duration'];
	private inline function set_duration(v : Float):Float return (o['duration'] = v);

	public var m(get, set):Dynamic;
	private inline function get_m():Dynamic return o.get( 'meta' );
	private inline function set_m(v : Dynamic):Dynamic return o.set('meta', v);

	public var watched(get, set):Bool;
	private inline function get_watched():Bool return om.mget('watched').toBoolean();
	private inline function set_watched(v : Bool):Bool return om.set('watched', v);
	
	public var favorited(get, set):Bool;
	private inline function get_favorited():Bool return om.mget('favorited').toBoolean();
	private inline function set_favorited(v : Bool):Bool return om.set('favorited', v);

	public var rawmarks(get, set):Array<RawMark>;
	private inline function get_rawmarks():Array<RawMark> return om.mget('marks').or(new Array());
	private inline function set_rawmarks(v : Array<RawMark>):Array<RawMark> return om.set('marks', v);

	public var marks(get, set):Array<Mark>;
	private function get_marks():Array<Mark> {
		return rawmarks.map( Mark.fromRaw );
	}
	private function set_marks(v : Array<Mark>):Array<Mark> {
		rawmarks = v.macmap(_.toRaw());
		return v;
	}

	public var thumbs(get, set):Map<Int, ImageData>;
	private function get_thumbs():Map<Int, ImageData> {
		var x:Maybe<Dynamic> = om.mget('thumbs');
		if ( x.exists ) {
			var im:Map<Int, ImageData> = new Map();
			(untyped im).h = x;
			return im;
		}
		else {
			return new Map();
		}
	}
	private function set_thumbs(v : Map<Int, ImageData>):Map<Int, ImageData> {
		om.set('thumbs', (untyped v).h);
		return v;
	}

/* === Instance Fields === */

	private var meta : Dynamic;
	private var o : Obj;
	private var om : Obj;
}
