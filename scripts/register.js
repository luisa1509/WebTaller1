const db = firebase.firestore();
const usersRef = db.collection('users');
const register = document.querySelector('.register');

register.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = register.name.value;
  const email = register.email.value;
  const password = register.password.value;


  //registro de usuarios nuevos
  firebase.auth().createUserWithEmailAndPassword( email, password)
    .then(function (credentials) {

      console.log(credentials);
      console.log(credentials.user.uid)

      const uid = credentials.user.uid;
      usersRef.doc(uid).set({
        name: name,
        email: email,
      })
        .then(function () {
          window.location.href = 'shop.html';
        });


    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);

      register.querySelector('.form__error').classList.remove('hidden');
      // ...
    });


});
