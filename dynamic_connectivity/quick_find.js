var implementation, i, index, aValue, bValue;

module.exports = function(n){
  'use strict';

  implementation = { ids: [] };

  for(i = 0; i < n; i++){
    implementation.ids[i] = i;
  }

  implementation.connected = function(a, b){
    return this.ids[a] === this.ids[b];
  };

  implementation.union = function (a, b){
    aValue = this.ids[a];
    bValue = this.ids[b];

    for(index = 0; index < this.ids.length; index++){
      if(this.ids[index] === bValue){
        this.ids[index] = aValue;
      }
    }

    return true;
  };

  return implementation;
};
