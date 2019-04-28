'use strict';

function randomImage(){
  var images = [
   'assets/background_pictures/stars1.png',
   'assets/background_pictures/stars2.png',
   'assets/background_pictures/stars3.png',
   'assets/background_pictures/stars4.png'
    ];
    var size = images.length;
    var x = Math.floor(size * Math.random());
    console.log(x);
    var element = document.getElementsByClassName('home-intro');
    console.log(element);
    element[0].style["background-image"] = "url("+ images[x] + ") no-repeat;";
}

document.addEventListener("DOMContentLoaded", randomImage);
