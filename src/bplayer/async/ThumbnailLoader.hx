package bplayer.async;

import tannus.io.*;
import tannus.ds.*;
import tannus.math.*;
import tannus.geom2.*;

import bplayer.core.*;
import bplayer.core.media.*;
import bplayer.display.Video;

//import js.html.Image in Img;
import gryffin.display.Canvas;
import gryffin.display.Image in Img;

import foundation.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class ThumbnailLoader extends StandardTask<String, Array<ThumbResult>> {
	/* Constructor Function */
	public function new(m : Media):Void {
		super();

		media = m;
		result = new Array();
		status = 'waiting..';

		thumbnailLoaded = new Signal();
	}

/* === Instance Methods === */

	/**
	  * set the function used to define the dimensions
	  */
	public inline function setDimensionMutator(mutator : Rect<Int>->Rect<Int>):Void {
		mutateDimensions = mutator;
	}

	/**
	  * initiate the loading of the thumbnails
	  */
	public function load(times:Array<Float>, ?callback:Void->Void):Void {
		this.times = times;
		perform(function() {
			if (callback != null) {
				callback();
			}
		});
	}

	/**
	  * perform [this] task
	  */
	override private function action(done : Void->Void):Void {
		var video = new Video();
		
		video.load(media.source, function() {
			// get the video's dimensions
			var videoRect:Rect<Int> = new Rect(video.naturalWidth, video.naturalHeight);
			// transform those dimensions
			videoRect = mutateDimensions( videoRect );
			// apply the transformed dimensions to the video
			video.width = videoRect.width;
			video.height = videoRect.height;
			canvas = Canvas.create(videoRect.width, videoRect.height);

			// build the action-stack
			var stack = new AsyncStack();
			for (time in times) {
				loadThumbnail(video, time, stack);
			}

			// run the action-stack
			stack.run(function() {
				trace( result );
				done();
			});
		});
	}

	/**
	  * creates and queues the asynchronous task that loads a single thumbnail
	  */
	@:access( gryffin.display.Video )
	private function loadThumbnail(video:Video, time:Float, stack:AsyncStack):Void {
		var cw = canvas.width;
		var ch = canvas.height;

		stack.push(function(done) {
			// once the video can be rendered again
			var on_can_render = (function() {
				//trace('jump successful');
				//trace('video.currentTime (${video.currentTime})  =  $time');
				// capture the current frame to a Canvas
				canvas.context.drawImage(video.vid, 0, 0, cw, ch, 0, 0, cw, ch);
				//trace('frame capture successful');
				// convert that Canvas to an Image
				var image:Img = canvas.getImage(function(img : Img) {
					// do stuff with the loaded Image
				});

				// announce the successful loading of another thumbnail
				thumbResult(time, image);

				// report this sub-task as complete
				defer( done );
			});

			video.onseekend.once( on_can_render );

			// seek to desired time
			video.currentTime = time;
		});
	}

	/**
	  * got a thumb result
	  */
	private function thumbResult(time:Float, image:Img):Void {
		var o = tr(time, image);
		result.push( o );
		thumbnailLoaded.call( o );
	}

	/**
	  * shorthand for building a ThumbResult object
	  */
	private inline function tr(time:Float, image:Img):ThumbResult {
		return {time:time, image:image};
	}

	/**
	  * method used to set the thumbnail dimensions
	  */
	private dynamic function mutateDimensions(rect : Rect<Int>):Rect<Int> {
		return rect.clone();
	}

/* === Instance Fields === */

	public var media : Media;
	public var times : Array<Float>;
	public var thumbnailLoaded : Signal<ThumbResult>;

	private var canvas : Canvas;
	private var thumbnailSize : Rect<Int>;
}

typedef ThumbResult = {
	var time : Float;
	var image : Img;
};
