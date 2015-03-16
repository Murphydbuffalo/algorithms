module.exports = function(n){
    'use strict';

    var implementation = {ids: new Array(n)};

    for(var i = 0; i < n; i++){
        implementation.ids[i] = i;
    }

    implementation.connected = function(a, b){
        return this.ids[a] === this.ids[b];
    };

    implementation.union = function (a, b){
        if(implementation.connected(a, b)){ 
            console.log('Nodes already connected.');
            return false; 
        }

        var i, bValue = this.ids[b];

        for(i = 0; i < this.ids.length; i++){
            if(this.ids[i] === bValue){
                this.ids[i] = this.ids[a];
            }
        }

        console.log('New IDs array:');
        console.dir(this.ids);
        console.log('\n');

        return true;
    };

    return implementation;
};
