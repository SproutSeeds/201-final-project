'use strict';

if(localStorage.getItem('locallyStoredUser') === null) {
  document.getElementById('my-results-link').classList.add('hidden');
}
var nameSubmit = document.getElementById('name-form');

nameSubmit.addEventListener('submit', nameFormSubmission, false);

function nameFormSubmission(event) {
  event.preventDefault();
  var formName = event.target.name.value;
  localStorage.setItem('username', JSON.stringify(formName));
  window.location = 'get-started.html';
}

