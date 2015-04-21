module.exports = (sorting, n) => {
  'use strict';

  let array = [];
  let value; 

  switch(sorting.toLowerCase()) {
    case 'unsorted':
      value = (i) => Math.floor(Math.random() * n);
      break;
    case 'partially sorted':
      value = (i) => {
        if(Math.random() < 0.65){
          return i;
        } else {
          return Math.floor(Math.random() * n);
        }
      };

      break;
    case 'reverse sorted':
      value = (i) => n - i;
      break;
    default:
      value = (i) => Math.floor(Math.random() * n);
  }

  for(let i = 0; i < n; i++) {
    array.push(value(i));
  }

  return array;
};
