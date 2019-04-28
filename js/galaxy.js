'use strict';

var data_window_open = false;
var planet_window_open = false;
var life_counter = 0;
var intel_counter = 0;
var star_array = [];

// type, img_url, name, age, planets[], has_planets, scan_status
var star_types = [
  0, 1, 1, 2, 2, 2, 3, 3, 4, 4, // 0 black hole
  5, 5, 6, 6, 6, 6, 6, 6, 6, 6, // 1 nuetron star
  7, 7, 7, 7, 7, 7, 7, 7, 8, 8, // 2 white dwarf
  8, 8, 8, 8, 8, 8, 9, 9, 9, 9, // 3 supernova i
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9, // 4 supernova ii
  9, 9, 9, 9, 9, 9, 9, 10, 10, 10, // 5 red giant
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 6 7 8 main i, ii, iii
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11, // 9 10 11 red dwarf 1, 2, 3
  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, // 12 blue giant
  11, 11, 11, 11, 11, 11, 11, 11, 11, 12 // 13 dyson shpere
];
var planet_types = [
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, // 0 hot giant
  1, 1, 1, 1, 1, 2, 2, 2, 2, 2, // 1 hot rocky
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, // 2 rocky dwarf
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, // 3 4 5 sub, terra, super
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, // 6 water world
  6, 6, 7, 7, 7, 8, 8, 8, 8, 8, // 7 gas giant moon
  8, 8, 8, 8, 8, 8, 8, 8, 8, 8, // 8 gas giant
  8, 8, 8, 8, 8, 9, 9, 9, 10, 10, // 9 super jovian
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 10 ice giant
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 11 ice dwarf
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11 // 12 dyson shpere
];
var star_data_image_url = ['../assets/star_pictures/s0_blackhole.png', '../assets/star_pictures/s1_neutron.png', '../assets/star_pictures/s2_white_dwarf.png', '../assets/star_pictures/s3_supernova_i.png', '../assets/star_pictures/s4_supernova_ii.png', '../assets/star_pictures/s5_red_giant.png', '../assets/star_pictures/s6_main_i.png', '../assets/star_pictures/s7_main_ii.png', '../assets/star_pictures/s8_main_iii.png', '../assets/star_pictures/s9_red_dwarf_1.png', '../assets/star_pictures/s10_red_dwarf_2.png', '../assets/star_pictures/s11_red_dwarf_3.png', '../assets/star_pictures/s12_blue_giant.png', '../assets/star_pictures/s13_dyson_sphere.png'];
var star_data_name = ['Black Hole', 'Neutron Star', 'White Dwarf', 'Supernova-I', 'Supernova-II', 'Red Giant', 'Main Sequence I', 'Main Sequence II', 'Main Sequence III', 'Red Dwarf I', 'Red Dwarf II', 'Red Dwarf III', 'Blue Giant', 'Dyson Sphere'];
var star_data_minage = [.1, 5, 7, .1, .1, 6, 2, 3, 4, 2, 2, 2, .2, 4];
var star_data_maxage = [13, 12, 13, .1, .1, 7, 6, 7, 8, 8, 10, 12, .5, 12];
var star_data_chance_planets = [0, .01, .05, 0, 0, .4, .9, .9, .9, .9, .9, .9, .05, 1];
var planet_data_image_url = ['../assets/star_pictures/p0_hot_giant.jpg', '../assets/star_pictures/p1_hot_rocky.jpg', '../assets/star_pictures/p2_rocky_dwarf.jpg', '../assets/star_pictures/p3_sub_terra.jpg', '../assets/star_pictures/p4_terra.jpg', '../assets/star_pictures/p5_super_terra.jpg', '../assets/star_pictures/p6_water_world.jpg', '../assets/star_pictures/p7_gas_giant_moon.jpg', '../assets/star_pictures/p8_gas_giant.jpg', '../assets/star_pictures/p9_super_jovian.jpg', '../assets/star_pictures/p10_ice_giant.jpg', '../assets/star_pictures/p11_ice_dwarf.jpg', '../assets/star_pictures/p12_dyson_sphere.jpg'];
var planet_data_name = ['Hot Giant', 'Hot Rocky', 'Rocky Dwarf', 'Sub Terra', 'Terra', 'Super Terra', 'Water World', 'Jovian Moon', 'Gas Giant', 'Super Jovian', 'Ice Giant', 'Ice Dwarf', 'Dyson Sphere'];
var planet_data_chance_life = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1];
var total_life_count = 0;
var total_intel_count = 0;
var mark_life_count = 0;
var mark_intel_count = 0;

