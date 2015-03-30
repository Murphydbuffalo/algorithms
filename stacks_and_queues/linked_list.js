'use strict';

var node, oldLast, count;

function Node(value){
  this.value = value;
  this.prev = null;
};

module.exports = {
  lastNode: null,

  isEmpty: function(){
    return this.lastNode === null;
  },

  push: function(value){
    node = new Node(value);

    if(this.isEmpty){
      this.lastNode = node;
    } else {
      oldLast = this.lastNode;
      node.prev = oldLast;
      this.lastNode = node;
    }

    return node;
  },

  pop: function(){
    if(this.lastNode === null) { return null; }
    oldLast = this.lastNode;
    this.lastNode = oldLast.prev;
    return oldLast;
  },

  size: function(){
    if(this.isEmpty){ return 0; }
    count = 1;
    currentNode = this.lsstNode;
    while(currentNode.prev !== null){ ++count }
    return count;
  }
};