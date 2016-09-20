package bplayer.core.old;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.Win;
import tannus.html.fs.*;
import tannus.css.*;
import tannus.geom.*;
import tannus.chrome.FileSystem in Fs;
import tannus.chrome.FileSystem.ChooseEntryOptions in FileOptions;
import tannus.events.*;

import chrome.app.AppWindow;
import chrome.Windows.current in currentWindow;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.Tools.*;

import bplayer.display.*;
import bplayer.ui.*;
import bplayer.core.PlayerConfig;
import bplayer.db.*;
import bplayer.core.media.*;

import Math.*;
import tannus.math.TMath.*;

import js.html.Blob;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.math.RandomTools;

class OldPlayer extends Ent {
	/* Constructor Function */
	public function new(d : ApplicationData):Void {
		super();

		/*
		page = p;
		config = cfg;
		*/
		data = d;
		theme = new ColorScheme();
		appw = currentWindow();
		pane = new MediaPane( this );
		addChild( pane );
		controls = new PlayerControls( this );
		addChild( controls );
		playlist = new Playlist();
		trackChange = new Signal();
		trackChange.on( _trackChange );
		playlistChange = new VoidSignal();
		playlist.altered.on( playlistChange.fire );
		currentTrack = null;
		_onready = new VoidSignal();
		//audioProcessor = new AudioProcessor( this );
		showUiEvents = ['click', 'mousemove', 'scroll'];
		if (config.build.type == Development) {
			showUiEvents.push( 'keydown' );
		}
	}

/* === Instance Methods === */

	/**
	  * initialize [this] shit
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		keyControls = new PlayerKeyControls( this );
		var self:Obj = this;
		self.defineGetter('media', Getter.create( media ));

		/*
		onready(function() {
			// win.setInterval(saveSession.bind(null), 5000);
		});
		*/

		/*
		data = new ApplicationData();
		data.init(function() {
			loadSession(function() {
				_applySettings();
				_ready = true;
				_onready.fire();
			});
		});
		*/

		if ( !_ready ) {
			_ready = true;
			_onready.fire();
		}

