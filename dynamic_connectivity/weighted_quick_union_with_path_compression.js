var implementation, i, rootA, rootB;

module.exports = function(n){
  'use strict';

  implementation = { ids: [], size: [] };

  for(i = 0; i < n; i++){ 
    implementation.ids[i] = i; 
    implementation.size[i] = 1;
  }

  implementation.findRoot = function(index){
    while(index !== this.ids[index]){ 
      /* 
        Path compression: rather than simply returning the id of a node's root,
        as you traverse up the tree, set each node's id to its parent's id. This
        means the next call to findRoot() will arrive  at the root of the tree 
        more quickly.
      */
      this.ids[index] = this.ids[this.ids[index]];
      index = this.ids[index]; 
    }

    return index;
  };

  implementation.connected = function(a, b){
    return this.findRoot(a) === this.findRoot(b);
  };

  implementation.union = function(a, b){
    rootA = this.findRoot(a);
    rootB = this.findRoot(b);

    if(this.size[rootA] >= this.size[rootB]){
      this.size[rootA] += this.size[rootB];
      this.ids[rootB] = rootA;
      return this.ids[rootB]; 
    } else {
      this.size[rootB] += this.size[rootA];
      this.ids[rootA] = rootB;
      return this.ids[rootA] ;
    }
  };

  return implementation;
};