// ================================================
// get data from local storage
// ================================================

var stringy_number_of_stars = localStorage.getItem('number_of_stars');
var stringy_percent_of_life = localStorage.getItem('%of_pos_life_on_planet');
var stringy_percent_of_intelligent_life = localStorage.getItem('%of_intelligent_life');
var life_drake = (JSON.parse(stringy_percent_of_life) || 1);
var intel_drake = (JSON.parse(stringy_percent_of_intelligent_life) || 0.25);
var num_stars = (JSON.parse(stringy_number_of_stars) || 1000);

// ================================================
// Solar System Constructor
// ================================================

function Build_star() {
  this.has_planets = false;
  this.scan_status = 'Not scanned';
  this.scanned_for_planets = false;
  this.planets = [],
  star_array.push(this);
}

Build_star.prototype.if_clicked = function() {
  var click_difference = dist(this.x, this.y, mouseX, mouseY);
  if (!data_window_open) {
    if (click_difference <= (this.z / 2)) {
      console.log(this);
      var new_div = createDiv('');
      new_div.attribute('id', 'data_div');
      var new_y = mouseY;
      var new_x = mouseX;
      this.populate_with_data();

      if (mouseY > (window.innerHeight / 2)) {
        new_y = mouseY - (new_div.size().height);
      }
      if (mouseX > (window.innerWidth / 2)) {
        new_x = mouseX - (new_div.size().width);
      }
      new_div.position(new_x, new_y);

      data_window_open = true;

      var ctx = this;
      var handle_scan = function(event) {
        if (event.target.id === 'scan') {
          ctx.scan_for_planets();
        }
        if (event.target.id === 'life_scan') {
          if (ctx.scanned_for_planets) {
            console.log('life scan');
            ctx.scan_for_life();
          }
        }
      };

      var scan = document.getElementById('scan');
      scan.addEventListener('click', handle_scan);

      var life_scan = document.getElementById('life_scan');
      life_scan.addEventListener('click', handle_scan);

      var close = document.getElementById('close_button');
      close.addEventListener('click', close_div);
    }
  }

  function close_div() {
    var container = document.getElementById('data_div');
    container.remove();
    data_window_open = false;
    planet_window_open = false;
  }
};

Build_star.prototype.populate_with_data = function() {
  var data_div = document.getElementById('data_div');
  var star_div = document.createElement('div');

  var image = document.createElement('img');
  image.setAttribute('src', this.image_url);
  star_div.appendChild(image);

  var data_list = document.createElement('ul');

  var name = document.createElement('li');

  name.textContent = `Star Type: ${this.name}`;
  data_list.appendChild(name);

  var age = document.createElement('li');
  age.textContent = `Age: ${this.age} billion years old.`;
  data_list.appendChild(age);

  var scan_status = document.createElement('li');
  scan_status.setAttribute('id', 'scan_status');
  scan_status.textContent = `Scan Status: ${this.scan_status}`;
  data_list.appendChild(scan_status);

  star_div.appendChild(data_list);

  var scan = document.createElement('button');
  scan.setAttribute('id', 'scan');
  scan.textContent = 'Planetary Scan';
  star_div.appendChild(scan);

  var life_scan = document.createElement('button');
  life_scan.setAttribute('id', 'life_scan');
  life_scan.textContent = 'Scan for Life';
  life_scan.disabled = true;
  star_div.appendChild(life_scan);

  var close = document.createElement('button');
  close.setAttribute('id', 'close_button');
  close.textContent = 'Close';
  star_div.appendChild(close);

  data_div.appendChild(star_div);
};

