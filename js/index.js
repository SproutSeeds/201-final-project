'use strict';
var nameSubmit = document.getElementById('name-form');
console.log(nameSubmit);

nameSubmit.addEventListener('submit', nameFormSubmission, false);

function nameFormSubmission(event) {
  event.preventDefault();
  var formName = event.target.name.value;
  console.log(formName);
  localStorage.setItem('username', JSON.stringify(formName));
  window.location = 'get-started.html';
}

