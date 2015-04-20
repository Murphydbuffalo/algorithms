const algorithm = require('./' + process.argv[2] + '-sort');
const numberOfElements = process.argv[3];
const benchmark = require('performance-now');

const capitalize = (string) => {
  'use strict';

  return string.charAt(0).toUpperCase() + string.slice(1);
}
const algorithmName = capitalize(process.argv[2]);

const log = (name, time, n) => {
  'use strict';

  console.log(
    `${name} sort took ${time} seconds to sort a ${n} integer array.\n`
  );
};

const types = ['partial', 'unsorted', 'reverse'];
const length = 3;
let start, end, duration;
let i = 0;

for(i; i < length; i++) {
  let array = require('./sortable-array')(types[i], numberOfElements);
  
  console.log(`Array sorting type: ${capitalize(types[i])}\n`);


  console.log('Original array:');
  console.dir(array);
  console.log('\n');

  start = benchmark();
  array = algorithm(array);
  end = benchmark();

  console.log('Sorted array:');
  console.dir(array);
  console.log('\n');

  duration = (end - start) / 1000;

  log(algorithmName, duration, numberOfElements);
}
