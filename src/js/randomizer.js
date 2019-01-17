'use strict'

// Randomizer

// Wrap every letter in a span
$('#randomizer').each(function () {
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

// Random integer function
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get random decimal
function getRandomDec(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// assigns random integer to the css property for each span
$('.letter').each(function () {
  $(this).css({ 'animationIterationCount': getRandomInt(1, 10), 'animationIterationCount': getRandomInt(1, 10), 'animationDuration': getRandomDec(0, 1) + 's', 'animationDuration': getRandomDec(0, 1) + 's' });
});