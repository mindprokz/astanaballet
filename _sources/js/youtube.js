if (!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ) {
	var tag = document.createElement('script');
	tag.id = 'iframe-demo';
	tag.src = 'https://www.youtube.com/iframe_api';
	
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	var player;
	function onYouTubeIframeAPIReady() {
		var videoElem = document.querySelector('.video__media');
		player = new YT.Player('existing-iframe-example', {
			// получение id из переданного
	    videoId: videoElem.getAttribute('href').match(/(.{11})\?/g)[0].slice(0, -1),
	    width: videoElem.clientWidth,
	    height: videoElem.clientHeight,
			playerVars: {
				'controls': 0,
				'rel': 0,
				'autoplay': 1,
				'loop': 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
	
	function onPlayerReady(event) {
		event.target.setVolume(0);
	}
	
	function onPlayerStateChange(event) {
		if (event.data === 0) {
			event.target.playVideo();
		}
	}
}	