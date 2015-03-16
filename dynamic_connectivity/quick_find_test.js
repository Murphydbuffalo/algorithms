var n = process.argv[2],
quickFind = require('./quick_find')(n);

// For a set of N nodes, a max of N-1 union operations
var numberOfUnions = Math.floor(Math.random() * n);
var randomNode = function(){
    return Math.floor(Math.random() * quickFind.ids.length);
};

console.log('Orginal set of IDs: ' + quickFind.ids + '\n');

for(var i = 0; i < numberOfUnions; i++){
    var a = randomNode(), b = randomNode();
    console.log('A is ' + a);
    console.log('B is ' + b);
    quickFind.union(a, b);
}