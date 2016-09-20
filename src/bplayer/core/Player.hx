package bplayer.core;

import tannus.io.*;
import tannus.ds.*;
import tannus.html.fs.*;
import tannus.media.Duration;
import tannus.math.*;
import tannus.geom2.*;
import tannus.html.Win;
import tannus.math.Random;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.media.MediaReadyState;
import gryffin.audio.Audio;
import gryffin.Tools.defer;

import bplayer.display.*;
import bplayer.display.Audio;
import bplayer.display.Video;
import bplayer.ui.*;
import bplayer.core.media.*;
import bplayer.db.*;
import bplayer.sys.FileSystem;
import bplayer.core.Queue;
import bplayer.async.*;
import bplayer.async.ThumbnailLoader;

import chrome.Windows;
import chrome.app.AppWindow;

import Math.*;
import tannus.math.TMath.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;
using tannus.math.RandomTools;

class Player extends Ent {
	/* Constructor Function */
	public function new():Void {
		super();

		page = null;
		theme = new ColorScheme();
		display = new PlayerDisplay( this );
		controls = new PlayerControls( this );
		controls_view = new PlayerControlsView( this );
		addChild( controls_view );

		on_data_ready = new VoidSignal();
		on_data_ready.once(function() {
			data_ready = true;
		});

		mediaChange = new Signal();
		contextChange = new Signal();
		sessionChange = new Signal();
		uiVisibilityToggled = new Signal();

		mode = PlaybackMode.base();
		queue = new Queue();
		currentMedia = null;
		show_ui = true;
	}

/* === Instance Methods === */

