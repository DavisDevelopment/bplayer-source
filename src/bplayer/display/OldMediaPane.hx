package bplayer.display;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.Win;
import tannus.html.fs.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;

import bplayer.core.*;
import bplayer.core.TrackType;
import bplayer.ui.*;
import bplayer.display.Video;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class OldMediaPane extends Ent {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
		video = new Video();
		audio = new Audio();
		visualizer = new AudioVisualizer( this );
		addChild( visualizer );
		visualizer.hide();
		vpane = new VideoPane( this );
		addChild( vpane );
		vpane.hide();

		__init();
	}

/* === Instance Methods === */

	/**
	  * Initialize [this]
	  */
	private function __init():Void {
		function volumeChanged(d : Delta<Float>) {
			player.data.settings.volume = d.current;
		}

		video.onvolumechange.on( volumeChanged );
		audio.onvolumechange.on( volumeChanged );

		function ended() {
			player.next();
		}
		video.onended.on( ended );
		audio.onended.on( ended );
	}

	/**
	  * Update [this] Pane
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		rect.cloneFrom( player.rect );
	}

	/**
	  * Render [this] Pane
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);

		var m = media;
		if (m == video) {
			//c.drawComponent(video, 0, 0, video.width, video.height, x, y, w, h);
			vpane.render(stage, c);
		}
		else {
			visualizer.render(stage, c);
		}
	}

	/**
	  * Load a File
	  */
	public function load(track:Track, ?can_manip:Void->Void, ?can_play:Void->Void):Void {
		video.pause();
		audio.pause();
		var state = getMediaState();
		var manip = function() {
			putMediaState( state );
			track.focusin( media );
			if (can_manip != null) can_manip();
		};
		if (previousTrack != null) {
			previousTrack.focusout( media );
		}
		switch ( track.type ) {
			case TVideo:
				video.load(track.location, manip, can_play);

			case TAudio:
				var manip2 = function() {
					manip();
					//visualizer.setup();
				};
				audio.load(track.location, manip2, can_play);

			default:
				trace('fuck me');
		}
	}

	/**
	  * Create and return a MediaState
	  */
	private function getMediaState():MediaState {
		var m = media;
		return {
			paused: m.paused,
			volume: m.volume,
			speed: m.playbackRate
		};
	}

	/**
	  * Copy the given MediaState onto the active MediaObject
	  */
	private function putMediaState(s : MediaState):Void {
		var m = media;
		m.volume = s.volume;
		m.playbackRate = s.speed;
	}

	/**
	  * Get the appropriate MediaObject for the given Track
	  */
	public function getMediaObjectForTrack(t : Track):MediaObject {
		switch ( player.currentTrack.type ) {
			case TVideo:
				return video;
			case TAudio:
				return audio;
		}
	}

/* === Computed Instance Fields === */

	public var media(get, never):Null<MediaObject>;
	private function get_media():Null<MediaObject> {
		if (player.currentTrack == null) {
			return video;
		}
		else return getMediaObjectForTrack( player.currentTrack );
	}

/* === Instance Fields === */

	public var player : Player;
	public var video : Video;
	public var audio : Audio;
	public var visualizer : AudioVisualizer;
	public var vpane : VideoPane;

	public var previousTrack : Null<Track> = null;
}
