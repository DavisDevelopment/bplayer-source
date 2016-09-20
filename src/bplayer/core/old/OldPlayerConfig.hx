package bplayer.core.old;

import tannus.css.StyleSheet;

import tannus.html.fs.WebFileEntry;

typedef OldPlayerConfig = {
	build : BuildConfig,
	?items : Array<WebFileEntry>
};

typedef BuildConfig = {
	var type : BuildType;
};

@:enum
abstract BuildType (String) from String to String {
	var Deploy = 'deploy';
	var Development = 'development';
}
