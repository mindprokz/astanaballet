import SendFunc from './modules/sendForm.js';
//import FloatMenu from './modules/floatMenu.js';
import Tabs from './modules/tabs.js';
import Pvis from './modules/pvis.js';
import MediaGrid from './modules/mediaGrid.js';
import Wow from './modules/wow.js';

// По нажатию на гамбургер открывать меню
document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.burger').addEventListener('click', function () {
		document.querySelector('.navigation').classList.toggle('not-active');
		document.querySelector('.navigation').classList.toggle('active');
	});
});

$(document).ready(function () {
	if( $.flexslider) {
	  $('.flexslider').flexslider({
	    animation: 'slide',
	    controlsContainer: '.flexslider',
	  });

	  $('.third_slider').flexslider({
	    animation: 'slide',
	    controlsContainer: '.arrows___header__last_events',
	    controlNav: false,
	    prevText: "P",
			nextText: "N",
      animationLoop: true,
      itemWidth: 400,
      itemMargin: 0,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize() // use function to pull in initial value
	  });

	  $(window).resize(function () {
		  $('.third_slider').flexslider({
		    animation: 'slide',
		    controlsContainer: '.arrows___header__last_events',
		    controlNav: false,
		    prevText: "P",
				nextText: "N",
	      animationLoop: true,
	      itemWidth: 400,
	      itemMargin: 0,
	      minItems: getGridSize(), // use function to pull in initial value
	      maxItems: getGridSize() // use function to pull in initial value
		  });
	  });
	}
});

// Pages of block
if (window.blog) {

	var msnry = new Masonry( '.blog .wrap', {
		itemSelector: '.blog-elem',
	});

}

if (window.afish) {
	var tabs = new Tabs('.elem__tabs-menu','.content-elem__tabs');
	tabs.createListeners();
}

if (window.contact) {
	var map;

	DG.then(function () {
		map = DG.map('map', {
      	center: [51.098056,71.418868],
      	zoom: 13
  		});

		DG.marker([51.098056,71.418868]).addTo(map).bindPopup('Мы находимся здесь!');
  });
}

if (window.fancybox) {
	$(".fancybox").click(function() {
		$(".fancybox").fancybox({
			maxWidth: 800,
			maxHeight: 800,
			fitToView: false,
			width: '80%',
			height: '80%',
			autoSize: false,
			closeClick: false,
			openEffect: 'elastic',
			closeEffect: 'elastic'
		});
	});
}

if (window.about) {
	document.addEventListener('DOMContentLoaded', () => {
		let playVideoWhenOnScreen = new Pvis('video');
	});
}

if (window.media || window.category) {

	let mediaGrid = new MediaGrid(document.querySelectorAll('.media-Elem'), document.querySelectorAll('.elem__tabs-filters'));

	let filters = ['all', 'image', 'video'];

	mediaGrid.tabs.forEach( (item, number, arr) => {
		item.addEventListener('click', function () {
			if (!this.classList.contains('active')) {
				mediaGrid.update(filters[number]);
				mediaGrid.updateActiveTab(this);
			}
		});
	});
}

if (window.wow) {
	let wow = new Wow(document.querySelectorAll('.wow'));
}

// tiny helper function to add breakpoints
function getGridSize() {
  return (window.innerWidth < 750) ? 2 :
         (window.innerWidth < 1200) ? 3 : 3;
}
