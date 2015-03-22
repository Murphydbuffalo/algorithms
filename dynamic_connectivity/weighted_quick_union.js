var implementation, i, position, parent, root, count, treeA, treeB;

module.exports = function(n){
  'use strict';

  implementation = { ids: new Array(n) };

  for(i = 0; i < n; i++){ implementation.ids[i] = i; }

  implementation.tree = function(index){
    root = null;
    count = 1;
    while(root === null){
      parent = this.ids[index];
      if(parent === index){ 
        root = parent;
        return { root: root, size: count };
      } else {
        count++;
        index = parent;
      }
    }
  };

  implementation.connected = function(a, b){
    return this.findRoot(a) === this.findRoot(b);
  };

  implementation.union = function(a, b){
    treeA = this.tree(a);
    treeB = this.tree(b);
    if(treeA.size >= treeB.size){
      return this.ids[treeB.root] = this.ids[treeA.root]; 
    } else {
      return this.ids[treeA.root] = this.ids[treeB.root]; 
    }
  };

  return implementation;
};