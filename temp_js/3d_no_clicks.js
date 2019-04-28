'use strict';

var milky_way;

var num_stars = 500;
var star_array = [];
var star_types = [
  0, 1, 1, 2, 2, 2, 3, 3, 4, 4,
  5, 5, 5, 6, 6, 6, 6, 6, 6, 6,
  7, 7, 7, 7, 7, 7, 7, 7, 8, 8,
  8, 8, 8, 8, 8, 8, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11,
  11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
  11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 13
];
var planet_types = [
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  6, 6, 7, 7, 7, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 9, 9, 9, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11
];
var star_data_image_url = ['../assets/star_pictures/1_blackhole.jpg', '../assets/star_pictures/2_neutron.jpg', '../assets/star_pictures/3_white_dwarf.jpg', '../assets/star_pictures/4_supernova_i.jpg', '../assets/star_pictures/5_supernova_ii.jpg', '../assets/star_pictures/6_red_giant.jpg', '../assets/star_pictures/7_main_i.jpg', '../assets/star_pictures/8_main_ii.jpg', '../assets/star_pictures/9_main_iii.jpg', '../assets/star_pictures/10_red_dwarf_1.jpg', '../assets/star_pictures/11_red_dwarf_2.jpg', '../assets/star_pictures/12_red_dwarf_3.jpg', '../assets/star_pictures/13_blue_giant.jpg', '../assets/star_pictures/14_dyson_sphere.jpg'];
var star_data_name = ['Black Hole', 'Neutron Star', 'White Dwarf', 'Supernova-I', 'Supernova-II', 'Red Giant', 'Main Sequence I', 'Main Sequence II', 'Main Sequence III', 'Red Dwarf I', 'Red Dwarf II', 'Red Dwarf III', 'Blue Giant', 'Dyson Sphere'];
var star_data_minage = [.1, 5, 7, .1, .1, .1, 2, 3, 4, 2, 2, 2, .1];
var star_data_maxage = [13, 12, 13, .1, .1, .1, 6, 7, 8, 8, 10, 12, .5];
var star_data_chance_planets = [0, .01, .05, 0, 0, .4, .9, .9, .9, .9, .9, .9, .05];
var planet_data_image_url = ['', '', '', '', '', '', '', '', '', '', '', ''];
var planet_data_name = ['Hot Giant', 'Rocky Dwarf', 'Hot Rock', 'Sub Terra', 'Terra', 'Super Terra', 'Water World', 'Gas Giant Moon', 'Gas Giant', 'Super Jovian', 'Ice Giant', 'Ice Dwarf'];
var planet_data_chance_life = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];

// ================================================
// Constructor
// ================================================

function Build_star() {
  this.planets = [],
  star_array.push(this);
}

function Build_planet(index) {
  star_array[index].planets.push(this);
}

var life_drake = .75;
var intel_drake = .75;
// get num_stars from local storage
// get life_drake from local storage
// get intel_drake from local storage

// populate star_Array objects

for (var i = 0; i < num_stars; i++) {
  var s_type = Math.floor(Math.random() * 13);
  new Build_star();
  star_array[i].image_url = s_type;
  star_array[i].type = s_type;
  star_array[i].name = star_data_name[s_type];
  star_array[i].age = ((star_data_maxage[s_type] - star_data_minage[s_type]) * Math.random()) + star_data_minage[s_type];
  star_array[i].x = randomized_coordinates()[0];
  star_array[i].y = randomized_coordinates()[1];
  star_array[i].z = randomized_coordinates()[2];

  var chance = Math.random();
  if (chance < star_data_chance_planets[s_type]) {
    var num_planets = Math.floor(Math.random() * 10);
    for (var j = 0; j < num_planets; j++) {
      var p_type = Math.floor(Math.random() * 12);
      new Build_planet(i); // image_url, type, name
      star_array[i].planets[j].image_url = planet_data_image_url[p_type];
      star_array[i].planets[j].type = p_type;
      star_array[i].planets[j].name = planet_data_name[p_type];
      star_array[i].planets[j].age = star_array[i].age;
      var chance_of_life = Math.random() / life_drake;
      if (chance_of_life < planet_data_chance_life[p_type]) {
        star_array[i].life = 1;
      }
      var chance_of_intel = Math.random() / intel_drake;
      if (star_array[i].age > 4) {
        if (chance_of_intel > 1) {
          star_array[i].intel = 1;
        }
      }
    }
  }
}

console.log(star_array);


//===============================
// p5 Canvas
//===============================
var img;
var background_img;
var images = [];

function preload() {
  for (var i = 0; i < star_data_image_url.length; i++) {
    img = loadImage(star_data_image_url[i]);
    images.push(img);
  }
  background_img = loadImage('../assets/star_pictures/Milky_Way-view3.jpg');

}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  console.log(background_img);
  background(0);

  push();
  texture(background_img);
  textureMode(NORMAL);
  translate(0, 0, -1100);
  plane(5000);
  pop();

  ambientMaterial(250);
  directionalLight(255, 255, 255, 0, 1, -2);
  noStroke();

  for (var i in star_array) {
    push();
    translate(star_array[i].x, star_array[i].y, star_array[i].z);

    //curently rendering spheres, to render images instead, uncomment the following three lines and comment out the spheres line:
    // texture(images[star_array[i].image_url]);
    // textureMode(NORMAL);
    // plane(30);
    sphere(7);
    pop();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {

}


function randomized_coordinates() {
  var random_x = Math.floor(((Math.random() * (window.innerWidth - 20)) - (window.innerWidth / 2) + 10));
  var random_y = Math.floor(((Math.random() * (window.innerHeight - 20)) - (window.innerHeight / 2) + 10));
  var random_z = Math.floor(Math.random() * -1000);

  var coordinates = [random_x, random_y, random_z];
  return coordinates;
}
