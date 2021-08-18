const mapImage = document.querySelector('.map');
const wrapper = document.querySelector('.container');
const headerElem = document.querySelector('.header');
const footerElem = document.querySelector('.footer');
const zoomInButton = document.querySelector('.map__zoom-in');
const zoomOutButton = document.querySelector('.map__zoom-out');
const startWidth = mapImage.offsetWidth;
const startHeight = mapImage.offsetHeight;
const innerItems = document.querySelectorAll('.inner');
const innerText = document.querySelectorAll('.inner-text');
const startTextFontSize = 16;
let counter = 0;
const animalsIcon = document.querySelectorAll('.map__info');
const placeIcon = document.querySelectorAll('.map__place-img');

mapImage.onmousedown = function(e) {

  var coords = getCoords(mapImage);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  mapImage.style.position = 'absolute';
  moveAt(e);


  const stopDrag = () => {
    document.onmousemove = null;
    mapImage.onmouseup = null;
  }


  function moveAt(e) {
    if (e.pageX >= wrapper.offsetWidth || e.pageX <= 0 || e.pageY <= 80 || e.pageY >= wrapper.offsetHeight +80 ) stopDrag();
    mapImage.style.left = e.pageX - shiftX + 'px';
    mapImage.style.top = e.pageY - 185 - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  mapImage.onmouseup = function() {
    document.onmousemove = null;
    mapImage.onmouseup = null;
  };

}

mapImage.ondragstart = function() {
  return false;
};

function getCoords(elem) {  
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}



zoomInButton.addEventListener('click', () => {
  if (mapImage.offsetWidth <= wrapper.offsetWidth * 2) {
    if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    const prevWidth = mapImage.offsetWidth;
    const prevHeight = mapImage.offsetHeight;
    mapImage.style.width = `${mapImage.offsetWidth * 1.25}px`;
    mapImage.style.height =`${mapImage.offsetHeight * 1.25}px`;
    const nextWidth = mapImage.offsetWidth;
    const nextHeight = mapImage.offsetHeight;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0;
        // scale inner objects
    innerItems.forEach(element => {
      element.style.width = `${element.offsetWidth * 1.25}px`;
      element.style.height =`${element.offsetHeight * 1.25}px`;
    });
    counter++;
    innerText.forEach(element => {
      element.style.fontSize = `${startTextFontSize * Math.pow(1.25, counter)}px`;
      if (element.classList.contains('map__place-name')) {
        element.style.left = counter * 8 + 25 + 'px';
       }
    });


    mapImage.style.left = `${leftPos - ((nextWidth - prevWidth) / 2)}px`;
    mapImage.style.top = `${topPos - ((nextHeight - prevHeight) / 2)}px`;
  }
});

zoomOutButton.addEventListener('click', () => {
  if (mapImage.offsetWidth >= wrapper.offsetWidth * 0.85 || mapImage.offsetHeight >= wrapper.offsetHeight * 0.85) {
    if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    const prevWidth = mapImage.offsetWidth;
    const prevHeight = mapImage.offsetHeight;
    mapImage.style.width = `${mapImage.offsetWidth / 1.25}px`;
    mapImage.style.height = `${mapImage.offsetHeight / 1.25}px`;
    const nextWidth = mapImage.offsetWidth;
    const nextHeight = mapImage.offsetHeight;
    const topPos = mapImage.offsetTop - 185 || 0;
    const leftPos = mapImage.offsetLeft || 0;
    mapImage.style.left = `${leftPos + ((prevWidth - nextWidth) / 2)}px`;
    mapImage.style.top = `${topPos + ((prevHeight - nextHeight) / 2)}px`;

    if (mapImage.offsetWidth <= wrapper.offsetWidth * 0.85 && mapImage.offsetHeight <= wrapper.offsetHeight * 0.85) {
      mapImage.style.width = `${wrapper.offsetWidth}px`;
      mapImage.style.height = `${wrapper.offsetHeight}px`;
      mapImage.style.top = `${(wrapper.offsetHeight - mapImage.offsetHeight) / 2}px`;
      mapImage.style.left = '0px';
      if (mapImage.offsetHeight >= wrapper.offsetHeight ) {
        mapImage.style.height = `${startHeight}px`;
        mapImage.style.width = `${startWidth}px`;
        mapImage.style.top = '0px';
        mapImage.style.left = `${(wrapper.offsetWidth - mapImage.offsetWidth) / 2}px`;
      }
    }
    // scale inner objects
    innerItems.forEach(element => {
      element.style.width = `${element.offsetWidth / 1.25}px`;
      element.style.height =`${element.offsetHeight / 1.25}px`;
    });
    counter--;
    innerText.forEach(element => {
      element.style.fontSize = `${startTextFontSize * Math.pow(1.25, counter)}px`;
      if (element.classList.contains('map__place-name')) {
        element.style.left = counter * 8 + 25 + 'px';
       }
    });

  }
});


// tooltip and intaractive icon handler
document.querySelector('.main').addEventListener('mousedown', event => {
  animalsIcon.forEach(element => {
    if (element.lastElementChild === event.target || element.lastElementChild.children[0] === event.target || element.lastElementChild.children[1] === event.target  ) return
    else {
      element.lastElementChild.style.visibility = 'hidden';
      placeIcon.forEach(element => element.src ='../../assets/icons/map/FISHKA.svg');
    }
  });
  animalsIcon.forEach(element => {
    if (event.target === element){
    element.lastElementChild.style.visibility = 'visible';
    placeIcon.forEach(item => {
      if (item.attributes.zoo.value === element.attributes.zoo.value) item.src ='../../assets/icons/map/FISHKA2.svg';
    });
    }
  });
});