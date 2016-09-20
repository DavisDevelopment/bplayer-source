package bplayer.core.media;

import tannus.io.VoidSignal;
import tannus.ds.Promise;

import gryffin.Tools.defer;

using Slambda;

class MediaProvider {
	/* Constructor Function */
	public function new():Void {
		_media = null;
		updateEvent = new VoidSignal();
		disconnectEvent = new VoidSignal();
		mediaGroup = null;
	}

/* === Instance Methods === */

	/* return the 'name' of [this] Media */
	public function getName():String throw 'Not implemented';

	/**
	  * used to obtain a Track object  Track from a Media object
	  */
	@:final
	public function getMedia():Promise<MediaImpl> {
		return Promise.create({
			if (_media == null) {
				@forward toMedia().then(function(m) {
					_media = m;
				});
			}
			else {
				defer(function() {
					return _media;
				});
			}
		});
	}

	/**
	  *
	  */
	private function toMedia():Promise<MediaImpl> {
		throw 'not implemented';
	}

/* === Instance Fields === */

	public var mediaGroup : Null<MediaGroup>;

	private var _media : Null<MediaImpl>;
	private var updateEvent : VoidSignal;
	private var disconnectEvent : VoidSignal;

/* === Static Methods === */

	public static function create(title:String, provider:MediaProviderDef):MediaProvider {
		return new MediaProvider.DefaultMediaProvider(title, provider);
	}
}

class DefaultMediaProvider extends MediaProvider {
	private var provider : MediaProviderDef;
	private var title : String;
	public function new(title:String, provider:MediaProviderDef):Void {
		super();
		this.provider = provider;
		this.title = title;
	}
	override private function toMedia():Promise<MediaImpl> {
		return new Promise( provider );
	}
	override public function getName():String return title;
}

typedef MediaProviderDef = tannus.ds.Promise.PromiseFunction<MediaImpl>;
