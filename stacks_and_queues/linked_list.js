'use strict';

var LinkedList, oldLast, node, count, currentNode;

module.exports = LinkedList = function(){
  this.lastNode = null;
};

LinkedList.prototype = {
  Node: function(value){
    this.value = value;
    this.prev = null;
  },

  isEmpty: function(){
    return (this.lastNode === null);
  },

  push: function(value){
    node = new this.Node(value);
    oldLast = this.lastNode;
    this.lastNode = node;
    this.lastNode.prev = oldLast;

    return this.lastNode;
  },

  pop: function(){
    if(this.isEmpty()) { return null; }
    oldLast = this.lastNode;
    this.lastNode = oldLast.prev;
    return oldLast;
  },

  size: function(){
    if(this.isEmpty()){ return 0; }

    count = 1;
    currentNode = this.lastNode;
    while(currentNode.prev !== null){
      currentNode = currentNode.prev; 
      ++count;
    }

    return count;
  }
};