	/**
	  * initialize [this] Player
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		display.init( stage );

		onready(function() {
			mode.changed.on(push_profile.bind(function() null));

			/*
			function saveMe():Void {
				savePlayerData(function() {
					trace('Saved Player data');
				});
			}

			var win = Win.current;
			win.setInterval(saveMe, 10000);
			*/
		});

		initialize_data();
	}

	/**
	  * update [this] Player
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		if (context != null) {
			context.update( stage );
		}

		display.update( stage );
	}

	/**
	  * render [this] Player
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		if (context != null) {
			context.render(stage, c);
		}

		display.render(stage, c);

		super.render(stage, c);
	}

	/**
	  * update [this]'s geometry
	  */
	override public function calculateGeometry(r : tannus.geom.Rectangle):Void {
		super.calculateGeometry( r );

		w = r.w;
		h = r.h;
	}

	/**
	  * when [this] Player is ready to be worked with
	  */
	public function onready(action : Void->Void):Void {
		if ( data_ready ) {
			defer( action );
		}
		else {
			on_data_ready.once( action );
		}
	}

	/**
	  * initializes the ApplicationData, based on how it is provided to the Player object
	  */
	private function initialize_data():Void {
		if (data == null) {
			data = new ApplicationData();
		}
		if ( !data.isReady ) {
			data.init(function() {
				on_data_ready.fire();
			});
		}
		else {
			defer( on_data_ready.fire );
		}
	}

	/**
	  * play the current media
	  */
	public function play():Void {
		if (context != null) {
			context.play();
		}
	}

	/**
	  * pause the current media
	  */
	public function pause():Void {
		if (context != null) {
			context.pause();
		}
	}

	/**
	  * stop the current media
	  */
	public function stop():Void {
		if (context != null) {
			context.stop();
		}
	}

	/**
	  * toggle playback of current media
	  */
	public function togglePlayback():Void {
		if (context != null) {
			context.togglePlayback();
		}
	}

	/**
	  * skip to the Track at specified relative index
	  */
	public function skip(index : Int):Void {
		if (currentMedia != null) {
			var mp:Null<MediaProvider> = queue.get(queue.indexOf( provider ) + index);
			if (mp != null) {
				load(mp, function() {
					sessionAltered();
				});
			}
		}
	}

	/**
	  * loads the given MediaProvider into a playable media
	  */
	public function load(mp:MediaProvider, ?can_manip:Void->Void, ?can_play:Void->Void):Void {
		// ensure non-null-ness of our callbacks
		if (can_manip == null) 
			can_manip = (function() null);
		
		if (can_play == null) 
			can_play = (function() null);


		// refuse to load if player is locked
		if ( mediaLocked ) {
			return ;
		}

		// request Media from a provider
		var p = mp.getMedia();
		// when Media is received
		p.then(function( media ) {
			// shift focus to the new current media
			currentMedia = media;
			// and its generous provider
			provider = mp;
			// bind events to callbacks
			context.readyEvent.once( can_play );
			context.canManipulateEvent.once( can_manip );
		});
		p.unless(function( error ) {
			trace( error );
		});
	}

	/**
	  * add a Track to [this]'s queue
	  */
	public function addMedia(m:MediaProvider, autoLoad:Bool=true, ?callback:Void->Void):Void {
		queue.push( m );
		
		/* if [m] is the first addition to the queue */
		if (!mediaLocked && autoLoad && queue.length == 1) {
			load(m, callback);
		}
		else {
			if (callback != null) {
				defer( callback );
			}
		}
	}

	/**
	  * set the entire Queue at once
	  */
	public function setQueue(q:Queue, autoLoad:Bool=true, ?callback:Void->Void):Void {
		// modified callback
		function done():Void {
			sessionAltered();
			if (callback != null) {
				callback();
			}
		}

		// clear the Player, and attach new Queue
		clear();
		queue = q;

		if ( autoLoad ) {
			load(queue.get( 0 ), done);
		}
		else {
			if (callback != null) {
				defer( done );
			}
		}
	}

	/**
	  * close [this] Player
	  */
	public function close():Void {
		if (page != null && page.previousPage != null) {
			page.back();
		}
		else {
			BPlayer.instance.openRootGalleryPage();
		}
	}

	/**
	  * clear all content from [this] Player
	  */
	public function clear():Void {
		// do not clear if Player is locked
		if ( mediaLocked ) {
			return ;
		}

		stop();
		queue = new Queue();
		sessionAltered();
	}

	/**
	  * navigate back to the previous view
	  */
	public function back():Void {
		clear();
		close();
	}

	/**
	  * minimize [this] Player
	  */
	public function minimize():Void {
		minimized = true;
		close();
	}

	/**
	  * toggle Fullscreen mode
	  */
	public function toggleFullscreen():Void {
		var w = Windows.current();
		if (w.isFullscreen()) {
			w.restore();
		}
		else {
			w.fullscreen();
		}
	}

	/**
	  * apply the given PlaybackMode to the current context
	  */
	public function applyMode(mode : PlaybackMode):Void {
		volume = mode.volume;
		playbackRate = mode.playbackRate;
		muted = mode.muted;
		data.settings.shuffle = mode.shuffle;
		if ( mode.paused ) {
			pause();
		}
		else {
			play();
		}
	}

	/**
	  * get the PlaybackMode for the current media context
	  */
	public inline function getCurrentMediaMode():PlaybackMode {
		return PlaybackMode.fromPlayer( this );
	}

	/**
	  * check whether the current media's mode is the same as the Player's mode
	  */
	public inline function modesSynced():Bool {
		return (getCurrentMediaMode().equals( mode ));
	}

	/**
	  * select and load file(s) directly
	  */
	public function openUserSelectedFiles(?callback : Bool->Void):Void {
		if (callback == null) {
			callback = (function(x) null);
		}

		pause();
		var p = FileSystem.chooseFiles();
		p.then(function( entries ) {
			var loader = new FileSystemMediaLoader();
			loader.load(cast entries, function( medias ) {
				var pl = new Queue( medias );

				if (!medias.empty()) {
					setQueue(pl, null, callback.bind( true ));
				}
				else {
					callback( false );
				}
			});
		});
		p.unless(function( error ) {
			callback( false );
		});
	}

	/**
	  * pull stored data onto [this] Player
	  */
	private function pull_profile(done : Void->Void):Void {
		var smode = data.profile.mode;
		if (smode != null) {
			mode.pull( smode );
		}
		done();
	}

	/**
	  * Save all the Player-related data
	  */
	public function savePlayerData(?callback : Void->Void):Void {
		if (callback == null) {
			callback = (function() null);
		}

		var stack = new AsyncStack();

		stack.push( push_profile );
		stack.push( push_session );

		stack.run( callback );
	}

	/**
	  * Load all the Player data
	  */
	public function loadPlayerData(callback : Void->Void):Void {
		var stack = new AsyncStack();

		stack.push( pull_profile );
		stack.push( pull_session );

		stack.run( callback );
	}

	/**
	  * push profile data from [this] Player into the database
	  */
	private function push_profile(done : Void->Void):Void {
		data.profile.mode = mode;
		done();
	}

	/**
	  * pull the given Session
	  */
	private function push_session(done : Void->Void):Void {
		data.sessions.saveSession(getSession());
		done();
	}

	/**
	  * push the Session
	  */
	private function pull_session(done : Void->Void):Void {
		var session = data.sessions.loadSession();
		if (session != null) {
			setSession(session, done);
		}
		else {
			done();
		}
	}

	/**
	  * get the Player's current Session
	  */
	public inline function getSession():Session {
		return Session.fromPlayer( this );
	}

	/**
	  * apply the given Session to [this] Player
	  */
	public function setSession(session:Session, callback:Void->Void):Void {
		session.apply(this, callback);
		sessionAltered();
	}

	/**
	  * announce that the Session has changed
	  */
	private function sessionAltered():Void {
		var sess:Session = getSession();
		sessionChange.call( sess );
		last_session = sess;
	}

	/**
	  * Check whether [this] Player is current locked
	  */
	public inline function isMediaLocked():Bool return mediaLocked;

	/**
	  * 'lock' [this] Player, preventing any navigation away from the current media, until unlocked
	  */
	public inline function lockMedia():Void {
		mediaLocked = true;
	}

	/**
	  * 'unlock' [this] Player, renewing the user's freedom of movement through the application
	  */
	public inline function unlockMedia():Void {
		mediaLocked = false;
	}

	/**
	  * load thumbnails at the given times for the current media
	  */
