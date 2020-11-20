

const db = firebase.firestore();
const productsRef = db.collection('products');
const storage = window.localStorage;
const selectItemstorage = storage.getItem("selectItemstorage");
var storageRef = firebase.storage().ref();
let selectElem = null;
selectElem = selectItemstorage;
console.log(selectElem);
console.log(selectItemstorage);
var imagePaths = [];
const changeBtn = document.querySelector('.productChange');

const backBtn = document.querySelector('.productBack');


const form = document.querySelector('.editProduct');
console.log(form);



productsRef.doc(selectElem).get().then(function(doc) {

    if (doc.exists) {
        elem = doc.data();
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    form.title.value = elem.title;
    form.price.value = elem.price;
    form.category.value = elem.category;
    form.delivery.checked = elem.delivery;
    form.description.value = elem.description;



}).catch(function(error) {
    console.log("Error getting document:", error);
});

//storage
const images = form.querySelectorAll('.form__imginput');

images.forEach(function(btnimg, index){
    const input = form.querySelector('input');
    const img = form.querySelector('img');
    
    input.addEventListener('change', function(){
        console.log("holis");
        // Create a reference 
        var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);
      
        var file = input.files[0]; // use the Blob or File API
        newImageRef.put(file).then(function (snapshot) {
            console.log(snapshot)
            console.log('Uploaded a blob or file!');
            imagePaths[index] = snapshot.metadata.fullPath;
        });
      });
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const editProduct = {
        title: form.title.value,
        price: Number(form.price.value),
        category: form.category.value,
        delivery: form.delivery.checked,
        description: form.description.value,
        storageImgs: imagePaths,
       
    }

    //Edit
    
    function handleThen(docRef) {
        form.title.value = '';
        //form.img.value = '';
        form.price.value = '';
        form.delivery.checked = '';
        form.category.value = '';
        form.description.value = '';
        selectedElemId = null;
    }

    function handleCatch(error) {
        console.error("Error adding document: ", error);
    }


    //si existen selectItem quiere decir que va a editar
if(selectElem){
  productsRef
  .doc(selectElem)//seleccione el producto con ese id
  .set(editProduct)//sobreescriba la info existente
  .then(handleThen) 
  .catch(handleCatch);
    //console.log("Document written with ID: ", docRef.id);
    

}
   
});



changeBtn.addEventListener("click", function () {
    form.querySelector('.form__save').classList.remove('hidden');

    
});

backBtn.addEventListener("click", function () {
  
    window.location.href = "shop.html";
});
