'use strict';

var benchmark, algorithm, implementation, n, 
quickFind, randomNode, i, a, b, t0, t1, timeElapsed;

benchmark = require('performance-now');
algorithm = process.argv[2];
n = process.argv[3];
implementation = require('./' + algorithm.replace(/-/g, '_'))(n);

randomNode = function(){
  return Math.floor(Math.random() * implementation.ids.length);
};

console.log('Orginal set of IDs:');
console.dir(implementation.ids);
console.log('\n');

t0 = benchmark();

for(i = 0; i < (n - 1); i++){
  a = randomNode();
  b = randomNode();
  console.log('Performing union on ' + a + ' and ' + b);
  implementation.union(a, b);
  console.log('New IDs array:');
  console.dir(implementation.ids);
  console.log('\n');
}

t1 = benchmark();

if((t1 - t0) < 1000){ 
  timeElapsed = '' + t1 - t0 + ' milliseconds'; 
} else {
  timeElapsed = '' + (t1 - t0)/1000 + ' seconds'; 
}

console.log('The ' + algorithm + ' algorithm took ' + timeElapsed + ' to run for a ' + n + ' element array.');
