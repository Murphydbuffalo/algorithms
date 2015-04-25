module.exports = (array) => {
  'use strict';

  const length = array.length;

  const createHValues = ( arrayLength ) => {
    let h = 1;
    let values = [h];

    while( (values[0]) * 3 + 1 < arrayLength ) {
      values.unshift(h);
      h = (h * 3) + 1;
    }

    return values;
  };

  const swap = (a, b) => {
    const aValue = array[a];
    array[a] = array[b];
    array[b] = aValue;
  };

  let hIndex = 0;
  const hValues = createHValues(length);
  const hLength = hValues.length;
  
  let outerI = 0;

  for(hIndex; hIndex < hLength; hIndex++) {
    for(outerI; outerI < length; outerI++) {
      let innerI = hIndex;

      for(innerI; innerI <= outerI; innerI++) {
        if(array[outerI] < array[outerI - innerI]) {
          swap(outerI - innerI, outerI);

          outerI = outerI - innerI;
          innerI = hIndex;
        }
      }
    }
  }
  
  return array;
};
