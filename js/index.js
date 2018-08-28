'use strict';
var nameSubmit = document.getElementById('name-form');
console.log(nameSubmit);

nameSubmit.addEventListener('submit', nameFormSubmission, false);

function nameFormSubmission(event) {
  var formName = event.target.name.value;
  console.log(formName);
  localStorage.setItem('username', JSON.stringify(formName));
  event.preventDefault();
}

