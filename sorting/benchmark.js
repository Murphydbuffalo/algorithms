const fs = require('fs');
const path = require('path');
const benchmark = require('performance-now');
const options = {};
const args = process.argv.slice(2);

for(let i = 0; i < args.length; i += 2) {
  options[args[i]] = args[i + 1];
}

const algorithmName = options['--algorithm'] || options['-a'] || 'selection';
const fileName = path.join(__dirname, algorithmName + '-sort.js');
const capitalize = (string) => {
  'use strict';

  return string.charAt(0).toUpperCase() + string.slice(1);
};

let algorithm;

if(fs.existsSync(fileName)) {
  algorithm = require(fileName);
} else {
  const message = 
    `${capitalize(algorithmName)} sort hasn't been implemented yet. Sadness :^(`;

  throw new Error(message);   
}

const numberOfElements = options['--number-elements'] || options['-n'] || 10;

let types = [];

switch(options['--array-type'] || options['-t']) {
  case 'unsorted':
    types.push('unsorted');
    break;

  case 'partial':
    types.push('partially sorted');
    break;

  case 'reverse':
    types.push('reverse sorted');
    break;

  case 'all':
    types.push('unsorted', 'partially sorted', 'reverse sorted');
    break;

  default:
    types.push('unsorted');

}

const length = types.length;
let i = 0;

for(i; i < length; i++) {
  let array = require('./sortable-array')(types[i], numberOfElements);
  let arrayLength = array.length;
  let originalArrayString = 'Original array:\n[ ';
  let sortedArrayString = 'Sorted array:\n[ ';

  for(let index = 0; index < arrayLength; index += 15) {
    originalArrayString += (array.slice(index, index + 15).join(', ') + '\n  ');
  }

  let start = benchmark();
  array = algorithm(array);
  let end = benchmark();

  
  for(let index = 0; index < arrayLength; index += 15) {
    sortedArrayString += (array.slice(index, index + 15).join(', ') + '\n  ');
  }    
    
  let time = 
    (end - start) >= 1000 ? 
    ((end - start) / 1000) + ' seconds': 
    (end - start) + ' milliseconds';

  console.log(
    `\n${capitalize(algorithmName)} sort took ${time} to a ${numberOfElements} element ${types[i]} array.\n`
  );
  
  if(options.hasOwnProperty('--logging') || options.hasOwnProperty('-l')) {
    console.log(originalArrayString.slice(0, -4) + ' ]');
    console.log(sortedArrayString.slice(0, -4) + ' ]');
    console.log('========================================================\n');
  }
}
