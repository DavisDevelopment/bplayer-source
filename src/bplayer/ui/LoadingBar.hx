package bplayer.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.ds.ProgressiveTask;
import tannus.ds.StandardTask;
import tannus.math.Percent;
import tannus.graphics.Color;

import bplayer.core.*;

import Std.*;

class LoadingBar extends ProgressBar {
	/* Constructor Function */
	public function new(p:Player, l:ProgressiveTask):Void {
		super();

		h = 30;
		border.radius = 5;
		border.width = 1;
		border.color = new Color(204, 204, 204);
		barColor = new Color(248, 185, 81);
		backgroundColor = new Color(249, 249, 249);
		text = 'Loading Session...';

		player = p;
		loader = l;
	}

/* === Instance Methods === */

	/**
	  * update [this] 
	  */
	override public function update(stage : Stage):Void {
		w = (stage.width * 0.7);
		centerX = stage.rect.centerX;
		centerY = player.rect.centerY;
		progress = loader.completion;

		if (Std.is(loader, StandardTask)) {
			var sl = cast(loader, StandardTask<Dynamic, Dynamic>);
			text = (sl.status != null ? string( sl.status ) : text);
		}

		super.update( stage );
	}

/* === Instance Fields === */

	private var player : Player;
	private var loader : ProgressiveTask;
}
