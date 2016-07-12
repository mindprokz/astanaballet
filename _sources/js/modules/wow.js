export default class Wow{
	
	constructor(elems) {
		this.elemsForCheck = [...elems];
		this.init();	
	}
	
	init() {
		if (!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ) {
			
			this.elemsForCheck.forEach( (item, number, arr) => {
					
				let pos = Math.round(screen.availHeight / 2) > Math.abs(item.getBoundingClientRect().top - 250);
					
				if (pos) {
						
					arr.splice(number, 1);	
					setTimeout( () => {
						item.style.visibility = 'visible';
						item.classList.add('fadeInUp');
					}, (Math.random() * (600 - 100) + 100).toFixed(2) );
				}
			});
			
			// listener for blocks
			document.addEventListener('scroll', () => {
				
				this.elemsForCheck.forEach( (item, number, arr) => {
					
					let pos = Math.round(screen.availHeight / 2) > Math.abs(item.getBoundingClientRect().top - 250);
					
					if (pos) {
						
						arr.splice(number, 1);	
						setTimeout( () => {
							item.style.visibility = 'visible';
							item.classList.add('fadeInUp');
						}, (Math.random() * (600 - 100) + 100).toFixed(2) );
					}
				});
			});
		} else {
			this.elemsForCheck.forEach( (item, number, arr) => {
				item.style.visibility = 'visible';
				item.classList.add('fadeInUp');
			});
		}				
	}
}