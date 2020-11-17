
    const db = firebase.firestore();
    const cartRef = db.collection('cart');
    //const loader = document.querySelector('.loader');
    let storageRef = firebase.storage().ref();
    const cartproductsList = document.querySelector('.cartProducts');
    
    // creación de nuevos productos a partir de la lista
    function renderProductsCarts (listc) {
      cartproductsList.innerHTML = '';
      listc.forEach(function (elem) {
        console.log(elem.title);
        const newProductCart = document.createElement('section');

        newProductCart.classList.add('CartOrder');
    
        newProductCart.innerHTML = `
     
        <div class="productCart__info">
          <img class="productCart__img" src="" alt="">
          <h3 class="productCart__title">${elem.title}</h3>
          <p class="productCart__price">$ ${elem.price}</p>
          <p class="productCart__delivery">Envío Gratis</p>
          <button class="cartBtn btn">Comprar</button>
        </div>
        `;


        //imagen del producto
        storageRef.child(elem.img).getDownloadURL().then(function (url) {
            var img = newProductCart.querySelector('img');
            img.src = url;
        }).catch(function (error) {
            // Handle any errors
        });

        cartproductsList.appendChild(newProductCart);

    
      });
    }

    let productsCartShopArray = [];
    function getProductsCart() {
      
    cartRef.doc(userInfo.uid).get().then((doc) => {
      productsCartShopArray = [];
        if (doc.exists) {
            doc.data().products.forEach(function (elem) {
              productsCartShopArray.push(elem);
            });
        }


        renderProductsCarts(productsCartShopArray);
    });
}



