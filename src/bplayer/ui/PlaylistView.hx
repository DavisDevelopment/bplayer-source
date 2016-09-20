package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.geom.*;
import tannus.io.*;
import tannus.http.WebRequest;
import tannus.internal.CompileTime in Ct;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;
import gryffin.Tools.*;

import bplayer.core.*;

import haxe.Template;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class PlaylistView extends Pane {
	/* Constructor Function */
	public function new(p:PlaylistPage, pl:Player):Void {
		super();

		page = p;
		player = pl;
		//template = new Template(Ct.readFileAsString('assets/templates/playlist-view.html'));
		tracks = new Array();
		track_list = new Array();
		tv = new Map();

		player.onready( build );

		p.on('scroll', untyped page_scroll);
	}

/* === Instance Methods === */

	/**
	  * [this] has been added to the page
	  */
	override public function activate():Void {
		super.activate();

		player.playlistChange.on(update.bind(null));
	}

	/**
	  * Build [this]'s content
	  */
	override private function populate():Void {
		if (track_list == null || track_list.empty()) {
			track_list = player.playlist.array();
		}

		addClass( 'playlist' );

		var np:Null<TrackView> = null;
		for (t in track_list) {
			var track = new TrackView(this, t);
			if (t.equals( player.currentTrack )) {
				np = track;
			}
			addTrack( track );
		}

		css.set('max-height', (player.stage.height + 'px'));

		defer( scrollToRelevant );
	}

	/**
	  * scroll relevant content into view
	  */
	private function scrollToRelevant():Void {
		if (scrollPos == null) {
			var np:Null<TrackView> = tracks.macfirstMatch(player.currentTrack != null && _.track.equals( player.currentTrack ));
			if (np != null) {
				np.addClass( 'active' );
				np.el.at( 0 ).scrollIntoView();
			}
		}
		else {
			page.el.scrollPos = scrollPos;
		}
		return ;

		var np:Null<TrackView> = tracks.macfirstMatch(player.currentTrack != null && _.track.equals( player.currentTrack ));
		if (np != null) {
			np.addClass( 'active' );
			if ( !_updating ) {
				np.el.at( 0 ).scrollIntoView();
			}
			else {
				if (scrollPos != null) {
					//el.at( 0 ).scroll(scrollPos.x, scrollPos.y);
					page.el.scrollPos = scrollPos;
				}
				else {
					trace( 'anal pleasures' );
				}
			}
		}
	}

	/**
	  * Update [this]'s content
	  */
	private function update(?list : Array<Track>):Void {
		if (list == null) {
			list = player.playlist.array();
		}

		_updating = true;
		for (t in tracks) {
			deleteTrack( t );
		}
		track_list = list;
		populate();
		_updating = false;
	}

	public function addTrack(t : TrackView):Void {
		tracks.push( t );
		tv.set(t.track.id, t);
		append( t );
	}

	public function deleteTrack(t : TrackView):Void {
		tracks.remove( t );
		tv.remove( t.track.id );
		t.destroy();
	}

	public function getTrackView(t : Track):Null<TrackView> {
		return tv.get( t.id );
	}

	private function page_scroll():Void {
		scrollPos = page.el.scrollPos;
		trace( scrollPos );
	}

/* === Instance Fields === */

	public var page : PlaylistPage;
	public var player : Player;
	public var tracks : Array<TrackView>;
	public var track_list : Array<Track>;
	public var scrollPos : Null<Point> = null;
	//public var template : Template;

	private var built : Bool = false;
	private var tv : Map<String, TrackView>;
	private var _updating:Bool = false;
}
