'use strict';

var users = [];

function User(name, gender, age, children, shelter, food, drugAlcohol, mentalTherapy) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.children = children;
  this.shelter = shelter;
  this.food = food;
  this.drugAlcohol = drugAlcohol;
  this.mentalTherapy = mentalTherapy;

  users.push(this);
}

// new User('TestUser', 'male', '18-59', false, )