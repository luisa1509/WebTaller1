const db = firebase.firestore();
const usersRef = db.collection('users');
const register= document.querySelector('.register');

register.addEventListener('.submit',function(event){
    event.preventDefault();

    const email = register.email.value;
    const password = register.password.value;


    //registro de usuarios nuevos
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(credentials){

 const uid = credentials.user.uid;
 usersRef.doc(uid).set({
    email:email,
 }
     
 );
 

})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  

});
