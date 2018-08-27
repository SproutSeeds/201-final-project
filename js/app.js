'use strict';


var resources = [];
var users = [];

//constructor function to create resource objects
function Resource(name, url, phone, address,zipCode, shelter, food, drugAlcohol, mentalTherapy, women, men, menOverSixty, children) {
  this.name = name;
  this.url = url;
  this.phone = phone;
  this.address = address;
  this.zipCode = zipCode;

  //Booleans Below!
  this.shelter = shelter;
  this.food = food;
  this.drugAlcohol = drugAlcohol;
  this.mentalTherapy = mentalTherapy;
  this.allWomen = women;
  this.allMen = men;
  this.menOverSixty = menOverSixty;
  this.children = children;

  //Pushing into resources array
  resources.push(this);
}
//Resource Object Creations Live here
new Resource('TherapyTest Center', 'www.therapyTest.com','555-555-5555', 'some address dr.', true, false, true, true, false, true, false, true);


function User(name, gender, age, children, shelter, food, drugAlcohol, mentalTherapy) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.children = children;
  this.shelter = shelter;
  this.food = food;
  this.drugAlcohol = drugAlcohol;
  this.mentalTherapy = mentalTherapy;
}

//
function listAllResources() {
  for(var i = 0; i < resources.length; i++) {
    console.log(resources[i]);
  }
}

listAllResources();