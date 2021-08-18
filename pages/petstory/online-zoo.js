(function() {
	"use strict";

	function Carousel(setting) {
		if(document.querySelector(setting.wrapTop) === null) {
			console.error(`Carousel not fount selector ${setting.wrapTop}`);
			return;
		}

		/* Scope privates methods and properties */
		let privates = {};


		/* Public methods */
		// Prev slide
		this.prev_slide = () => {
      const widthItem = privates.sel.wrapTop.children[0].offsetWidth;
			++privates.opt.position;
      if(privates.opt.position > 0) {
        privates.sel.wrapTop.insertBefore(privates.sel.wrapTop.children[privates.sel.wrapTop.children.length-1],privates.sel.wrapTop.children[0]);
        privates.sel.wrapBottom.insertBefore(privates.sel.wrapBottom.children[privates.sel.wrapBottom.children.length-1],privates.sel.wrapBottom.children[0]);
        --privates.opt.position;
      }
			privates.sel.wrapTop.style["transform"] = `translateX(${privates.opt.position * (widthItem + 30)}px)`;
      privates.sel.wrapBottom.style["transform"] = `translateX(${privates.opt.position * (widthItem + 30)}px)`;
		};


		// Next slide
		this.next_slide = () => {
      const widthItem = privates.sel.wrapTop.children[0].offsetWidth;
			--privates.opt.position;
      if(privates.opt.position < 0) {
        privates.sel.wrapTop.appendChild(privates.sel.wrapTop.children[0]);
        privates.sel.wrapBottom.appendChild(privates.sel.wrapBottom.children[0]);
        ++privates.opt.position;}
			privates.sel.wrapTop.style["transform"] = `translateX(${privates.opt.position * (widthItem + 30)}px)`;
      privates.sel.wrapBottom.style["transform"] = `translateX(${privates.opt.position * (widthItem + 30)}px)`;
		};
    
		privates.setting = setting;

		privates.sel = {
			"main": document.querySelector(privates.setting.main),
			"wrapTop": document.querySelector(privates.setting.wrapTop),
			"childrenTop": document.querySelector(privates.setting.wrapTop).children,
      "wrapBottom": document.querySelector(privates.setting.wrapBottom),
      "childrenBottom": document.querySelector(privates.setting.wrapBottom).children,
			"prev": document.querySelector(privates.setting.prev),
			"next": document.querySelector(privates.setting.next),
		};

		privates.opt = {
			"position": 0,
			"max_position": -document.querySelector(privates.setting.wrapTop).children.length
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

	}
	let a = new Carousel({
		"main": ".js-carousel",
		"wrapTop": ".js-carousel__wrapper-top",
    "wrapBottom": ".js-carousel__wrapper-bottom",
		"prev": ".js-carousel__prev",
		"next": ".js-carousel__next"
	});

})();


const main = document.querySelector('.js-carouselB');
const wrap = document.querySelector('.js-carouselB__wrapper');
const input = document.querySelector('.js-carouselB__inputRange');
let position = 0;
let slideCoefficient = 5;

// changeSlide handler

input.addEventListener('input', () => {
  delayAutoSliding();
  changeSlide(input.value);
});

const changeSlide = (newValue) => {
  if (window.innerWidth <= 640) {console.log('stop scrolling');}
  else {
    if (newValue === undefined) newValue = ++input.value;
    const widthItem = wrap.children[0].offsetWidth;
    if(newValue > 7) { newValue = 0;input.value = 0;} 
    wrap.style["transform"] = `translateX(${-newValue * (widthItem +24)}px)`;
  }
};




// delayAutoSliding handler
wrap.addEventListener('click', () => {
  delayAutoSliding();
});

let autoSlideInterval = setInterval(changeSlide, 10000);
let autoSlideTimeout = null;

const delayAutoSliding = () => {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;

  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(changeSlide, 10000);
  }, 30000);
}


