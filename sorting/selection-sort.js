module.exports = (array) => {
  'use strict';

  const swap = (a, b) => {
    const aValue = array[a];
    array[a] = array[b];
    array[b] = aValue;
  };

  const length = array.length;

  const minimum = (i) => {
    let min = array[i];
    let indexOfMin = i;

    for(i; i < length; i++) {
      if(array[i] < min) {
        min = array[i];
        indexOfMin = i;
      }
    }

    return indexOfMin;
  };

  let index = 0;

  for(index; index < length; index++) {
    let minIndex = minimum(index);

    swap(minIndex, index);
  }

  return array;
};
