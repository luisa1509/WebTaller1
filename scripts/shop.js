

const db = firebase.firestore();
const productsRef = db.collection('products');
const cartRef = db.collection('cart');
const loader = document.querySelector('.loader');
let selectedElem = null;

var storageRef = firebase.storage().ref();

const products = [];

const productsList = document.querySelector('.productslist');



let AddCartShop= [];



// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('a');
    newProduct.classList.add('product');

    const url = `producto.html?${elem.id}-${elem.title}`;
    //newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <a href="${url}">
    <img class="product__img" src="" alt="">
    </a>
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <p class="product__delivery">Envío Gratis</p>
      <button class="product__delete btn">Eliminar</button>
      <button class="product__edit btn">Editar</button>
      <button class="cartBtn btn">Comprar</button>
    </div>
    `;

    //carrito coleccion 

  const cartBtn = newProduct.querySelector('.cartBtn');

  function cartList(ListCartShop){
    
    console.log(ListCartShop);
    let productShopArray = ListCartShop;
    if(userInfo){
      const cartShop = {
        title: elem.title,
        price: Number(elem.price),
        img: elem.storageImgs[0],
      };

      productShopArray.push(cartShop); 

      productsCartList = {
        products: productShopArray
      }

    cartRef.doc(userInfo.uid).set(productsCartList).catch(function(error){
      console.log(error);
    });

    console.log(productShopArray)
    }
  }

  function getCart() {
    
    cartRef
    .doc(userInfo.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        AddCartShop = doc.data().products;
        console.log(AddCartShop);
        productsCartList = doc.data().products;
        cartList(AddCartShop);
      }else if(doc.exists && doc.data().products == undefined){
        cartList(AddCartShop);
      }else if(!doc.exists){
        cartList(AddCartShop);

      }
      
    }).catch(function (error) {
      console.log("error en el carrito", error);
    });
  }
 
  cartBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if(userInfo) {
      getCart();

    }
   
   console.log("holi");

  });




    if(elem.storageImgs) {
      elem.storageImgs.forEach(function(imageRef) {
        storageRef.child(imageRef).getDownloadURL().then(function(url) {
          // Or inserted into an <img> element:
          var img = newProduct.querySelector('.product__img');
          img.src = url;
        }).catch(function(error) {
          // Handle any errors
        });
      })
    }

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
      form.description.value = elem.description;
      form.img = elem.storageImgs[0];
      selectedElem = elem.id;
    });

    productsList.appendChild(newProduct);
  });
}

let objectsList = [];
//leer datos
function getProducts(){
  productsRef  // referencia de la colección
  .get() // pide todos los documentos de la colección
  .then((querySnapshot) => {
    objectsList = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objectsList.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objectsList);
    loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts();

// render inicial con todos los productos
renderProducts(products);




var imagePaths = [];
//subir producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  
  
  
  const newProduct = {
    title: form.title.value,
    price: form.price.value,
    category: form.category.value,
    delivery: form.delivery.checked,
    description: form.description.value,
    storageImgs: imagePaths,
  };

loader.classList.add('loader--show');

function handleThen (docRef) {
  getProducts(products);
  renderProducts(products);
  form.title.value = '';
  //form.img.value = '';
  form.price.value = '';
  form.delivery.checked = '';
  form.category.value = '';
  form.description.value = '';
  selectedElemId = null;

}
function handleCatch (error) {
  console.error("Error adding document: ", error);
}



//si existen selectedElemId quiere decir que va a editar
if(selectedElem){
  productsRef
  .doc(selectedElem)//seleccione el producto con ese id
  .set(newProduct)//sobreescriba la info existente
  .then(handleThen) 
  .catch(handleCatch);
    //console.log("Document written with ID: ", docRef.id);
    

}else{
  //si no existe es porque es un nuevo producto
  productsRef // referencia de la colección
.add(newProduct) // cree un nuevo elemento en la colección
.then(handleThen) 
.catch(handleCatch);
}
});

  


//storage

// input file single, repeated
const images = form.querySelectorAll('.form__imginput');
images.forEach(function(group, index) {
  const input = group.querySelector('input');
  const img = group.querySelector('img');
  input.addEventListener('change', function () {
  
    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*999999999)}.png`);
  
    var file = input.files[0]; // use the Blob or File API
  
    var reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64 string
    reader.onload = function(e) {
      img.src = e.target.result;
    }
  
    newImageRef.put(file).then(function(snapshot) {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagePaths[index] = snapshot.metadata.fullPath;
    });
  });
});




//filtros



//ordenamientos
//el name funciona cuando esta dentro de un form
const orderform = document.querySelector('.orderform');
orderform.addEventListener('change', function() {

  let copy = objectsList.slice();

  const orderprice = orderform.orderprice.value;

  console.log(orderprice);

  switch(orderprice){
    case 'price_asc':
      copy.sort(function(a, b){
        return a.price - b.price;
      });
      break;
    case 'price_desc':
      copy.sort(function(a, b){
        return b.price - a.price;
      });
      break;

      case 'sortAlphabetA':
        copy.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        break;
  
      case 'sortAlphabetZ':
        copy.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        break;
  
    
  }

  renderProducts(copy);
});

//filtros
    const filterform = document.querySelector('.filterform');
    filterform.addEventListener('change', function() {

      let copy = objectsList.slice();
      const namefilter = filterform.name.value;
      console.log(namefilter);
     
        if(namefilter != '') {
          copy = copy.filter(function(elem){
            if(elem.category.toLowerCase().includes(namefilter)) {
              return true;
            }
            return false;
          });
        }

   
        renderProducts(copy);
    
    });
   
    

    
     
  
    
  



