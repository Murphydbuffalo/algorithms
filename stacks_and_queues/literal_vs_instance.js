'use strict';

var literal, object, instance, knownSize, benchmark, instantiationLog,
accessLog, t0, t1, i, literalTime, objectTime, instanceTime, knownSizeTime;

literal = [];

object = {};

instance = new Array();

knownSize = new Array(50000);

benchmark = require('performance-now');

instantiationLog = function(type, time){
  console.log(type + ' instantiation with 50,000 entries took ' + time + ' milliseconds');
}

accessLog = function(time){
  console.log('And accessing 50,000 "random" entries took ' + time + ' milliseconds\n\n');
}

/* ========== Literal Array ========== */
t0 = benchmark();

for(i = 0; i < 50000; i++){
  literal[i] =i;
}

t1 = benchmark();

instantiationLog('Array literal', (t1 - t0));

t0 = benchmark();

for(i = 0; i < 50000; i++){
  literal[Math.floor(Math.random() * 50000 + 1)] = 5;
}

t1 = benchmark();

accessLog((t1 - t0));

/* ========== Literal Object ========== */
t0 = benchmark();

for(i = 0; i < 50000; i++){
  object[i] =i;
}

t1 = benchmark();

instantiationLog('Object literal', (t1 - t0));

t0 = benchmark();

for(i = 0; i < 5000; i++){
  object[Math.floor(Math.random() * 50000 + 1)] = 5;
}

t1 = benchmark();

accessLog((t1 - t0));

/* ========== Instance of Array ========== */
t0 = benchmark();

for(i = 0; i < 50000; i++){
  literal[i] =i;
}

t1 = benchmark();

instantiationLog('Instance of Array', (t1 - t0));

t0 = benchmark();

for(i = 0; i < 5000; i++){
  instance[Math.floor(Math.random() * 50000 + 1)] = 5;
}

t1 = benchmark();

accessLog((t1 - t0));

/* ========== Instance of Array with a known size ========== */
t0 = benchmark();

for(i = 0; i < 50000; i++){
  knownSize[i] =i;
}

t1 = benchmark();

instantiationLog('Instance of array with known size', (t1 - t0));

t0 = benchmark();

for(i = 0; i < 5000; i++){
  knownSize[Math.floor(Math.random() * 50000 + 1)] = 5;
}

t1 = benchmark();

accessLog((t1 - t0));
