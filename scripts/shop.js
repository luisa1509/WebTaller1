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

const db = firebase.firestore();
const productsRef = db.collection('products');
const loader = document.querySelector('.loader');
let selectedElemId = null;



const products = [
  {
    title: 'Wacom Cintiq Pro 32',
    img: './../imgShop/Wacom Cintiq Pro 32-1.png',
    price: 499900,
    mail: 'Envio gratis',
    description: 'Un monitor interactivo de ultra alta definición con función multitáctil, diseñado para profesionales de la creación.',
    category: 'monitor',
    especifics: 'Con 32 pulg. de resolución 4K (3840 x 2160 pixeles) a tu disposición y una soberbia precisión del color (98 % de Adobe® RGB), sumérgete en cada detalle de tus audaces obras, ya se trate de modelado 3D o ilustración para el desarrollo de videojuegos.',
  },
  {
    title: 'Wacom Cintiq Pro 24',
    img: './../imgShop/Wacom Cintiq Pro 24-1.png',
    price: 679900,
    mail: '',
    description: 'Un monitor interactivo de ultra alta definición con función multitáctil, diseñado para profesionales de la creación.',
    category: 'monitor',
    especifics: 'Resolución de 4K (3840 x 2160 pixeles) en una pantalla LCD de 24 pulg. con una extraordinaria precisión de color (99 % de Adobe® RGB). Podrás ver hasta el último detalle de tu obra magistral y tus proyectos fotográficos o de diseño.',
  },
  {
    title: 'Wacom Cintiq Pro 16',
    img: './../imgShop/Wacom Cintiq Pro 16-1.png',
    price: 649900,
    mail: '',
    description: 'Un monitor interactivo de ultra alta definición con funciones multitáctiles diseñado para profesionales de la creación.',
    category: 'monitor',
    especifics: 'Tu trabajo está hecho para verlo. Con una impresionante resolución de 4K (3840 x 2160) y una precisión de color excepcional, no podrás quitar la vista de encima de la pantalla.',
  },
  {
    title: 'Wacom Cintiq Pro 13',
    img: './../imgShop/Wacom Cintiq Pro 13-1.png',
    price: 699900,
    mail: '',
    description: 'Un monitor interactivo de ultra alta definición con funciones multitáctiles diseñado para profesionales de la creación.',
    category: 'monitor',
    especifics: 'Wacom Cintiq Pro 13 es justo lo que necesitas si prefieres trabajar en un lienzo compacto. Es un dispositivo más compacto y ligero que resulta idea para bosquejar y dibujar',
  },
  {
    title: 'Cintiq 22HD',
    img: './../imgShop/Cintiq 22HD-1.png',
    price: 699900,
    mail: '',
    description: 'Un monitor interactivo de alta definición diseñado para profesionales de la creación.',
    category: 'monitor',
    especifics: 'Trabaja de manera más rápida y más sencilla con ExpressKey™ personalizables, Touch Strips y entradas de tableta con la función multitáctil que te permiten un acceso rápido con un solo toque a los atajos favoritos de tu teclado.',
  },
  {
    title: 'Cintiq 13HD',
    img: './../imgShop/Cintiq 13HD-1.png',
    price: 699900,
    mail: '',
    description: 'Un monitor interactivo delgado, compacto y de alta definición.',
    category: 'monitor',
    especifics: 'Obtén todas las innovaciones de nuestras pen tablets profesionales, ahora con la capacidad de trabajar directamente en la pantalla de este Cintiq 13HD compacto. Gran color y resolución, ergonomía profesional y control de sensibilidad a la presión, todo junto en un diseño asequible.',
  },
  {
    title: 'Wacom Cintiq',
    img: './../imgShop/Wacom Cintiq-1.png',
    price: 699900,
    mail: '',
    description: 'Wacom Cintiq combina lápiz digital y pantalla para ofrecer una experiencia creativa sumamente natural que permita a tu obra alcanzar nuevos niveles de excelencia.',
    category: 'monitor',
    especifics: 'El lápiz Wacom Pro Pen 2 y las pantallas Wacom Cintiq (disponibles en los tamaños de 15.6" y 21.5") se alían para que tu sesión creativa sea cómoda y productiva. La pantalla presenta una lámina mate para evitar reflejos que puedan distraerte. La resolución Full HD te brinda una nitidez extraordinaria, para visualizar hasta el último detalle de tu obra. El paralaje reducido también redunda en un control completo, ya que tu cursor se sitúa donde deseas. Todo esto se combina para que dibujar en una Wacom Cintiq aporte una sensación tan natural como dibujar sobre papel.',
  },
  {
    title: 'Wacom MobileStudio Pro 13: i5 64 GB',
    img: './../imgShop/Wacom MobileStudio Pro-1-2.png',
    price: 699900,
    mail: '',
    description: 'Ideal para bosquejos, ilustraciones, diseño gráfico y edición de imágenes.',
    category: 'computador',
    especifics: 'Intel® CoreTM i5, SSD DE 64 GB, DDR3 DE 4 GB, Intel® IrisTM Graphics 550',
  },
  {
    title: 'Wacom One',
    img: './../imgShop/Wacom One-1.png',
    price: 699900,
    mail: '',
    description: 'Un monitor interactivo creativo de alta definición diseñado para creativos aficionados y pensadores visuales',
    category: 'monitor',
    especifics: 'Incluye todos los elementos esenciales para estimular tu vida digital: la sensación natural del lápiz en la pantalla de 13.3", el software creativo incluido o incluso la capacidad de conectarlo a ciertos dispositivos Android. Y también es compatible con las marcas de lápices líderes. Abre un nuevo abanico de posibilidades con Wacom One.',
  },
  {
    title: 'Wacom MobileStudio Pro 16: i5 256 GB',
    img: './../imgShop/Wacom MobileStudio Pro-2-3.png',
    price: 699900,
    mail: '',
    description: 'Más espacio para dibujar, crear arte conceptual detallado, pintar y esculpir en 3D, trabajar con aplicaciones CAD en 3D, realizar animaciones y editar y retocar imágenes avanzadas.',
    category: 'computador',
    especifics: 'Intel® CoreTM i5, SSD DE 256 GB, DDR3 DE 8 GB Tarjeta gráfica • NVIDIA® Quadro® M600M con GDDR5 VRAM de 2 GB',
  },
  {
    title: 'Bamboo Sketch',
    img: './../imgShop/Bamboo Sketch-1.png',
    price: 699900,
    mail: '',
    description: 'Un lápiz digital con sensibilidad a la presión para bosquejar y concebir ideas tanto en el iPad como en el iPhone.',
    category: 'lapiz',
    especifics: 'De tu mente a tu dispositivo iOS: Bamboo Sketch es un lápiz digital de punta fina para bosquejar y dibujar tanto en el iPad como en el iPhone. Conéctalo mediante Bluetooth®, enlázalo con tu aplicación compatible de Wacom favorita y ponte manos a la obra.',
  },
  {
    title: 'Bamboo Fineline',
    img: './../imgShop/Bamboo Fineline-1.png',
    price: 699900,
    mail: '',
    description: 'Un lápiz digital inteligente con sensibilidad a la presión diseñado para ofrecer una sensación de escritura natural en dispositivos táctiles iOS.',
    category: 'lapiz',
    especifics: 'Qué nunca se pierdan tus buenas ideas. Bamboo Fineline es un lápiz digital de punta fina especialmente diseñado para escribir y tomar notas con naturalidad en iPad e iPhone.',
  },
  {
    title: 'Bamboo Solo',
    img: './../imgShop/Bamboo Solo-1.png',
    price: 699900,
    mail: '',
    description: 'Un stylus esencial que te permite pulsar, escribir y dibujar con fluidez en la pantalla táctil de tu tableta, smartphone o computadora.',
    category: 'lapiz',
    especifics: 'Bamboo Solo es el stylus esencial para pulsar, escribir y dibujar agradablemente en todos los dispositivos con pantalla táctil.',
  },
  {
    title: 'Bamboo Tip',
    img: './../imgShop/Bamboo Tip-1.png',
    price: 699900,
    mail: '',
    description: 'Un lápiz de punta fina que te permite redactar notas con la máxima fidelidad, justo como deseas, en los dispositivos iPhone, iPad y Android.',
    category: 'lapiz',
    especifics: 'Solo tienes que encender y ponerte a escribir. Bamboo Tip es un lápiz digital de punta fina con el que podrás plasmar tus ideas rápidamente en tus dispositivos iPhone, iPad y Android.',
  },
  {
    title: 'Wacom MobileStudio Pro 13: i5 128 GB',
    img: './../imgShop/Wacom MobileStudio Pro-1-2.png',
    price: 699900,
    mail: '',
    description: 'Ideal para bosquejos, ilustraciones, diseño gráfico y edición de imágenes.',
    category: 'computador',
    especifics: 'Intel® CoreTM i5, SSD DE 128 GB, DDR3 DE 8 GB, Intel® IrisTM Graphics 550',
  },
  {
    title: 'Bamboo Ink',
    img: './../imgShop/Bamboo Ink-1.png',
    price: 699900,
    mail: '',
    description: 'Un lápiz digital inteligente para Windows Ink que ofrece nuevas e ingeniosas maneras de capturar ideas.',
    category: 'lapiz',
    especifics: '¿Necesitas una herramienta intuitiva para escribir palabras en la pantalla? Bamboo Ink es la opción más natural. Este lápiz digital es la forma más dinámica de capturar tus pensamientos, redactar notas y anotar documentos.',
  },
  {
    title: 'Wacom MobileStudio Pro 16: i7 512 GB',
    img: './../imgShop/Wacom MobileStudio Pro-2-3.png',
    price: 699900,
    mail: '',
    description: 'Máxima potencia para dibujar, crear arte conceptual detallado, pintar y esculpir en 3D, trabajar con aplicaciones CAD en 3D, realizar animaciones y editar y retocar imágenes avanzadas.',
    category: 'computador',
    especifics: ' Intel® CoreTM i7, SSD DE 512 GB, DDR3 DE 16 GB, Tarjeta gráfica • NVIDIA® Quadro® M1000M con GDDR5 VRAM de 4 GB, Cámara 3D Intel® RealSenseTM y software para escanear',
  },
  {
    title: 'Wacom Intuos Pro',
    img: './../imgShop/Wacom One-1.png',
    price: 699900,
    mail: '',
    description: 'Una pen tablet profesional con función multi-touch disponible en los tamaños pequeño, mediano y grande.',
    category: 'tablet',
    especifics: 'Wacom Intuos Pro te ofrece el control creativo más natural hasta la fecha.Combinado con el ultrasensible lápiz Wacom Pro Pen 2, nuestra nueva y elegante tableta tiene un aspecto y una sensación formidables. ¿Te gusta empezar tus proyectos en papel? El modelo Paper Edition te permite convertir automáticamente tus bosquejos en papel a archivos digitales mientras dibujas. Justo lo que necesitas para tu próximo logro creativo.',
  },
  {
    title: 'Wacom MobileStudio Pro 13: i7 256 GB',
    img: './../imgShop/Wacom MobileStudio Pro-1-2.png',
    price: 699900,
    mail: '',
    description: 'Un gran acierto para dibujo, edición de imágenes y retoque, arte conceptual detallado, diseño gráfico y animación en 2D.',
    category: 'computador',
    especifics: 'Intel® CoreTM i7, SSD DE 256 GB,DDR3 DE 8 GB, Intel® IrisTM Graphics 550',
  },
  {
    title: 'Wacom Intuos',
    img: './../imgShop/Wacom Intuos-1.png',
    price: 699900,
    mail: '',
    description: 'Una pen tablet con un lápiz que ofrece una experiencia simplemente fabulosa. Más sencillo, imposible.',
    category: 'tablet',
    especifics: 'Wacom está diseñado para dar vida a tus ideas más exóticas, con un lápiz ligero y ultrapreciso, además de software gratuito descargable* acorde a tu estilo.',
  },
 // {
    //title: '',
    //img: './../imgShop/Wacom One-1.png',
    //price: 699900,
    //mail: '',
    //description: '',
    //category: '',
    //especifics: '',
  //},
];

