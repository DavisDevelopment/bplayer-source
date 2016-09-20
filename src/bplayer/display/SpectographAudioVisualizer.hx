package bplayer.display;

import tannus.io.*;
import bplayer.core.PlayerControls;
import tannus.ds.*;
import tannus.html.Win;
import tannus.geom2.*;
import tannus.graphics.Color;
import tannus.internal.CompileTime in Ct;
import tannus.math.Random;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.media.*;
import gryffin.audio.*;
import gryffin.Tools.*;

import bplayer.core.*;
import bplayer.ui.*;
import bplayer.core.media.*;
import bplayer.core.media.AudioMediaContext in Media;

import Math.*;
import tannus.math.TMath.*;
import Slambda.fn;

using StringTools;
using tannus.ds.StringUtils;
using Lambda;
using Slambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class SpectographAudioVisualizer extends AudioVisualizer {
/* === Instance Methods === */

	/**
	  * per-frame logic
	  */
	override public function update(stage : Stage):Void {
		//pullData();
	}

	/**
	  * render visualization
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		c.save();
		
		// draw the background
		c.fillStyle = 'black';
		var r = media.target;
		c.fillRect(r.x, r.y, r.w, r.h);

		if ( ready ) {
			//pullData();
			waveform(stage, c);
		}
		
		c.restore();
	}

	/**
	  * draw the waveform for the left channel
	  */
	private function waveform(stage:Stage, c:Ctx):Void {
		c.lineWidth = 2;
		var colors = getColors();

		fftSize = 512;
		smoothing = 0.3;

		pullData();
		if (leftData != null) {
			c.beginPath();
			c.strokeStyle = colors[0].toString();
			drawAudioDataVertices(leftData, c);
			c.stroke();
		}
		if (rightData != null) {
			c.beginPath();
			c.strokeStyle = colors[1].toString();
			drawAudioDataVertices(rightData, c, fn(255 - _));
			c.stroke();
		}
	}

	/**
	  * draw the spectograph
	  */
	public function drawSpectograph(c:Ctx, data:AudioData<Int>, color:Color):Void {
		c.strokeStyle = color.toString();
		c.lineJoin = c.lineCap = 'round';

		var lines:Array<Line<Int>>;
		lines = calculateSpectographLines( data );

		var rand = new Random();
		var n:Getter<Int> = Getter.create(rand.randint(0, 5));

		for (index in 0...lines.length) {
			var line = lines[index];

			// draw the line segment
			c.globalAlpha = 1.0;
			c.lineWidth = 3;
			c.buildPath([stroke], {
				c.moveTo((line.one.x), (line.one.y));
				c.lineTo((line.two.x), (line.two.y));
			});

			c.globalAlpha = 0.8;
			c.lineWidth = 1;
			c.buildPath([stroke], {
				c.moveTo((line.one.x - n.get()), (line.one.y - n.get()));
				c.lineTo((line.two.x - n.get()), (line.two.y - n.get()));
			});
			c.buildPath([stroke], {
				c.moveTo((line.one.x + n.get()), (line.one.y + n.get()));
				c.lineTo((line.two.x + n.get()), (line.two.y + n.get()));
			});
		}

		c.stroke();
	}

	/**
	  * calculate the Lines that make up the spectograph for the given data
	  */
	public function calculateSpectographLines(data : AudioData<Int>):Array<Line<Int>> {
		return calculateSpectographPoints( data ).getLines( false );
	}

	/**
	  * pull data from the Analysers
	  */
	public function pullData():Void {
		var shouldPull:Bool = (player.status.match(Playing));
		if ( shouldPull ) {
			leftData = leftAnalyser.getByteTimeDomainData();
			rightData = rightAnalyser.getByteTimeDomainData();
		}
	}

	/**
	  * Build and return the Points for the spectograph for the given AudioData
	  */
	public function calculateSpectographPoints(data:AudioData<Int>, ?array:VertexArray<Int>):VertexArray<Int> {
		var inplace:Bool = true;
		if (array == null) {
			array = new VertexArray();
			inplace = false;
		}

		var rect:Rect<Int> = media.target;
		var h:Float = (rect.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (rect.width * 1.0 / data.length);
		var x:Float = 0;
		
		for (i in 0...data.length) {
			var offset:Float = ((data.length / 2) - abs((data.length / 2) - i));
			offset = (offset / (data.length / 2));
			var n:Float = (data[i] / 128.0);
			var y:Float = (mid + (mid - (n * mid)) * offset);

			var point = new Point(round(x), round(y));//.round();
			array.set(i, point);
			/*
			if ( inplace ) {
				array.get( i ).copyFrom( point );
			}
			else {
				array.push( point );
			}
			*/

			x += sliceWidth;
		}

		return array;
	}

	/**
	  * draw the spectograph for the given AudioData, onto the given Ctx
	  */
	public function drawAudioDataVertices(data:AudioData<Int>, c:Ctx, ?f:Int->Int):Void {
		var rect:Rect<Int> = media.target;
		var h:Float = (rect.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (rect.width * 1.0 / data.length);
		var x:Float = 0;
		for (i in 0...data.length) {
			var offset:Float = ((data.length / 2) - abs((data.length / 2) - i));
			offset = (offset / (data.length / 2));
			var di:Int = data[i];
			if (f != null) {
				di = f( di );
			}
			var n:Float = (di / 128.0);
			var y:Float = (mid + (mid - (n * mid)) * offset);
			(i == 0 ? c.moveTo : c.lineTo)(x, y);
			x += sliceWidth;
		}
	}

	public function quickDrawSpectograph(c:Ctx, data:AudioData<Int>, color:Color, ?f:Int->Int):Void {
		c.lineJoin = c.lineCap = 'round';

		var rect:Rect<Int> = media.target;
		var h:Float = (rect.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (rect.width * 1.0 / data.length);
		
		var rand = new Random();
		var rn:Getter<Int> = Getter.create(rand.choice([0, 3, 5]));
		var colors:Array<String> = [color, color.lighten(20), color.darken(20)].map.fn(_.toString());

		var nearDistance:Int = 4;
		var hist:Array<Pos<Float>> = new Array();
		var prev:Null<Pos<Float>>=null;
		var pos:Pos<Float> = new Pos();

		for (i in 0...data.length) {
			var offset:Float = ((data.length / 2) - abs((data.length / 2) - i));
			offset = (offset / (data.length / 2));
			var n:Float = ((f!=null?f(data[i]):data[i]) / 128.0);
			
			pos.y = (mid + (mid - (n * mid)) * offset);
			
			if (prev != null) {
				// draw the base line segment
				c.globalAlpha = 1.0;
				c.lineWidth = rand.randint(2, 4);
				c.strokeStyle = rand.choice( colors );
				c.buildPath([stroke], {
					c.moveTo(prev.x, prev.y);
					c.lineTo(pos.x, pos.y);
				});

				// draw two randomly distorted versions of that line which are smaller, and less visible
				/*
				c.globalAlpha = 0.7;
				c.lineWidth = 1;
				c.strokeStyle = rand.choice( colors );
				c.buildPath([stroke], {
					c.moveTo((prev.x - rn.get()), (prev.y - rn.get()));
					c.lineTo((pos.x - rn.get()), (pos.y - rn.get()));
				});
				c.buildPath([stroke], {
					c.moveTo((prev.x + rn.get()), (prev.y + rn.get()));
					c.lineTo((pos.x + rn.get()), (pos.y + rn.get()));
				});
				*/

			}
			prev = pos.clone();


			// wait until [/*hist] has accumulated at least [nearDistance] items*/
			//if (hist.length < nearDistance) {
				//hist.push(pos.clone());
			//}
			//// once it has
			//else {
				//// remove the first item in [hist]
				//hist.shift();
				//// each time a new item is appended
				//hist.push(pos.clone());
				//// grab the Point that was drawn [nearDistance] iterations ago
				//var near = hist[0];
				//// draw a line to that Point
				//c.globalAlpha = 0.8;
				//c.lineWidth = 1.5;
				//c.strokeStyle = rand.choice( colors );
				//c.buildPath([stroke], {
					//_.moveTo(pos.x, pos.y);
					//_.lineTo(near.x, near.y);
				//});
			/*}*/

			pos.x += sliceWidth;
		}
		c.globalAlpha = 1.0;

		/*
		for (index in 0...lines.length) {
			var line = lines[index];

			// draw the line segment
			c.globalAlpha = 1.0;
			c.lineWidth = 3;
			c.buildPath([stroke], {
				c.moveTo((line.one.x), (line.one.y));
				c.lineTo((line.two.x), (line.two.y));
			});

			c.globalAlpha = 0.8;
			c.lineWidth = 1;
			c.buildPath([stroke], {
				c.moveTo((line.one.x - n.get()), (line.one.y - n.get()));
				c.lineTo((line.two.x - n.get()), (line.two.y - n.get()));
			});
			c.buildPath([stroke], {
				c.moveTo((line.one.x + n.get()), (line.one.y + n.get()));
				c.lineTo((line.two.x + n.get()), (line.two.y + n.get()));
			});
		}
		*/
	}

	/**
	  * draw the spectograph for the given AudioData, onto the given Ctx
	  */
	public function drawInvertedAudioDataVertices(data:AudioData<Int>, c:Ctx):Void {
		var rect:Rect<Int> = media.target;
		var h:Float = (rect.height);
		var mid:Float = (h / 2);
		var variance:Float = (0.25 * mid);
		var sliceWidth:Float = (rect.width * 1.0 / data.length);
		var x:Float = 0;
		for (i in 0...data.length) {
			var offset:Float = ((data.length / 2) - abs((data.length / 2) - i));
			offset = (offset / (data.length / 2));
			var n:Float = ((255 - data[i]) / 128.0);
			var y:Float = (mid + (mid - (n * mid)) * offset);
			(i == 0 ? c.moveTo : c.lineTo)(x, y);
			x += sliceWidth;
		}
	}

	/**
	  * Get the Colors used by [this] Visualization
	  */
	private function getColors():Array<Color> {
		if (colorIds == null) {
			var base:Color = player.theme.secondary;
			var list = new Array();
			list.push( base );
			list.push(base.invert());
			colorIds = list.map( player.theme.save );
			return list;
		}
		else {
			return colorIds.map( player.theme.restore );
		}
	}

/* === Instance Fields === */

	public var leftData : Null<AudioData<Int>> = null;
	public var rightData : Null<AudioData<Int>> = null;

	private var colorIds:Null<Array<Int>> = null;
}

typedef PosObj<T:Float> = {
	var x : T;
	var y : T;
};

@:forward
abstract Pos<T:Float> (PosObj<T>) from PosObj<T> to PosObj<T> {
	public inline function new(?x:Maybe<T>, ?y:Maybe<T>):Void {
		this = {x: (x.or(cast 0)), y: (y.or(cast 0))};
	}
	public inline function clone():Pos<T> {
		return new Pos(this.x, this.y);
	}
}
