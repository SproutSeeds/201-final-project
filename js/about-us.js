'use strict';

if(!localStorage.getItem('locallyStoredUser')) {
  document.getElementById('my-results-link').classList.add('hidden');
} else {
  document.getElementById('my-results-link').classList.add('unhidden');
}