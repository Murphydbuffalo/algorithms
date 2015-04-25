module.exports = (array) => {
  'use strict';

  const swap = (a, b) => {
    const aValue = array[a];
    array[a] = array[b];
    array[b] = aValue;
  };

  const length = array.length;

  let index = 0;

  for(index; index < length; index++) {
    let i = 0;

    for(i; i < index; i++) {
      if(array[index] < array[i]) {
        swap(i, index);
      }
    }
  }

  return array;
};
