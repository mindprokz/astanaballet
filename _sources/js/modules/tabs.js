export default class Tabs {
	
	constructor(tabs, content) {
		this.tabs = tabs;
		this.content = content;		
	}
	
	// Вызывается при клике на табуляцию
	// @data_id_clicked - это this нажатого таба
	changeActiveTab(data_id_clicked) {
		document.querySelector(`${this.tabs}.active`).classList.remove('active');
		data_id_clicked.classList.add('active');
	}
	
	// Вызывается при клике на табуляцию
	// @data_id_clicked - это this нажатого таба	
	changeActiveContent(data_id_clicked) {
		let id_elem = data_id_clicked.dataset.id;
		
		document.querySelector(`${this.content}.content-elem__tabs--visible`).classList.remove('content-elem__tabs--visible');
		console.log(document.querySelectorAll(this.content)[id_elem]);
		document.querySelectorAll(this.content)[id_elem].classList.add('content-elem__tabs--visible');	
		//data_id_clicked.classList.add('content-elem__tabs--visible');		
	}
	
	createListeners() {
		let tabs = [...document.querySelectorAll(`${this.tabs}`)],
				self = this;
		
		tabs.forEach( (element) => {
			element.addEventListener('click', function () {
				self.changeActiveTab(this);
				self.changeActiveContent(this);
			});
		})
	}
	
}