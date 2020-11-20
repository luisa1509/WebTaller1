const db = firebase.firestore();
const productsRef = db.collection('products');

const saveBtn = document.querySelector('.productSave');

const backBtn = document.querySelector('.productBack');

var storageRef = firebase.storage().ref();


var imagePaths = [];

//form
const form = document.querySelector('.addProduct');



form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newProduct = {
        title: form.title.value,
        price: Number(form.price.value),
        category: form.category.value,
        delivery: form.delivery.checked,
        description: form.description.value,
        storageImgs: imagePaths,
    }

    
    productsRef.add(newProduct).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        form.title.value = '';
        //form.img.value = '';
        form.price.value = '';
        form.delivery.checked = '';
        form.category.value = '';
        form.description.value = '';
        selectedElemId = null;
      
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
   
});

//storage
const images = form.querySelectorAll('.form__imginput');
images.forEach(function(group, index) {

    const input = group.querySelector('input');
    const img = group.querySelector('img');

  input.addEventListener('change', function () {
  
    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*999999999)}.png`);
  
    var file = input.files[0]; 

    var reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64 string
    reader.onload = function(e) {
      img.src = e.target.result;
    }
    newImageRef.put(file).then(function(snapshot){
        
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagePaths[index] = snapshot.metadata.fullPath;


    });


  

  
  });
});



saveBtn.addEventListener("click", function () {
    form.querySelector('.form__save').classList.remove('hidden');
 

    
});







backBtn.addEventListener("click", function () {
  
    window.location.href = "./shop.html";
});

