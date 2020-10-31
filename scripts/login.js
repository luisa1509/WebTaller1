
const login = document.querySelector('.login');

login.addEventListener('submit', function (event) {
  event.preventDefault();


  const email = login.email.value;
  const password = login.password.value;


  //ingreso usuarios
  firebase.auth().signInWithEmailAndPassword( email, password)
    .then(function () {
          window.location.href = 'shop.html';

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);

      login.querySelector('.form__error').classList.remove('hidden');
      // ...
    });


});
