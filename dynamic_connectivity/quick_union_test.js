'use strict';

var benchmark, n, quickUnion, randomNode, i, a, b, t0, t1, timeElapsed;

benchmark = require('performance-now');
n = process.argv[2];
quickUnion = require('./quick_union')(n);

randomNode = function(){
  return Math.floor(Math.random() * quickUnion.ids.length);
};

console.log('Orginal set of IDs:');
console.dir(quickUnion.ids);
console.log('\n');

t0 = benchmark();

for(i = 0; i < (n - 1); i++){
  a = randomNode();
  b = randomNode();
  console.log('Performing union on ' + a + ' and ' + b);
  quickUnion.union(a, b);
  console.log('New IDs array:');
  console.dir(quickUnion.ids);
  console.log('\n');
}

t1 = benchmark();

if((t1 - t0) < 1000){ 
  timeElapsed = '' + t1 - t0 + ' milliseconds'; 
} else {
  timeElapsed = '' + (t1 - t0)/1000 + ' seconds'; 
}

console.log('The quick-union algorithm took ' + timeElapsed + ' to run for a ' + n + ' element array.');
