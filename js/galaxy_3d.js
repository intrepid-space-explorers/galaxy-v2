'use-strict';

//======================================
// Global Variables
//======================================
var field_size = window.innerWidth * 2;
var data_window_open = false;
var planet_window_open = false;

var num_stars = 1000;
var star_field = [];

//======================================
// Global DOM References
//======================================

var body = document.getElementsByTagName('body')[0];

//======================================
// Star and Planet Distribution Arrays
//======================================

//control star type distribution
var star_type_distribution = [
  0, 1, 1, 2, 2, 2, 3, 3, 4, 4, // 0 black hole
  5, 5, 6, 6, 6, 6, 6, 6, 6, 6, // 1 nuetron star
  7, 7, 7, 7, 7, 7, 7, 7, 8, 8, // 2 white dwarf
  8, 8, 8, 8, 8, 8, 9, 9, 9, 9, // 3 supernova i
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9, // 4 supernova ii
  9, 9, 9, 9, 9, 9, 9, 10, 10, 10, // 5 red giant
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 6 7 8 main i, ii, iii
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11, // 9 10 11 red dwarf 1, 2, 3
  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, // 12 blue giant
  11, 11, 11, 11, 11, 11, 11, 11, 12, 12 // 13 dyson sphere
];

//control planet type distribution
var planet_type_distribution = [
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, // 0 hot giant
  1, 1, 1, 1, 1, 2, 2, 2, 2, 2, // 1 hot rocky
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, // 2 rocky dwarf
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, // 3 4 5 sub, terra, super
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, // 6 water world
  6, 6, 7, 7, 7, 8, 8, 8, 8, 8, // 7 gas giant moon
  8, 8, 8, 8, 8, // 8 gas giant
  9, 9, 9, 10, 10, // 9 super jovian
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 10 ice giant
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, // 11 ice dwarf
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11, // 12 dyson sphere
  13, 13, 13, 14, 14, 14, 14, 14, 14, 14,
  14, 14, 14, 15, 15, 15
];
//======================================
// Star Types and Planet Types Arrays
//======================================

var star_types = [
  ['Black Hole', .1, 13, 0, '../assets/star_pictures/s0_blackhole.png'],
  ['Neutron Star', 5, 12, .01, '../assets/star_pictures/s1_neutron.png'],
  ['White Dwarf', 7, 13, .05, '../assets/star_pictures/s2_white_dwarf.png'],
  ['Supernova-I', .1, .1, 0, '../assets/star_pictures/s3_supernova_i.png'],
  ['Supernova-II', .1, .1, 0, '../assets/star_pictures/s4_supernova_ii.png'],
  ['Red Giant', 6, 7, .4, '../assets/star_pictures/s5_red_giant.png'],
  ['Main Sequence I', 2, 6, .9, '../assets/star_pictures/s6_main_i.png'],
  ['Main Sequence II', 3, 7, .9, '../assets/star_pictures/s7_main_ii.png'],
  ['Main Sequence III', 4, 8, .9, '../assets/star_pictures/s8_main_iii.png'],
  ['Red Dwarf I', 2, 8, .9, '../assets/star_pictures/s9_red_dwarf_1.png'],
  ['Red Dwarf II', 2, 10, .9, '../assets/star_pictures/s10_red_dwarf_2.png'],
  ['Red Dwarf III', 2, 12, .9, '../assets/star_pictures/s11_red_dwarf_3.png'],
  ['Blue Giant', .2, .5, .05, '../assets/star_pictures/s12_blue_giant.png'],
  ['Dyson Sphere', 4, 12, 1, '../assets/star_pictures/s13_dyson_sphere.png']
];

var planet_types = [
  ['Hot Giant', 0, 1, '../assets/star_pictures/p0_hot_giant.jpg'],
  ['Hot Rocky', 0, 1, '../assets/star_pictures/p1_hot_rocky.jpg'],
  ['Rocky Dwarf', 1, 2, '../assets/star_pictures/p2_rocky_dwarf.jpg'],
  ['Sub Terra', 1, 3, '../assets/star_pictures/p3_sub_terra.jpg'],
  ['Terra', 1, 2, '../assets/star_pictures/p4_terra.jpg'],
  ['Super Terra', 1, 2, '../assets/star_pictures/p5_super_terra.jpg'],
  ['Water World', 1, 2, '../assets/star_pictures/p6_water_world.jpg'],
  ['Jovian Moon', 1, 2, '../assets/star_pictures/p7_gas_giant_moon.jpg'],
  ['Gas Giant', 0, 2, '../assets/star_pictures/p8_gas_giant.jpg'],
  ['Super Jovian', 0, 2, '../assets/star_pictures/p9_super_jovian.jpg'],
  ['Ice Giant', 0, 4, '../assets/star_pictures/p10_ice_giant.jpg'],
  ['Ice Dwarf', 0, 4, '../assets/star_pictures/p11_ice_dwarf.jpg'],
  ['Dyson Sphere', 1, 2, '../assets/star_pictures/p12_dyson_sphere.jpg'],
  ['Jovian Moon', 1, 3, '../assets/star_pictures/p7_gas_giant_moon.jpg'],
  ['Gas Giant', 0, 3, '../assets/star_pictures/p8_gas_giant.jpg'],
  ['Super Jovian', 0, 3, '../assets/star_pictures/p9_super_jovian.jpg']
];

//======================================
// Constructors and Methods
//======================================

function Star(type, min_age, max_age, chance_of_planets, url) {
  this.type = type;
  this.min_age = min_age;
  this.max_age = max_age;
  this.chance_of_planets = chance_of_planets;
  this.planets = [];
  this.url = url;
  this.x = random_coordinate();
  this.y = random_coordinate();
  this.z = random_coordinate();
  this.planet_scan_status = 'Not scanned';
  star_types.push(this);
}

