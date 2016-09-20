package bplayer.core.media;

import tannus.geom.*;

import gryffin.core.*;
import gryffin.display.*;

import bplayer.display.Video;

using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using bplayer.core.media.MediaInfoTools;

class VideoMediaContext extends MediaContext {
	/* Constructor Function */
	public function new(m : VideoMediaImpl):Void {
		super( m );

		video = new Video();
		video.src = media.getSource();
		video.oncanplay.once( readyEvent.fire );
		video.onloadedmetadata.once( canManipulateEvent.fire );
		mo = video;
	}

/* === Instance Methods === */

	/**
	  * paint [video] onto the canvas
	  */
	override private function paint(stage:Stage, c:Ctx):Void {
		c.drawComponent(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
	}

	/**
	  * when [this] gets attached to the Player
	  */
	override public function attach(player:Player):Void {
		super.attach( player );
		var startTime:Float = 0;
		function complete():Void {
			if (startTime != 0) {
				player.currentTime = startTime;
			}
		}
		media.editInfo(function( info ) {
			// update duration
			if (info.duration != player.duration.totalSeconds) {
				info.duration = player.duration.totalSeconds;
			}

			// handle last_time
			if (info.last_time != null) {
				startTime = info.last_time;
			}

		}, complete);
	}

	/**
	  * when [this] Media gets detached from the Player
	  */
	override public function detach(player : Player):Void {
		var time:Float = player.currentTime;

		super.detach( player );

		media.editInfo(function( info ) {
			info.last_time = time;
		});
	}

/* === Instance Fields === */

	private var video : Video;
}
