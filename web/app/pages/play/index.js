import ATV from 'atvjs';

const _ = ATV._;

const sampleStreams = [
	'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
	'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
	'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8',
	'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8',
	'http://www.streambox.fr/playlists/test_001/stream.m3u8',
	'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
	'http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8',
	'http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8',
	'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8'
];
const sampleStreamsLength = sampleStreams.length;
const upperBoundIndex = sampleStreamsLength - 1;

var PlayPage = ATV.Page.create({
    name: 'play',
    ready(options, resolve, reject) {
    	let assetId = options.id;
		let sampleStream = sampleStreams[_.random(0, upperBoundIndex)];
		let player = new Player();
		let mediaItem = new MediaItem('video', sampleStream);
		let playlist = new Playlist();

		playlist.push(mediaItem);
		player.playlist = playlist;
		player.play();

		resolve(false);
    }
});

export default PlayPage;