Build_star.prototype.scan_for_planets = function() {
  var data_div = document.getElementById('data_div');
  var scanned = document.getElementById('scan_status');
  var scan_button = document.getElementById('life_scan');
  scan_button.disabled = false;

  this.scan_status = 'Scanned for Planets';
  this.scanned_for_planets = true;
  scanned.textContent = `Scan Status: ${this.scan_status}`;

  if (!planet_window_open) {
    var new_planets_div = document.createElement('div');
    new_planets_div.setAttribute('id', 'planet_div');
    data_div.append(new_planets_div);
    if (this.has_planets === true) {
      this.populate_planet_data();
    } else {
      this.scan_status = 'No planets found';
      scanned.textContent = `Scan Status: ${this.scan_status}`;
    }
  }

  planet_window_open = true;
};

Build_star.prototype.populate_planet_data = function() {
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].populate_with_data(i);
  }
};

Build_star.prototype.scan_for_life = function() {
  var scanned = document.getElementById('scan_status');
  var life = false;
  for (var i = 0; i < this.planets.length; i++) {
    console.log(i);
    this.planets[i].check_for_life(this, i);
    if (this.planets[i].life) { life = true; }
    if (!life) {
      this.scan_status = 'No life found';
      scanned.textContent = `Scan Status: ${this.scan_status}`;
    }
  }
};

function Build_planet(index) {
  this.scanned = false;
  star_array[index].planets.push(this);
}

Build_planet.prototype.populate_with_data = function(planet_index) {
  var planet_div = document.getElementById('planet_div');
  var new_planet = document.createElement('div');
  new_planet.setAttribute('class', 'planet');

  var image = document.createElement('img');
  image.setAttribute('id', `planet_${planet_index}`);
  image.setAttribute('src', this.image_url);
  new_planet.appendChild(image);

  var data_list = document.createElement('ul');

  var name = document.createElement('li');
  name.textContent = `${this.name}`;

  data_list.appendChild(name);
  new_planet.appendChild(data_list);
  planet_div.appendChild(new_planet);

};

Build_planet.prototype.check_for_life = function(star, planet_index) {
  var scanned = document.getElementById('scan_status');
  var planet = document.getElementById(`planet_${planet_index}`);
  console.log(star.scanned_for_planets);
  if (this.life === 1) {
    life_counter += 1;
    star.scan_status = 'Success!  Life found!';
    planet.setAttribute('class', 'life');
  }
  if (this.intel === 1) {
    intel_counter += 1;
    star.scan_status = 'Success! INTELLIGENCE found!';
    planet.setAttribute('class', 'intel');
  }
  scanned.textContent = `Scan Status: ${star.scan_status}`;
  var status_bar = document.getElementById('status_bar');
  status_bar.innerHTML = `<ul><li>Planets found that have life: ${life_counter}</li><li>Planets found that have intelligent life: ${intel_counter}</li></ul> <a href='../index.html'><button>Back</button></a>`;
  this.scanned = true;
};

// ================================================
// populate star_Array objects
// ================================================

