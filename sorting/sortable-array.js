module.exports = (type, n) => {
  'use strict';

  let array = [];
  let value; 

  switch(type.toLowerCase()) {
    case 'unsorted':
      value = (i) => Math.floor(Math.random() * n);
      break;
    case 'partial':
      value = (i) => {
        if(Math.random() < 0.65){
          return i;
        } else {
          return Math.floor(Math.random() * n);
        }
      };

      break;
    case 'reverse':
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
