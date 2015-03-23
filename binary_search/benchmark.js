var binarySearch, benchmark, array, t0, t1;

binarySearch = require('./binary_search');
benchmark = require('performance-now');

array = binarySearch.createArray(process.argv[2]);

t0 = benchmark();
binarySearch.find(array, process.argv[3]);
t1 = benchmark();

if(t1 - t0 < 1000){
  console.log('Binary search completed in ' + (t1-t0) + ' milliseconds.');
} else {
  console.log('Binary search completed in ' + (t1-t0)/1000 + ' seconds.');
}

