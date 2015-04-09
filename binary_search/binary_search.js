var i, arr, low, high, mid;

module.exports = {  
  createArray: function(n){
    'use strict';

    arr = [];

    for(i = 0; i < n; i++){
      arr.push(Math.floor((Math.random() * 10) + 1));
    }

    arr = arr.sort();

    return arr;
  },

  find: function(array, value){
    'use strict';

    low = 0;
    high = array.length - 1;

    while(low + 1 < high){
      mid = Math.floor(((high - low) / 2) + low);

      if(array[mid] === value){
        console.log('Found ' + value + ' at index ' + mid);

        return mid;
      } else if(array[mid] < value){
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    console.log('Did not find value ' + value);
    
    return false;
  }
};
