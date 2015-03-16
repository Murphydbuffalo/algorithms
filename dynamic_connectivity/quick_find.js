var implementation, i, index, bValue;

module.exports = function(n){
    'use strict';

    implementation = {ids: new Array(n)};

    for(i = 0; i < n; i++){
        implementation.ids[i] = i;
    }

    implementation.connected = function(a, b){
        return this.ids[a] === this.ids[b];
    };

    implementation.union = function (a, b){
        if(implementation.connected(a, b)){ 
            console.log('Nodes already connected.\n');
            return false; 
        }

        bValue = this.ids[b];

        for(index = 0; i < this.ids.length; i++){
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
