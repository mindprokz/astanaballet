export default class mediaGrid{
	
	constructor(mediaElem, tabs) {
		this.mediaElems = mediaElem;
		this.tabs = tabs;
		this.msnry = new Masonry( '.media-content .container', {
									itemSelector: '.media-content .container .wrap',
								});
	}
	
	image() {
		let _arrow = [...this.mediaElems].filter((item) => {
			return item.classList.contains('image') ?  true : false;
		});
			
		return _arrow;
	}
		
	video() {
		let _arrow = [...this.mediaElems].filter((item) => {
			return item.classList.contains('video') ?  true : false;
		});
			
		return _arrow;
	}
		
	refreshAll() {
		[...this.mediaElems].forEach( (item) => item.style.display = 'block');
	}
		
	update(type) {
		if (type === 'image') {
			// исключаем все видео из списка
			this.refreshAll();
			this.video().forEach( (item) => item.style.display = 'none');
			this.msnry.layout();
		} else if (type === 'video'){
			this.refreshAll();
			this.image().forEach( (item) => item.style.display = 'none');
			this.msnry.layout();
		} else if (type === 'all') {
			this.refreshAll();
			this.msnry.layout();
		}
	}

	updateActiveTab(self) {
		document.querySelector('.elem__tabs-filters.active').classList.remove('active');
		self.classList.add('active');	
	}
}