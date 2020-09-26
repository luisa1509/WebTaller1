

const carrousel = document.querySelector('.gallery_carrousel');
const carrouselStripe = document.querySelector('.gallery_carrousel__stripe');
let current = 0;

carrousel.addEventListener('click', function () {
  current++;
  if(current >= carrouselStripe.children.length) {
    current = 0;
  }
  const width = carrousel.clientWidth;
  carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
});

const carrouselSlider = document.querySelector('.gallery_carrousel__slider');
carrouselSlider.setAttribute('max', carrouselStripe.children.length - 1);
carrouselSlider.addEventListener('input', function() {
  const width = carrousel.clientWidth;
  const value = carrouselSlider.value;
  carrouselStripe.style.transform = 'translate(-' + (width * value) + 'px, 0px)';
});



//var options = {
//  width: 800,
  //zoomWidth: 500,
 // offset: { vertical: 0, horizontal: 10 }
//};
//new ImageZoom(document.querySelector('.pencil_description'), options);


const slider = document.querySelector('.pencil_compare__input');
const img = document.querySelector('.pencil_compare__images img:last-child');

function handleSlider () {
  //console.log('hola', slider.value);
  // img.style.opacity = slider.value;
  img.style.width = (slider.value * 100) + '%';
}
slider.addEventListener('input', handleSlider);