		stage.on('scroll', scroll);
	}

	/**
	  * Ensure that [this] Player is ready, then call the given function
	  */
	public function onready(callback : Void->Void):Void {
		if ( _ready ) {
			defer( callback );
		}
		else {
			_onready.once( callback );
		}
	}

	/**
	  * do maths
	  */
	override public function calculateGeometry(r : Rectangle):Void {
		rect.cloneFrom( r );
		super.calculateGeometry( r );
	}

	/**
	  * update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		var times = showUiEvents.macmap(stage.mostRecentOccurrenceTime( _ ));
		var mostRecent = times.macmax(_);
		show_ui = ((now - mostRecent) <= 3000);
	}

	/**
	  * render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);

		/*
		c.save();
		c.beginPath();
		c.fillStyle = '#00FF00';
		c.drawRect( rect );
		c.closePath();
		c.fill();
		c.restore();
		*/
	}

	/**
	  * Open user-selected files
	  */
	public function open():Void {
		var options:FileOptions = {
			type: OpenFile,
			acceptsMultiple: true
		};
		Fs.chooseEntry(options, function( _entries ) {
			var entries:Array<WebFileEntry> = _entries.macfilter(_.isFile).macmap(new WebFileEntry(cast _));
			if ( shuffle ) {
				entries = entries.shuffle();
			}
			loadEntries( entries );
		});
	}

	/**
	  * load and play the given MediaProvider
	  */
	public function loadMedia(mediap:MediaProvider, ?can_manip:Void->Void, ?can_play:Void->Void):Void {
		var mp = mediap.getMedia();
		mp.then(function( media ) {
			pane.attachMedia( media );
		});
		mp.unless(function(error) {
			trace( error );
		});
	}

	/**
	  * Load the given Track
	  */
	public function loadTrack(track:Track, ?can_manip:Void->Void, ?can_play:Void->Void):Void {
		
		/*
		pane.previousTrack = currentTrack;
		currentTrack = track;
		var playit = !paused;
		pause();
		function manip() {
			if ( playit ) {
				play();
			}
			if (can_manip != null) {
				can_manip();
			}
		}
		function _play():Void {
			if (can_play != null) 
				can_play();
			var _mut:Bool = muted;
			muted = true;
			play();
			defer(function() {
				pause();
				muted = _mut;
			});
		}
		pane.load(track, manip, _play);
		*/
	}

	/**
	  * Add the given Track to the playlist
	  */
	public function addTrack(track:Track, loadFirst:Bool=true):Void {
		playlist.addTrack( track );
		if (loadFirst && currentTrack == null) {
			loadTrack(track, null, function() {
			});
		}
	}

	/**
	  * Load the given Entries
	  */
	public function loadEntries(entries:Array<WebFileEntry>, ?callback:Void->Void):Void {
		var loader = new TrackLoader( this );
		var loadbar = new LoadingBar(this, loader);
		addChild( loadbar );
		loader.load(entries, function() {
			loadbar.delete();
			if (callback != null) {
				callback();
			}
		});
	}

	/**
	  * Goto the next track
	  */
	public function next():Void {
		//if (currentTrack != null) {
			//var nextTrack = currentTrack.next();
			//if (nextTrack == null) {
				//nextTrack = playlist.getTrackByIndex( 0 );
			//}
			//loadTrack( nextTrack );
		//}
	}

	/**
	  * Goto the previous Track
	  */
	public function previous():Void {
		//if (currentTrack != null) {
			//var t = currentTrack.previous();
			//if (t == null) {
				//t = playlist.getTrackByIndex(playlist.length - 1);
			//}
			//loadTrack( t );
		//}
	}

	/**
	  * Clear the Playlist
	  */
	public function clearPlaylist(?cb : Void->Void):Void {
		pause();
		media.clear();
		playlist.each(playlist.removeTrack( _ ));
		currentTrack = null;
		saveSession( cb );
	}

	/**
	  * Show the Playlist page
	  */
	public function showPlaylist():Void {
		pause();
		var plp = new PlaylistPage( this );
		page.body.open( plp );
	}

	/**
	  * Create and return a PlayerSession object from [this]
	  */
	public function getSession():PlayerSession {
		var s = new PlayerSession();
		s.extractFrom( this );
		return s;
	}

	/**
	  * Save the current Session
	  */
	public function saveSession(?callback : Void->Void):Void {
		data.sessions.saveSession(getSession());
		defer(function() {
			if (callback != null) callback();
		});
	}

	/**
	  * Load the primary Session, if present
	  */
	public function loadSession(cb : Void->Void):Void {
		if (config.items != null) {
			loadEntries(config.items, cb);
		}
		else if (data.sessions.hasPrimarySession()) {
			var sess = data.sessions.loadPrimarySession();
			sess.restoreTo(this, function() {
				cb();
			});
		}
		else {
			defer( cb );
		}
	}

	/**
	  * Prompt the user for input
	  */
	public function prompt(title:String, defaultValue:String, callback:String->Void):Void {
		var box = new PromptBox();
		box.title = title;
		box.value = defaultValue;
		box.readLine( callback );
		box.open();
		box.focus();
	}

	/**
	  * Prompt the user to add a bookmark to the current track
	  */
	public function bookmarkPrompt(?done : Void->Void):Void {
		/*
		var t = currentTrack;
		if (t == null) {
			if (done != null) done();
			return ;
		}

		prompt('Enter Bookmark name: ', '', function(line : String) {
			if (!line.trim().empty()) {
				if (line.has('=>'))
				t.bookmark(currentTime, line, done);
			}
			else {
				if (done != null) done();
				return ;
			}
		});
		*/
	}

	/**
	  * handle the changing of Tracks
	  */
	private function _trackChange(delta : Delta<Track>):Void {
		if ( delta.current.exists ) {
			var track = delta.current;

			page.title = track.title;

			_applySettings();
		}
	}

	/**
	  * apply [data.settings] to [this]
	  */
	private function _applySettings():Void {
		var m = media;
		var s = data.settings;

		m.volume = s.volume;
		m.playbackRate = s.speed;
	}

	/**
	  * Get the volume jump
	  */
	public inline function volumeJump():Float {
		return 0.01;
	}

	/**
	  * Get the time jump
	  */
	public function timeJump(lvl : Int = 1):Float {
		switch ( lvl ) {
			case 1:
				return 2;
			case 2:
				return 10;
			case 3:
				return 30;
			case 4:
				return 60;
			default:
				return 0;
		}
	}

	public function play():Void {
		media.play();
	}
	
	public function pause():Void {
		media.pause();
	}

	public function togglePlayback():Void (paused?play:pause)();
	public function toggleMuted():Void {
		muted = !muted;
	}
	public inline function isFullscreen():Bool return appw.isFullscreen();
	public inline function toggleFullscreen():Void {
		(isFullscreen()?appw.restore:appw.fullscreen)();
	}

	/**
	  * Create a new Player window
	  */
	public function createNewPlayerWindow(?callback : Player->Void):Void {
		bpl.newPlayerWindow( callback );
	}

	/**
	  * Get all player windows
	  */
	public function getAllPlayerWindows():Array<AppWindow> {
		return bpl.allPlayerWindows();
	}

	/**
	  * Get all players
	  */
	public function getAllPlayers():Array<Player> {
		return bpl.allPlayers();
	}

	/**
	  * Get all Players that are on other windows
	  */
	public function getAllOtherPlayers():Array<Player> {
		return getAllPlayers().macfilter(_ != this);
	}

	/**
	  * Scroll event
	  */
	private function scroll(event : ScrollEvent):Void {
		volume += (event.delta / 100);
	}

