'use strict';

var benchmark, n, quickFind, randomNode, i, a, b, t0, t1, timeElapsed;

benchmark = require('performance-now');
n = process.argv[2];
quickFind = require('./quick_find')(n);

randomNode = function(){
  return Math.floor(Math.random() * quickFind.ids.length);
};

console.log('Orginal set of IDs:');
console.dir(quickFind.ids);
console.log('\n');

t0 = benchmark();

for(i = 0; i < (n - 1); i++){
  a = randomNode();
  b = randomNode();
  console.log('Performing union on ' + a + ' and ' + b);
  quickFind.union(a, b);
}

t1 = benchmark();

if((t1 - t0) < 1000){ 
  timeElapsed = '' + t1 - t0 + ' milliseconds'; 
} else {
  timeElapsed = '' + (t1 - t0)/1000 + ' seconds'; 
}

console.log('The quick-find algorithm took ' + timeElapsed + ' to run for a ' + n + ' element array.');
