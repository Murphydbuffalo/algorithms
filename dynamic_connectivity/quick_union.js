var implementation, i, position, parent, root, rootOfA, rootOfB;

module.exports = function(n){
  'use strict';

  implementation = { ids: new Array(n) };

  for(i = 0; i < n; i++){ implementation.ids[i] = i; }

  implementation.findRoot = function(index){
    while(root === undefined){
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
    rootOfA = this.findRoot(a);
    rootOfB = this.findRoot(b);
    return rootOfA === rootOfB;
  };

  implementation.union = function(a, b){ 
    this.ids[b] = this.ids[a]; 
    return true;
  };

  return implementation;
};