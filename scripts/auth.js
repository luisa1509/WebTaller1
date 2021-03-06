const auth = document.querySelector('.auth');
const authWith = auth.querySelector('.auth__with');
const authWithout = auth.querySelector('.auth__without');
const authProfileSpan = auth.querySelector('.auth__profile span');
const authSignout = auth.querySelector('.auth__signout');

let userInfo; 

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
    authWith.classList.remove('hidden');
    authWithout.classList.add('hidden');

    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        authProfileSpan.innerText = data.name;
        userInfo=data;
        userInfo.uid=user.uid;

        
        if(window.getProductsCart){
          getProductsCart();
        }

        if(window.getBag){
          getBag();
        }


        
          const btnedit = document.querySelectorAll('.product__edit');
          const btndelete = document.querySelectorAll('.product__delete');
          console.log(btnedit);
          if(userInfo.admin){
            btnedit.forEach(function(elem){
              elem.classList.remove('hidden');

            });

            btndelete.forEach(function(elem){
              elem.classList.remove('hidden');

            });
            
            //btndelete.classList.remove('hidden');
            
            
            
          }

      


      }

    
    });
  } else {
    // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
    authWith.classList.add('hidden');
    authWithout.classList.remove('hidden');
  }
});

// cerrar sesión
authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
});


