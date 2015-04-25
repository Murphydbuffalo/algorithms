module.exports = (array) => {
  'use strict';

  const length = array.length;

  const createHValues = ( arrayLength ) => {
    let h = 1;
    let values = [h];

    while( (values[0]) * 3 + 1 < arrayLength ) {
      h = (h * 3) + 1;

      values.unshift(h);
    }

    return values;
  };

  const swap = (a, b) => {
    const aValue = array[a];
    array[a] = array[b];
    array[b] = aValue;
  };

  const hValues = createHValues(length);
  const hLength = hValues.length;

  let hIndex = 0;

  for(hIndex; hIndex < hLength; hIndex++) {
    let outerI = 0;

    for(outerI; outerI < length; outerI++) {
      let innerI = 0;

      for(innerI; innerI < outerI; innerI += hValues[hIndex]) {
        if(array[outerI] < array[innerI]) {
          swap(innerI, outerI);
        }
      }
    }
  }
  
  return array;
};
