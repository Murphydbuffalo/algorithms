var implementation, i, rootA, rootB;

module.exports = function(n){
  'use strict';

  implementation = { ids: new Array(n) };

  for(i = 0; i < n; i++){ implementation.ids[i] = i; }

  implementation.findRoot = function(index){
    while(this.ids[index] !== index){ index = this.ids[index]; }
    
    return index;
  };

  implementation.connected = function(a, b){
    return this.findRoot(a) === this.findRoot(b);
  };

  implementation.union = function(a, b){ 
    rootA = this.findRoot(a); 
    rootB = this.findRoot(b); 

    if(rootA === rootB){
      return false;
    } else {
      return this.ids[rootB] = rootA;
    }
  };

  return implementation;
};