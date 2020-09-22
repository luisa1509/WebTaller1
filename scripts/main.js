

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