const productsList = document.querySelector('.productslist');


// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product');

    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <p class="productslist__mail">${elem.mail}</p>
      <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
    </div>
    `;

    // seleccionamos el botón "Eliminar" que se acaba de crear en este elemento
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click',function(){
      loader.classList.add('loader--show');
      productsRef // referencia de la colección
      .doc(elem.id) // referencia de un documento específico en esa colección
      .delete() // elimine el documento asociado a esa referencia
      .then(function() {
        // debería entrar si todo sale bien
        console.log("Document successfully deleted!");
        getProducts(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
      })
      .catch(function(error) {
        // debería entrar si ocurre algún error
        console.error("Error removing document: ", error);
      });
    });

    // seleccionar el botón de editar
    // al hacer click al botón de editar
    const editBtn = newProduct.querySelector('.product__edit');
    editBtn.addEventListener('click', function() {
      form.title.value = elem.title;
      form.price.value = elem.price;
      form.mail.value = elem.mail;
      selectedElemId = elem.id;
    });

    productsList.appendChild(newProduct);
  });
}

//leer datos
function getProducts(){
  productsRef  // referencia de la colección
  .get() // pide todos los documentos de la colección
  .then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);
    loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts();

// render inicial con todos los productos
//renderProducts(products);

const filterBtn = document.querySelector('.filterbtn');
filterBtn.addEventListener('click', function () {
  // función slice para tomar una sección de la lista
  // const filtered = products.slice(1, 3);

  // función filter para filtrar con una condición específica
  const filtered = products.filter(function (elem) {
    if(elem.price > 650000) {
      return true;
    } else {
      return false;
    }
  });

  // render solo con los productos filtrados
  //renderProducts(filtered);
});




//subir producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value,
    //category: form.category.value,
  };

loader.classList.add('loader--show');
//si existen selectedElemId quiere decir que va a editar
if(selectedElemId){
  productsRef
  .doc(selectedElemId.id)//seleccione el producto con ese id
  .set(newProduct)//sobreescriba la info existente
  .then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
    getProducts();
    form.title.value = '';
    form.img.value = '';
    form.price.value = '';
    form.mail.value = '';
    selectedElemId = null;

  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
});

}else{
  //si no existe es porque es un nuevo producto
  productsRef // referencia de la colección
.add(newProduct) // cree un nuevo elemento en la colección
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  products.push(newProduct);

  renderProducts(products);
}



});



