'use strict';

//Hide "My Results" button in nav if there is nothing in localstorage
if(localStorage.getItem('locallyStoredUser') === null) {
  document.getElementById('my-results-link').classList.add('hidden');
} else {
  document.getElementById('my-results-link').classList.remove('hidden');
}

//Event for submitting name
var nameSubmit = document.getElementById('name-form');

nameSubmit.addEventListener('submit', nameFormSubmission, false);

function nameFormSubmission(event) {
  event.preventDefault();
  var formName = event.target.name.value;
  localStorage.setItem('username', JSON.stringify(formName));
  window.location = 'get-started.html';
}

