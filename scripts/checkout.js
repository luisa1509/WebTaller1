const db = firebase.firestore();
const bagRef = db.collection('bag');
const cartRef = db.collection('cart');
//const loader = document.querySelector('.loader');


const formBag = document.querySelector('.checkout');
const finishBag = document.querySelector('.productBagConfirm');

bagList = [];
let bagArray;

formBag.addEventListener('submit',function(event){
    event.preventDefault();

    const newProductBag = {

        fullname: formBag.fullname.value,
        address: formBag.address.value,
        card: Number(formBag.card.value),

        //title: form.title.value,
        //price: form.price.value,
        //category: form.category.value,
        //delivery: form.delivery.checked,
        //description: form.description.value,
        //storageImgs: imagePaths,
      };

      bagListC = {
        ordersInformation: newProductBag,
        products: bagArray,

      };

      bagRef.add(bagListC).then().catch(function (error) {
        console.error("Error adding document: ", error);
      });

});

function getProductsBag() {
    bagRef
    .doc(userInfo.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        bagList = doc.data().products;
        
      } 
    }).catch(function (error) {
      console.log("error en el carrito", error);
    });

    function getBag(){
        cartRef.doc(userInfo.uid).get().then((doc) => {
            if(doc.exists){
                doc.data().products.forEach (function (elem) {
                    bagArray=doc.data();
                });
            }
          });
    
    }
}

  

finishBag.addEventListener("click", function () {
  

  //window.location.href = "./confirmar-compra.html";
  
});
