

import {randomSuperhero} from 'superheroes';
import {randomSupervillain} from 'supervillains';

console.log("Hello, World!");

const swQuotes = require('star-wars-quotes');
console.log(swQuotes());

const superheroesNames = randomSuperhero()
const supervillainsNames = randomSupervillain()

console.log(`${superheroesNames} battles ${supervillainsNames} in an epic showdown!`);

var fs = require('fs');
fs.readFile("./data/input.txt",'data', (err, data) => {
    console.log(data)
  });