Star.prototype.calculate_age = function() {
  var age = ((Math.random() * (this.max_age - this.min_age)) + this.min_age).toFixed(3);
  return age;
};

Star.prototype.set_planets_or_not = function() {
  var chance = Math.random();
  if (this.type === 'Dyson Sphere') {
    this.has_planets = true;
    this.planets.push(planet_types[12]);
  } else if (chance < this.chance_of_planets) {
    this.has_planets = true;
    this.generate_planets();

  } else {
    this.has_planets = false;
  }
};

Star.prototype.generate_planets = function() {
  //number of possible planets in solar system is arbitrarily set to a range of 2 to 9
  var num_planets = Math.floor(Math.random() * 7) + 2;
  var planet_array = [];
  var new_planet;

  for (var i = 0; i < num_planets; i++) {
    //select random planet type
    var chance = Math.floor(Math.random() * planet_type_distribution.length);
    var p_type = planet_type_distribution[chance];
    new_planet = new Planet(planet_types[p_type][0], planet_types[p_type][1], planet_types[p_type][2], planet_types[p_type][3]);
    new_planet.set_life_or_not();
    planet_array.push(new_planet);
  }
  planet_array.sort((a, b) => {
    if (a.zone > b.zone) return 1;
    if (a.zone < b.zone) return -1;
    return 0;
  });
  this.planets = planet_array;
};

Star.prototype.if_clicked = function() {
  if (!data_window_open) {
    generate_data_div(event, this);

    $('#close').click(close_div);
  }
};

Star.prototype.populate_with_data = function() {
  $('#data_div').append($('<div></div>').attr('id', 'star_div'));

  var image = document.createElement('img');
  image.setAttribute('src', this.url);
  $('#star_div').append(image);

  $('#star_div').append($('<ul></ul>').attr('id', 'data_list'));
  $('#data_list').append($('<li></li>').text(`Type: ${this.type}`));
  $('#data_list').append($('<li></li>').text(`Age: ${this.age} billion years old.`));
  $('#data_list').append($('<li></li>').text(`Scan Status: ${this.planet_scan_status}`));

  $('#star_div').append($('<button>Planetary Scan</button>').attr('id', 'planet_scan'));
  $('#star_div').append($('<button>Close</button>').attr('id', 'close'));

  //life scan status
  //scan for life button

};

function Planet(type, chance_of_life, zone, url) {
  this.type = type;
  this.chance_of_life = chance_of_life;
  this.zone = zone;
  this.url = url;
  planet_types.push(this);
}

Planet.prototype.set_life_or_not = function() {
  //life claculations
};

//======================================
// Stand-alone Functions
//======================================

function random_coordinate() {
  var coordinate = Math.floor((Math.random() * field_size) - (field_size / 2));
  return coordinate;
}

function generate_data_div(event, star) {
  data_window_open = true;
  $('body').append($('<div></div>').attr('id', 'data_div'));
  var pos_y = event.pageY;
  var pos_x = event.pageX;
  if (event.pageY > (window.innerHeight / 2)) {
    pos_y = event.pageY - ($('#data_div').height());
  }
  if (event.pageX > (window.innerWidth / 2)) {
    pos_x = event.pageX - ($('#data_div').width());
  }
  $('#data_div').offset({ 'top': pos_y, 'left': pos_x });
  star.populate_with_data();
}

function close_div() {
  $('#data_div').remove();
  data_window_open = false;
  planet_window_open = false;
}

//======================================
// Create Current Star Field
//======================================

for (var i = 0; i < num_stars; i++) {
  // 14 types of stars in database
  var new_star;
  var chance = Math.random();
  if (chance > 0.999) {
    //low chance, dyson sphere option
    new_star = new Star(star_types[13][0], star_types[13][1], star_types[13][2], star_types[13][3], star_types[13][4]);
  } else {
    //selects the star types based on the distributon pattern created in the star_types_distribution array
    chance = Math.floor(chance * 99);
    var s_type = star_type_distribution[chance];
    new_star = new Star(star_types[s_type][0], star_types[s_type][1], star_types[s_type][2], star_types[s_type][3], star_types[s_type][4]);
  }
  new_star.age = new_star.calculate_age();
  new_star.set_planets_or_not();
  star_field.push(new_star);
}

console.log(star_field);

//======================================
// Rendering
//======================================
var canvas = document.getElementById('star_field_canvas');
console.log(canvas);
canvas.setAttribute('height', window.innerHeight);
canvas.setAttribute('width', window.innerWidth);

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = BABYLON.Color3.Black();

  var camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 0, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);


  for (var i in star_field) {
    var star = new BABYLON.MeshBuilder.CreateSphere(i, { diameter: 10 }, scene);
    var texture = new BABYLON.StandardMaterial('texture', scene);
    texture.emissiveTexture = new BABYLON.Texture(star_field[i].url, scene);
    star.material = texture;
    star.position = new BABYLON.Vector3(star_field[i].x, star_field[i].y, star_field[i].z);
  }
  // var skybox = new BABYLON.CubeTexture('../assets/textures/milky_way', scene);
  // scene.createDefaultSkybox(skybox, true, (field_size * 2));

  return scene;
};


var scene = createScene();

engine.runRenderLoop(function() {
  scene.render();
});

window.addEventListener('click', function() {
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);
  if (!data_window_open && pickResult.pickedMesh) {
    var star_clicked = star_field[pickResult.pickedMesh.id];
    star_clicked.if_clicked(event);
  }
}),

window.addEventListener('resize', function() {
  engine.resize();
});
