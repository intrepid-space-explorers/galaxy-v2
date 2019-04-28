'use strict';

var input_form = document.getElementById('star_data_form');
var submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', submit_handler);

function submit_handler(event){
  // event.preventDefault();
  var number_of_stars = Math.floor(document.getElementById('number_of_stars').value);
  var percent_of_possible_life = (document.getElementById('%of_pos_life_on_planet').value) / 100;
  var percent_of_intelligent_life = (document.getElementById('%of_intelligent_life').value) / 100;


  localStorage.setItem('number_of_stars', number_of_stars);
  localStorage.setItem('%of_pos_life_on_planet', percent_of_possible_life);
  localStorage.setItem('%of_intelligent_life', percent_of_intelligent_life);
}
