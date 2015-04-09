var implementation, i, rootA, rootB;

module.exports = function(n){
  'use strict';

  implementation = { ids: [], size: [] };

  for(i = 0; i < n; i++){ 
    implementation.ids[i] = i; 
    implementation.size[i] = 1;
  }

  implementation.findRoot = function(index){
    while(index !== this.ids[index]){ index = this.ids[index]; }

    return index;
  };

  implementation.connected = function(a, b){
    return this.findRoot(a) === this.findRoot(b);
  };

  implementation.union = function(a, b){
    rootA = this.findRoot(a);
    rootB = this.findRoot(b);

    /*
      Weighting: always make the smaller tree
      a child of the larger tree to minimize the
      total height of the combined tree.
    */
    if(this.size[rootA] >= this.size[rootB]){
      this.size[rootA] += this.size[rootB];
      this.ids[rootB] = rootA; 
      return this.ids[rootB];
    } else {
      this.size[rootB] += this.size[rootA];
      this.ids[rootA] = rootB; 
      return this.ids[rootA];
    }
  };

  return implementation;
};