for (var i = 0; i < num_stars; i++) {
  // 14 types of stars in database, pick random number 0 to 99, set s-type to star of that number
  var chance = Math.floor(Math.random() * 99);
  var chance2 = Math.random();
  var s_type = star_types[chance];
  // easter egg time!  add dyson sphere
  if (chance2 > 0.999) { s_type = 13; }
  new Build_star();
  star_array[i].image_url = star_data_image_url[s_type];
  star_array[i].type = s_type;
  star_array[i].name = star_data_name[s_type];
  star_array[i].age = ((star_data_maxage[s_type] - star_data_minage[s_type]) * (Math.random()) + star_data_minage[s_type]).toFixed(3);
  star_array[i].x = randomized_coordinates()[0];
  star_array[i].y = randomized_coordinates()[1];
  star_array[i].z = randomized_coordinates()[2];
  var chance = Math.random();
  // set random chance for if star has planets
  if (chance < star_data_chance_planets[s_type]) {
    star_array[i].has_planets = true;
    var num_planets = Math.floor(Math.random() * 7) + 2;
    // max number of possible planets in solar system is arbitrarily set to 2 to 9
    for (var j = 0; j < num_planets; j++) {
      var k = 0;
      while (k === 0) {
        var chance = Math.floor(Math.random() * 99);
        // 12 types of planets in database, random pick of 0 to 99, set p-type to planet of that number
        var p_type = planet_types[chance];
        // conditionals to put hot planets by star and cold planets away from it
        if (
          ((j === 0 && num_planets > 1) && p_type > 9) ||
                    (((j === 1 && num_planets > 2) && p_type < 2) && star_array[i].planets[0].type > 1) ||
                    ((j === num_planets || j === (num_planets - 1)) && (p_type === 0 || p_type === 1)) ||
                    (j > 2 && (p_type === 0 || p_type === 1)) ||
                    ((j < num_planets - 3) && p_type > 9)
        ) {
          k = 0;
        } else {
          k = 1;
        }
      }
      new Build_planet(i);
      star_array[i].planets[j].image_url = planet_data_image_url[p_type];
      star_array[i].planets[j].type = p_type;
      star_array[i].planets[j].name = planet_data_name[p_type];
      var chance_of_life = Math.random() / life_drake;
      // set random chance if planet has life
      if (chance_of_life < planet_data_chance_life[p_type]) {
        star_array[i].planets[j].life = 1;
        total_life_count++;
        var chance_of_intel = Math.random() / intel_drake;
        // set random chance if life is intelligent
        if (star_array[i].age > 4 && chance_of_intel > 1) {
          star_array[i].planets[j].intel = 1;
          total_intel_count++;
        }
      }
      //  dyson sphere logic
      if (star_array[i].type === 13) {
        star_array[i].planets[j].image_url = planet_data_image_url[12];
        star_array[i].planets[j].type = 12;
        star_array[i].planets[j].name = planet_data_name[12];
        star_array[i].planets[j].life = 1;
        star_array[i].planets[j].intel = 1;
        star_array[i].has_planets = true;
        num_planets = 1;
        j = num_planets;
      }
    }
  }
}

// ================================================
// p5 Canvas area
// ================================================

var img;
var background_img;
var images = [];

function preload() {
  for (var i = 0; i < star_data_image_url.length; i++) {
    img = loadImage(star_data_image_url[i]);
    images.push(img);
  }
  background_img = loadImage('../assets/star_pictures/Milky_Way-view2.jpg');
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  background(background_img, 0);

  var status_bar = createDiv('<ul><li>Planets found that have life: 0</li><li>Planets found that have intelligent life: 0</li></ul> <a href=\'../index.html \'><button>Back</button></a>');
  status_bar.attribute('id', 'status_bar');
  var pos_x = window.innerWidth / 4;
  var pos_y = window.innerHeight - status_bar.size().height;
  status_bar.position(pos_x, pos_y);

  imageMode(CENTER);
  noStroke();

  for (var i in star_array) {
    fill(0, 0, 0, 1);
    image(images[star_array[i].type], star_array[i].x, star_array[i].y, star_array[i].z, star_array[i].z);
    ellipse(star_array[i].x, star_array[i].y, star_array[i].z, star_array[i].z);
  }
}

function mousePressed() {
  for (var i in star_array) {
    star_array[i].if_clicked();
  }
}

function randomized_coordinates() {
  var random_x = Math.floor(((Math.random() * (window.innerWidth - 300)) + 150));
  var random_y = Math.floor(((Math.random() * (window.innerHeight - 300)) + 150));
  var random_psuedo_z = Math.floor(Math.random() * 22) + 17;
  //change 22 and 17 to change star image sizes and depth of view
  var coordinates = [random_x, random_y, random_psuedo_z];
  return coordinates;
}
