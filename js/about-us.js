'use strict';

if(localStorage.getItem('locallyStoredUser') === null) {
  document.getElementById('my-results-link').classList.add('hidden');
}