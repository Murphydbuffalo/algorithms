const algorithm = require('./' + process.argv[2] + '-sort');
const numberOfElements = process.argv[3];
const benchmark = require('performance-now');

const capitalize = (string) => {
  'use strict';

  return string.charAt(0).toUpperCase() + string.slice(1);
};

const algorithmName = capitalize(process.argv[2]);

const types = ['partially sorted', 'unsorted', 'reverse sorted'];
const length = 3;
let start, end, duration;
let i = 0;

for(i; i < length; i++) {
  let array = require('./sortable-array')(types[i], numberOfElements);
  let index = 0;
  let arrayLength = array.length;
  let originalArrayString = 'Original array:\n[ ';
  let sortedArrayString = 'Sorted array:\n[ ';

  for(index = 0; index < arrayLength; index += 10) {
    originalArrayString += (array.slice(index, index + 10).join(', ') + '\n');
  }

  start = benchmark();
  array = algorithm(array);
  end = benchmark();

  for(index = 0; index < arrayLength; index += 10) {
    sortedArrayString += (array.slice(index, index + 10).join(', ') + '\n');
  }

  let time = 
    (end - start) >= 1000 ? 
    ((end - start) / 1000) + ' seconds': 
    (end - start) + ' milliseconds';

  console.log(
    `\n${algorithmName} sort took ${time} to a ${numberOfElements} element ${types[i]} array.\n`
  );
  console.log(originalArrayString.slice(0, -1) + ' ]');
  console.log(sortedArrayString.slice(0, -1) + ' ]');
  console.log('========================================================\n');
}
