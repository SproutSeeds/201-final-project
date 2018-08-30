'use strict';

var entryForm = document.getElementById('new-user-form');
var users = [];
var welcomeEl = document.getElementById('welcome');

function User(name, gender, age, children, shelter, drugAlcohol, food, mentalTherapy) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.children = children;
  this.shelter = shelter;
  this.drugAlcohol = drugAlcohol;
  this.food = food;
  this.mentalTherapy = mentalTherapy;
}

//Toggle "My Results" button in the nav depending on if localstorage is null
if(!localStorage.getItem('locallyStoredUser')) {
  document.getElementById('my-results-link').classList.add('hidden');
} else {
  document.getElementById('my-results-link').classList.add('unhidden');
}

//Render Welcome Message
function renderWelcome() {
  var name = JSON.parse(localStorage.getItem('username'));
  var h2El = document.createElement('h5');

  if(!name){
    h2El.textContent = 'Welcome';
    welcomeEl.appendChild(h2El);
  } else {
    h2El.textContent = (`Welcome, ${name}`);
    welcomeEl.appendChild(h2El);
  }
}

//Listener for submit form
entryForm.addEventListener('submit', handleSubmit);

//Handler
function handleSubmit(event) {
  event.preventDefault(); //prevents page from reloading

  //Set age and gender based on target values
  var gender = event.target.gender.value; //raw value - string, i.e. 'male' or 'not-say': may need to refine
  var age = event.target.age.value;//raw value - string, i.e. '18-59': may need to refine
  var children = event.target.children.value === 'yes' ? true : false;

  //Get elementID's of checkboxes
  var shelterEl = document.getElementById('shelter');
  var drugAlcoholEl = document.getElementById('drug-alcohol');
  var foodEl = document.getElementById('food');
  var mentalHealthEl = document.getElementById('mental-health');

  //Set value true if checked, set false if not checked
  var shelter = shelterEl.checked ? true : false;
  var drugAlch = drugAlcoholEl.checked ? true : false;
  var food = foodEl.checked ? true : false;
  var mentalHealth = mentalHealthEl.checked ? true : false;

  if(!shelter && !drugAlch && !food && !mentalHealth) {
    return alert('Please select at least one checkbox.');
  }

  //Confirm that Erin stores the username in localStorage as 'username'
  var name = JSON.parse(localStorage.getItem('username')); //This is optional, if we don't want to construct with name
  var newUser = new User(name, gender, age, children, shelter, drugAlch, food, mentalHealth);
  users.push(newUser);

  setLocalStorage(newUser);

  window.location = 'my-results.html';
}

//This function adds a user object to localStorage under the key "locallyStoredUser"
function setLocalStorage(user) {
  localStorage.setItem('locallyStoredUser', JSON.stringify(user));
}

renderWelcome();