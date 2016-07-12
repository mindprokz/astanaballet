export default class {
	constructor(heightForObject) {
		this.start(heightForObject);
	}	
	
	start (heightForObject) {
		document.addEventListener('scroll', () => {
			let video = document.querySelector(heightForObject),
					hfo = document.querySelector(heightForObject).getBoundingClientRect().top - document.querySelector(heightForObject).getBoundingClientRect().height;
			console.log(hfo);		
			if (hfo < 0) {
				video.play();
			} else {
				video.pause();
				video.currentTime = 0;
			}
		});
	}

	resize () {
		
	}
	
}