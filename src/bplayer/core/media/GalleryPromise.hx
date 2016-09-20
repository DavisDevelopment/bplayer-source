package bplayer.core.media;

import tannus.ds.Promise;
import tannus.ds.Promise.PromiseFunction;

class GalleryPromise extends Promise<Gallery> {
	/* Constructor Function */
	public function new(f : PromiseFunction<Gallery>):Void {
		super( f );
	}
}
