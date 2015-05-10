module.exports = (array) => {
  'use strict';

  Array.prototype.swap = (a, b) => {
    const aValue = this[a];
    this[a] = this[b];
    this[b] = aValue;
  };

  // Method to iterate through subarrays in an array
  // Swapping elements if out of order 
  // After swaps recheck the smaller swapped value (now the leftmost of the pair) against the element to its left
  const subSort = (array) => {
    let length = array.length;
    let i = 0;

    for(i; i < length; i++) {
      if( array[i + 1] < array[i]) {
        array.swap(i + 1, i);

        i -= 2;
      }
    }
  };

  const originalLength = array.length;
  let placeholder = [];

  let i = 0;

  // Create placeholder array whose elements are two element arrays corresponding to values at the same position in the original

  // Reassign the original to the value of the placeholder, reassign placeholder to []

  // Iterate through the original, subSort'ing each element

  // Following each subSort() compare the first element in each subarray and swap according to those values

  // Placeholder will be updated with the result of each iteration through the original array (subSort()'ing each element in the original)

  // Then reapeat the -- reassign the original array to the placeholder, reset the placeholder to [], perform another iteration of subSort'ing

  // Break when original array's length equals its original length (its length with no sub-arrays, only elements)

  for( i; i < originalLength; i += 2 ) {
    if( array[i + 1] < array[i]) array.swap(i + 1, i);

    placeholder.push([ array[i + 1], array[i] ]);
  }

  array = placeholder;
  placeholder = [];

  let j = 0;

  while( array.length < originalLength ) {
    for( j; j < array.length; j += 2 ) {
      subSort( array[j] );
      subSort( array[j + 1] );

      if( array[j + 1][0] < array[j][0]) array.swap(j + 1, j);
        
      placeholder.push([ array[j + 1], array[j] ]);
    }

    array = placeholder;
    placeholder = [];
  }
};
