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

  users.push(this);
}

// new User('TestUser', 'male', '18-59', false, )


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

  var namePlaceholder = 'nameTest'; //TESTING ONLY: name placeholder

  new User(namePlaceholder/*<<this var for testing*/, gender, age, children, shelter, drugAlch, food, mentalHealth);
}