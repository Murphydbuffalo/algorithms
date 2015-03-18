var implementation, i, position, parent, root;

module.exports = function(n){
  'use strict';

  implementation = { ids: new Array(n) };

  for(i = 0; i < n; i++){ implementation.ids[i] = i; }

  implementation.findRoot = function(index){
    root = null
    while(root === null){
      parent = this.ids[index];
      if(parent === index){ 
        root = parent;
        return root;
      } else {
        index = parent;
      }
    }
  };

  implementation.connected = function(a, b){
    return this.findRoot(a) === this.findRoot(b);
  };

  implementation.union = function(a, b){ 
    this.ids[this.findRoot(b)] = this.ids[this.findRoot(a)]; 
    return true;
  };

  return implementation;
};