/* === Computed Instance Fields === */

	public var media(get, never):MediaObject;
	private function get_media():MediaObject return pane.media;

	public var paused(get, never):Bool;
	private inline function get_paused():Bool return media.paused;

	public var volume(get, set):Float;
	private inline function get_volume():Float return media.volume;
	private function set_volume(v : Float):Float {
		data.settings.volume = v;
		return (media.volume = v);
	}

	public var playbackRate(get, set):Float;
	private inline function get_playbackRate():Float return media.playbackRate;
	private function set_playbackRate(v : Float):Float {
		data.settings.speed = v;
		return (media.playbackRate = v);
	}

	/* whether [this] Player is currently muted */
	public var muted(get, set):Bool;
	private inline function get_muted():Bool return (media.muted);
	private inline function set_muted(v:Bool):Bool return (media.muted = v);

	public var currentTime(get, set):Float;
	private inline function get_currentTime():Float return media.currentTime;
	private inline function set_currentTime(v : Float):Float return (media.currentTime = v);

	public var shuffle(get, set):Bool;
	private inline function get_shuffle() return data.settings.shuffle;
	private inline function set_shuffle(v : Bool) return (data.settings.shuffle = v);

	/* the currently playing Track */
	public var currentTrack(default, set):Null<Track>;
	private function set_currentTrack(t : Null<Track>):Null<Track> {
		var curr = currentTrack;
		var result = (currentTrack = t);
		var delta = new Delta(currentTrack, curr);
		trackChange.call( delta );
		return result;
	}

	private var bpl(get, never):BPlayer;
	private inline function get_bpl():BPlayer {
		return BPlayer.instance;
	}

	public var playerNumber(get, never):Int;
	private inline function get_playerNumber():Int {
		return bpl.getPlayerIndex( this );
	}

/* === Instance Fields === */

	public var playlist : Playlist;
	public var pane : MediaPane;
	//public var audioProcessor : AudioProcessor;
	public var keyControls : PlayerKeyControls;
	public var controls : PlayerControls;
	public var show_ui : Bool = false;
	public var theme : ColorScheme;
	public var appw : AppWindow;
	public var data : ApplicationData;

	public var page : PlayerPage;
	public var config : PlayerConfig;

	/* Signal fired when [currentTrack] changes */
	public var trackChange : Signal<Delta<Track>>;
	public var playlistChange : VoidSignal;

	private var showUiEvents : Array<String>;
	private var _ready : Bool = false;
	private var _onready : VoidSignal;
}
