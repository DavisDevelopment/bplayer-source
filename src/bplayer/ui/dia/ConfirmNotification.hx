package bp.ui.dia;

import foundation.*;

import tannus.html.Element;
import tannus.ds.Memory;
import tannus.media.Duration;
import tannus.io.*;
import tannus.events.*;

import bp.core.*;
import bp.ds.*;
import bp.ui.*;

import Std.*;
import Math.*;
import tannus.math.TMath.*;
import gryffin.Tools.*;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class ConfirmNotification extends Notification {
	/* Constructor Function */
	public function new():Void {
		super();

		th = new Heading( 4 );
		tp = new Paragraph();
		rb = new Button('');
		lb = new Button('');

		__build();
	}

/* === Instance Methods === */

	/**
	  * apply styling to [this]
	  */
	private function __build():Void {
		append( th );
		append( tp );
		append( rb );
		append( lb );

		rb.css['float'] = 'right';
		//rb.css['width'] = '50%';
		//lb.css['width'] = '50%';

		/* create the [rightButton] and [leftButton] values */
		rightButton = defaultConfirmButton();
		leftButton = defaultConfirmButton();
		/* bind the 'text' fields between the Button objects and the Button widgets */
		leftButton.text.attach( lb.text );
		rightButton.text.attach( rb.text );
		/* assign default values */
		rightButton.text &= 'Dismiss';
		leftButton.text &= 'Okay';
		
		/* bind the 'click' events */
		lb.on('click', function(x) leftButton.click( x ));
		rb.on('click', function(x) rightButton.click( x ));

		th.textColor = '#FFF';
	}

	/**
	  * create and return a default btn
	  */
	private function defaultConfirmButton():ConfirmButton {
		return {
			'text': Ptr.to( 'Okay' ),
			'click': (function(event : MouseEvent) null)
		};
	}

/* === Computed Instance Fields === */

	public var title(get, set):String;
	private inline function get_title():String return th.text;
	private inline function set_title(v : String):String return (th.text = v);

	public var subtitle(get, set):String;
	private inline function get_subtitle():String return tp.text;
	private inline function set_subtitle(v : String):String return (tp.text = v);

/* === Instance Fields === */

	public var rightButton : ConfirmButton;
	public var leftButton  : ConfirmButton;

	public var th : Heading;
	public var tp : Paragraph;
	public var rb : Button;
	public var lb : Button;
}

typedef ConfirmButton = {
	var text : Ptr<String>;
	dynamic function click(event : MouseEvent):Void;
}
