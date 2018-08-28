'use strict';

var entryForm = document.getElementById('new-user-form');
var users = [];

function User(name, gender, age, children, shelter, drugAlcohol, food, mentalTherapy) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.children = children;
  this.shelter = shelter;
  this.drugAlcohol = drugAlcohol;
  this.food = food;
  this.mentalTherapy = mentalTherapy;

  // users.push(this);//moved this to the event handler
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

  //Confirm that Erin stores the username in localStorage as 'username'
  var name = localStorage.getItem('username');
  var newUser = new User(name, gender, age, children, shelter, drugAlch, food, mentalHealth);
  users.push(newUser);

  setLocalStorage(newUser);
  retreiveLocalStorage();//TESTING: This function call is placed here for testing purposes only.
}

//This function adds a user object to localStorage under the key "locallyStoredUser"
function setLocalStorage(user) {
  localStorage.setItem('locallyStoredUser', JSON.stringify(user));
}

//This function retreives all the form info from local storage and makes a new User object that we can work with.
function retreiveLocalStorage() {
  var retreivedUserInfo = JSON.parse(localStorage.getItem('locallyStoredUser')); //Set new var to parsed local data

  //obtain all property values
  var gender = retreivedUserInfo.gender;
  var age = retreivedUserInfo.age;
  var children = retreivedUserInfo.children;
  var shelter = retreivedUserInfo.shelter;
  var drugAlch = retreivedUserInfo.drugAlcohol;
  var food = retreivedUserInfo.food;
  var mentalHealth = retreivedUserInfo.mentalTherapy;

  //We will probably want to return this newUserObj at the end of function
  var newUserObj = new User('localTest', gender, age, children, shelter, drugAlch, food, mentalHealth);//create a new User object
  users.push(newUserObj);
}