package bplayer.core;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.media.Duration;
import tannus.math.*;
import tannus.geom2.*;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import bplayer.display.*;
import bplayer.display.Audio;
import bplayer.display.Video;
import bplayer.ui.*;
import bplayer.core.media.*;
import bplayer.db.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

@:access( bplayer.core.Player )
class PlayerDisplay extends Ent {
	/* Constructor Function */
	public function new(p : Player):Void {
		super();

		player = p;
	}

/* === Instance Methods === */

	/**
	  * initialize [this] object
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		player.mediaChange.on( mediaChange );
		player.contextChange.on( contextChange );
		player.uiVisibilityToggled.on( uiVisibilityChange );
		player.sessionChange.on( sessionAltered );
	}

	/**
	  * perform per-frame logic
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		var target:Rect<Int> = player.displayRect;
		rect = new tannus.geom.Rectangle(target.x, target.y, target.w, target.h);

		if ( m.exists ) {
			m.move( target.topLeft );
			m.resize(target.w, target.h);

			if (!player.modesSynced()) {
				player.applyMode( player.mode );
			}
		}

		var events:Array<String> = ['mousemove', 'click', 'keydown'];
		var times = events.map.fn(stage.mostRecentOccurrenceTime( _ ));
		var min = times.smallest.fn(now - _);
		if (min > 4000) {
			player.show_ui = false;
		}
		else {
			player.show_ui = true;
		}
	}

	/**
	  * perform per-frame rendering
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);
	}

	/**
	  * called when the Player's media changes
	  */
	private function mediaChange(delta : Delta<Media>):Void {

	}

	/**
	  * called when the Player's context changes
	  */
	private function contextChange(delta : Delta<MediaContext>):Void {
		// detach the currently attached media, if any
		if ( delta.previous.exists ) {
			delta.previous.detach( player );
		}

		if ( delta.current.exists ) {
			delta.current.attach( player );
		}
	}

	private function uiVisibilityChange(delta : Delta<Bool>):Void {
		switch ([delta.previous, delta.current]) {
			case [true, false]:
				player.stage.cursor = 'none';
			
			case [false, true]:
				player.stage.cursor = 'default';

			default:
				null;
		}
	}

	/**
	  * handle the updating of the Session
	  */
	private function sessionAltered(sess : Session):Void {
		trace('Session has updated');
		player.savePlayerData();
	}

/* === Computed Instance Fields === */

	/* the Player's media context */
	private var m(get, never):Maybe<MediaContext>;
	private inline function get_m():Maybe<MediaContext> return player.m;

/* === Instance Fields === */

	public var player : Player;
}
