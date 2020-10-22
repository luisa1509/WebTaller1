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

var db = firebase.firestore();


const products = [
  {
    title: 'Celular Motorola Moto One Macro',
    img: 'https://http2.mlstatic.com/D_NQ_NP_671655-MCO43438392203_092020-V.webp',
    price: 499900,
    description: '',
  },
  {
    title: 'Celular Motorola One Action Color Blanco',
    img: 'https://http2.mlstatic.com/D_NQ_NP_760318-MCO42908273986_072020-V.webp',
    price: 679900,
    description: '',
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