#if development
	public function loadThumbnails(times:Array<Float>, callback:Array<ThumbResult>->Void):Void {
		var loader = new ThumbnailLoader( currentMedia );
		
		loader.setDimensionMutator(function(r) {
			r.w = 320;
			r.h = 240;
			return r;
		});

		loader.load(times, function() {
			var results = loader.result;

			callback( results );
		});
	}
#end

/* === Computed Instance Fields === */

	/* the current Media object */
	public var currentMedia(default, set): Null<Media>;
	private function set_currentMedia(m : Null<Media>):Null<Media> {
		// store the current value for [currentMedia]
		var pcm:Null<Media> = currentMedia;
		// store the current value for [context]
		var pc:Null<MediaContext> = context;

		if (m == null) {
			context = null;
		}
		else {
			context = m.getContext();
		}

		// store the value that will be returned
		var returnValue:Null<Media> = (currentMedia = m);

		// create a Delta object to represent the change in media
		var mediaDelta:Delta<Media> = new Delta(currentMedia, pcm);

		// broadcast [mediaDelta]
		mediaChange.call( mediaDelta );

		// create a Delta object to represent the change in context
		var contextDelta:Delta<MediaContext> = new Delta(context, pc);

		// broadcast [contextDelta]
		contextChange.call( contextDelta );

		return returnValue;
	}

	public var duration(get, never):Duration;
	private function get_duration():Duration {
		if (context != null) {
			return context.duration;
		}
		else {
			return new Duration();
		}
	}

	/* the current time-based position in [this] media */
	public var currentTime(get, set):Float;
	private function get_currentTime():Float {
		if (context != null) {
			return context.currentTime;
		}
		else {
			return 0;
		}
	}
	private function set_currentTime(v : Float):Float {
		if (context != null) {
			return (context.currentTime = v);
		}
		else {
			return 0;
		}
	}

	/* the volume at which [this] will play */
	public var volume(get, set):Float;
	private function get_volume():Float {
		if (context != null) {
			return context.volume;
		}
		else {
			return 0;
		}
	}
	private function set_volume(v : Float):Float {
		if (context != null) {
			return (context.volume = v);
		}
		else {
			return 0;
		}
	}

	/* the speed at which [this] will play */
	public var playbackRate(get, set):Float;
	private function get_playbackRate():Float {
		if (context != null) {
			return context.playbackRate;
		}
		else {
			return 0;
		}
	}
	private function set_playbackRate(v : Float):Float {
		if (context != null) {
			return (context.playbackRate = v);
		}
		else {
			return 0;
		}
	}

	/* whether the media is currently paused */
	public var paused(get, never):Bool;
	private function get_paused():Bool {
		if (context != null) {
			return context.paused;
		}
		else {
			return false;
		}
	}

	/* whether the media is currently muted */
	public var muted(get, set):Bool;
	private function get_muted():Bool {
		if (context != null) {
			return context.muted;
		}
		else {
			return false;
		}
	}
	private function set_muted(v : Bool):Bool {
		if (context != null) {
			return (context.muted = v);
		}
		else {
			return false;
		}
	}

	/* the percentage of the media which has been played */
	public var progress(get, set):Percent;
	private function get_progress():Percent {
		if (context != null) {
			return Percent.percent(currentTime, duration.totalSeconds);
		}
		else {
			return new Percent( 0 );
		}
	}
	private function set_progress(v : Percent):Percent {
		if ( m.exists ) {
			currentTime = v.of( duration.totalSeconds );
		}
		return progress;
	}

	/* the current media context as a Maybe */
	private var m(get, never):Maybe<MediaContext>;
	private inline function get_m():Maybe<MediaContext> return context;

	/**
	  * the display rect
	  */
	public var displayRect(get, never):Rect<Int>;
	private function get_displayRect():Rect<Int> {
		var r:Rect<Int> = new Rect(ceil( x ), ceil( y ), ceil( w ), ceil( h ));
		return r;
	}

	/* whether [this] Player is currently if fullscreen mode */
	public var fullscreen(get, never):Bool;
	private function get_fullscreen():Bool {
		var w = Windows.current();
		return w.isFullscreen();
	}

	/* the player's current status */
	public var status(get, never):PlayerStatus;
	@:access( bplayer.core.media.MediaContext )
	@:access( gryffin.display.Video )
	@:access( gryffin.audio.Audio )
	private function get_status():PlayerStatus {
		var status : PlayerStatus;
		if (currentMedia != null) {
			var cm:Media = currentMedia;
			var ctx:MediaContext = context;
			var media:MediaObject = ctx.mo;
			var me : js.html.MediaElement;
			if (Std.is(media, Video)) {
				me = cast (cast(media, Video).vid);
			}
			else if (Std.is(media, Audio)) {
				me = cast (cast(media, Audio).sound);
			}
			else {
				me = null;
			}
			
			var readyState:MediaReadyState = me.readyState;
			switch ( readyState ) {
				case HAVE_NOTHING, HAVE_METADATA:
					status = Waiting;
				case HAVE_CURRENT_DATA, HAVE_FUTURE_DATA, HAVE_ENOUGH_DATA:
					if ( me.ended ) {
						status = Ended;
					}
					else {
						if ( me.paused ) {
							status = Paused;
						}
						else {
							status = Playing;
						}
					}

				default:
					status = Empty;
					throw 'Error: Cheeks are puffy';
			}
		}
		else {
			status = Empty;
		}
		return status;
	}

	/* whether to show the user interface */
	public var show_ui(default, set): Bool;
	private function set_show_ui(value : Bool):Bool {
		if (value != show_ui) {
			// previous [show_ui] value
			var psui:Bool = show_ui;
			// value that will be returned
			var result:Bool = (show_ui = value);
			// the Delta object
			var delta:Delta<Bool> = new Delta(result, psui);
			// report this change
			uiVisibilityToggled.call( delta );
			// return the new value
			return result;
		}
		else {
			return show_ui;
		}
	}

/* === Instance Fields === */

	public var data : ApplicationData;
	public var theme : ColorScheme;
	public var display : PlayerDisplay;

	public var controls : PlayerControls;
	public var controls_view : PlayerControlsView;
	public var page : Null<PlayerPage>;
	public var queue : Queue;
	public var mode : PlaybackMode;

	public var minimized : Bool = false;
	public var mediaLocked : Bool = false;

	private var data_ready : Bool = false;
	private var on_data_ready : VoidSignal;
	private var context : Null<MediaContext>;
	private var provider : Null<MediaProvider>;
	private var last_session : Null<Session>;

/* === Event Fields === */

	// a Signal fired when the value of [currentMedia] changes
	public var mediaChange : Signal<Delta<Media>>;

	// a Signal fired when the value of [context] changes
	public var contextChange : Signal<Delta<MediaContext>>;

	// a Signal fired when the Session changes
	public var sessionChange : Signal<Session>;

	public var uiVisibilityToggled : Signal<Delta<Bool>>;
}
