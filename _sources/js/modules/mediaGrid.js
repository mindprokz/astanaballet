export default class mediaGrid{

	constructor(mediaElem, tabs) {
		this.mediaElems = mediaElem;
		this.tabs = tabs;
	}

	image() {
		return [...this.mediaElems].filter((item) => {
			return item.classList.contains('image') ?  true : false;
		});
	}

	video() {
		return [...this.mediaElems].filter((item) => {
			return item.classList.contains('video') ?  true : false;
		});
	}

	refreshAll() {
		[...this.mediaElems].forEach( (item) => item.style.display = 'block');
	}

	update(type) {
		if (type === 'image') {
			// исключаем все видео из списка
			this.refreshAll();
			this.video().forEach( (item) => item.style.display = 'none');
		} else if (type === 'video'){
			this.refreshAll();
			this.image().forEach( (item) => item.style.display = 'none');
		} else if (type === 'all') {
			this.refreshAll();
		}
	}

	updateActiveTab(self) {
		document.querySelector('.elem__tabs-filters.active').classList.remove('active');
		self.classList.add('active');
	}
}
