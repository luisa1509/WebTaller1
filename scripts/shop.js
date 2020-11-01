

const db = firebase.firestore();
const productsRef = db.collection('products');
const loader = document.querySelector('.loader');
let selectedElem = null;



const products = [];

const productsList = document.querySelector('.productslist');


// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('a');
    newProduct.classList.add('product');

    const url = `producto.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <p class="product__delivery">Envío Gratis</p>
      <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
    </div>
    `;

  //envio
  const deliveryFree = newProduct.querySelector('.product__delivery');
  
  if(form.delivery.checked){
    loader.classList.add('.product__delivery');
  }
    
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
      form.delivery.checked = elem.delivery;
      form.category.value = elem.category;
      selectedElem = elem.id;
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
renderProducts(products);

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

  var storageRef = firebase.storage().ref;
  //referencia
  //var newImageRef = storageRef.child();
  //var file = form.imageFile.files[0]; // use the Blob or File API
  //newImageRef.put(file).then(function(snapshot) {
  //console.log('Uploaded a blob or file!');
  //});

  
  
  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value,
    category: form.category.value,
    delivery: form.delivery.checked,
  };

loader.classList.add('loader--show');
//si existen selectedElemId quiere decir que va a editar
if(selectedElem){
  productsRef
  .doc(selectedElem)//seleccione el producto con ese id
  .set(newProduct)//sobreescriba la info existente
  .then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
    getProducts(products);
    renderProducts(products);
    form.title.value = '';
    //form.img.value = '';
    form.price.value = '';
    form.delivery.checked = '';
    form.category.value = '';
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
  getProducts(products)
}



});



