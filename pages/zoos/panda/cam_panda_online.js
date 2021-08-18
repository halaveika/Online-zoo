(function() {
	"use strict";

	function Carousel(setting) {
		if(document.querySelector(setting.wrap) === null) {
			console.error(`Carousel not fount selector ${setting.wrap}`);
			return;
		}

		/* Scope privates methods and properties */
		let privates = {};


		/* Public methods */
		// Prev slide
		this.prev_slide = () => {
			++privates.opt.position;
      if(privates.opt.position > 0) {
        privates.sel.wrap.insertBefore( privates.sel.wrap.children[ privates.sel.wrap.children.length - 1 ], privates.sel.wrap.children[ 0 ] );
        --privates.opt.position;
      }
			privates.sel.wrap.style["transform"] = `translateX(${privates.opt.position * 298}px)`;
      console.dir(document.querySelector(privates.setting.wrap));
		};


		// Next slide
		this.next_slide = () => {
			--privates.opt.position;
      if(privates.opt.position < 0) {
        privates.sel.wrap.appendChild(privates.sel.wrap.children[0]);
        ++privates.opt.position;
      }
			privates.sel.wrap.style["transform"] = `translateX(${privates.opt.position * 298}px)`;
		};


    // Play slide
    this.play_slide = () => {
      console.dir(event.target.nextElementSibling)
      let activItem = document.querySelector('.main-video');
      let carouselItem= event.target.nextElementSibling;
      let dubItem = activItem.cloneNode();
      dubItem.classList.remove('main-video');
      carouselItem.classList.add('main-video');
      event.target.parentNode.insertBefore(dubItem, event.target.nextElementSibling );
      event.target.parentNode.children[3].innerHTML = `live - ${dubItem.id}`;
      activItem.replaceWith(carouselItem);

		};


		/* Privates properties */
		privates.setting = setting;

		privates.sel = {
			"main": document.querySelector(privates.setting.main),
			"wrap": document.querySelector(privates.setting.wrap),
			"children": document.querySelector(privates.setting.wrap).children,
			"prev": document.querySelector(privates.setting.prev),
			"next": document.querySelector(privates.setting.next),
		};

		privates.opt = {
			"position": 0,
			"max_position": -document.querySelector(privates.setting.wrap).children.length
		};

		// Control
		if(privates.sel.prev !== null) {
			privates.sel.prev.addEventListener('click', () => {
				this.prev_slide();
			});
		}

		if(privates.sel.next !== null) {
			privates.sel.next.addEventListener('click', () => {
				this.next_slide();
			});
		}

    if(privates.sel.wrap !== null) {
			privates.sel.wrap.addEventListener('click', () => {
        this.play_slide();
			});
		}



	}
	let a = new Carousel({
		"main": ".js-carousel",
		"wrap": ".js-carousel__wrapper",
		"prev": ".js-carousel__prev",
		"next": ".js-carousel__next",
	});

})();

