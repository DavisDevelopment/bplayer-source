package bplayer.ui;

import foundation.*;
import tannus.html.Element;
import tannus.html.Win;
import tannus.ds.*;
import tannus.io.*;
import tannus.http.WebRequest;
import tannus.events.*;

import crayon.*;
import gryffin.core.*;
import gryffin.display.*;

import bplayer.core.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.macro.MacroTools;

class TrackView extends Panel {
	/* Constructor Function */
	public function new(p:PlaylistView, t:Track):Void {
		super();

		addClass( 'track' );

		list = p;
		track = t;

		build();
	}

/* === Instance Methods === */

	/**
	  * [this] has been added to the page
	  */
	override private function populate():Void {
		title = new Span();
		title.text = track.title;
		
		duration = new Span();
		duration.text = track.duration.toString();
		duration.addClass( 'duration' );
		
		play = new Icon( PlayCircle );
		options = new Icon( Widget );
		
		//append( play );
		append( title );
		append( duration );
		//duration.after( options );
		options.after( duration );

		__style();
		__listen();
	}

	private function __style():Void {
		var c = css;

		c = title.css;
		c['margin-left'] = '15px';
		c['line-height'] = '3em';

		c = duration.css;
		c['margin-right'] = '15px';
		c['line-height'] = '3em';

		c = play.css;
		c['cursor'] = 'pointer';
		c['font-size'] = '160%';

		c = options.css;
		c['float'] = 'right';
		c['cursor'] = 'pointer';
		c['font-size'] = '160%';

		if (track.index % 2 == 0) {
			addClass( 'even' );
		}
	}

	private function __listen():Void {
		play.forwardEvent( 'click' );
		forwardEvent( 'click' );
		
		function gotoTrack() {
			list.player.loadTrack(track, null, list.player.play);
			list.page.back();
		}

		play.on('click', untyped gotoTrack);
		on('click', untyped gotoTrack);

		forwardEvent('contextmenu', null, MouseEvent.fromJqEvent);
		on('contextmenu', ctxMenu);
	}

	private function ctxMenu(e : MouseEvent):Void {
		e.cancel();
		foundation.Tools.defer(function() {
			var cm = new ContextMenu();
			cm.item('Play', function(i) {
				list.player.loadTrack(track, null, list.player.play);
				list.page.back();
				cm.close();
			});
			cm.item('Play Next', function(i) {
				var p = list.player;
				var ci:Int = (p.currentTrack.index + 1);
				p.playlist.insertTrack(track, ci);
				cm.close();
			});
			cm.item('Remove', function(i) {
				list.player.playlist.removeTrack( track );
				list.deleteTrack( this );
				cm.close();
			});
			cm.open( e.position );
		});
	}

	override public function destroy():Void {
		super.destroy();
		trace( 'TrackView was deleted' );
	}

/* === Instance Fields === */

	public var title : Span;
	public var duration : Span;
	public var play : Icon;
	public var options : Icon;

	public var track : Track;
	public var list : PlaylistView;
}
