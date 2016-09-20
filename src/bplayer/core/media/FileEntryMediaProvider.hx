package bplayer.core.media;

import tannus.ds.Promise;
import tannus.html.fs.WebFileEntry;

class FileEntryMediaProvider extends MediaProvider {
	private var entry : WebFileEntry;
	public function new(f : WebFileEntry):Void {
		super();
		entry = f;
	}
	override public function getName():String {
		return entry.name;
	}
	override private function toMedia():tannus.ds.Promise<MediaImpl> {
		return Promise.create({
			var f = entry.file();
			f.then(function( file ) {
				var mime = file.type;
				var media : Null<MediaImpl> = null;
				if (mime.type == 'video') {
					media = cast new VideoMediaImpl(entry, file);
				}
				else if (mime.type == 'audio') {
					media = cast new AudioMediaImpl(entry, file);
				}
				else {
					throw 'invalid file type';
				}
				
				if (media == null) {
					media = new MediaImpl();
				}

				media.mediaGroup = mediaGroup;

				return media;
			});
			f.unless(function( error ) {
				throw error;
			});
		});
	}
}
