var firebaseConfig = {
  apiKey: "AIzaSyAUecKO45mFL5q7JNDkekeRa7YOFsZY5NM",
  authDomain: "shop-wacom-js-project.firebaseapp.com",
  databaseURL: "https://shop-wacom-js-project.firebaseio.com",
  projectId: "shop-wacom-js-project",
  storageBucket: "shop-wacom-js-project.appspot.com",
  messagingSenderId: "891183012311",
  appId: "1:891183012311:web:d58c75f0410104f239d392",
  measurementId: "G-HBY8JKC8SS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//var db = firebase.firestore();


const products = [
  {
    title: 'Wacom Cintiq Pro 32',
    img: './../imgShop/Wacom Cintiq Pro 32-1.png',
    price: 499900,
    description: 'Un monitor interactivo de ultra alta definición con función multitáctil, diseñado para profesionales de la creación.',
  },
  {
    title: 'Wacom Cintiq Pro 24',
    img: './../imgShop/Wacom Cintiq Pro 24-1.png',
    price: 679900,
    description: 'Un monitor interactivo de ultra alta definición con función multitáctil, diseñado para profesionales de la creación.',
  },
  {
    title: 'Celular Motorola Moto G8 Plus 64gb',
    img: 'https://http2.mlstatic.com/D_NQ_NP_846737-MCO43497294331_092020-V.webp',
    price: 649900,
    description: '',
  },
  {
    title: 'Motorola Moto G8 Power 4g',
    img: 'https://http2.mlstatic.com/D_NQ_NP_725226-MCO42143648422_062020-V.webp',
    price: 699900,
    description: '',
  },
];

const productsList = document.querySelector('.productslist');

// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('section');
    newProduct.classList.add('product');
  
    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="productslist__description">${elem.description}</p>
      <p class="product__price">$ ${elem.price}</p>
    </div>
    `;
  
    productsList.appendChild(newProduct);
  });
}


// render inicial con todos los productos
renderProducts(products);