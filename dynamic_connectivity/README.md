# The dynamic connectibity problem

![An representation of the dynamnic connectivity problem as a grid of dots with lines between connected dots](https://31.media.tumblr.com/f1b09c2bce79c70a12d12f1599fefb80/tumblr_inline_nkhy644T041syc66m.jpg)

Given a set of nodes (perhaps represented as a grid of dots like the example above) how do you implement a method, `connected(node1, node2)`, to check if there is a connection or chain of connections between two nodes? You will also need to implement a function, `union(node1, node2)`, that will connect two dots. We'll refer to groups of connected nodes as *connected components*.

Real-world domains where the dynamic connectivity problem rears its head include:

+ Social networks - who is friends with who?
+ Computer networking - in a network built on the TCP/IP protocols which computers are connected?
+ And digital photography - which pixels are grouped together?

## To-Do
+ Add a test suite.
+ Add a description of and solution to the percolation problem.

## Solutions

All of the solutions presented here will use an array of **N** integers with the *0-based index* of each value in the array corresponding to a single node. To begin the value of each element in the array will equal its 0-based index, and these values will be referred to as *IDs*. 

The meaning of these values differs by the algorithm implemented. For the **quick-find** algorithm the array contains the integer IDs of the connected components. All nodes in a connected component will have the same value, and to start no nodes are connected, so each has its own ID. For the **quick-union** algorithms connected components are organized into tree structures and the array contains the IDs of a node's root node (more on this later).  

To run benchmarked implementations of each algorithm run `node benchmark.js <algorith_name> <N>`, where <algorithm_name> is either 'quick-find', 'quick-union', or 'weighted-quick-union', and <N> is the number of elements in the array of IDs.

### Quick-find 

Calling `union(a, b)` changes the ID of the second node to the ID of the first.  If the second node is already connected to others (it's a part of a connected component), all IDs of that connected component switch.

Calling `connected(a, b)` then simply has to compare the IDs of the two nodes and return true or false.

Quick-find, as its name implies, has a very efficient means of finding connections between nodes via `connected(a, b)`. This function takes only constant time. However, quick-find is slow at creating connections, this takes linear time (x*N) because it needs to check all elements of the array to see if they have the same ID of node b and potentially update that entry with its new ID.  

Linear time for `union(a, b)`, given the use cases (computer networking, social networking, grouping pixels, etc) for the dynamic connectivity problem, could mean that you have N nodes and **may need to make N or more connections between them**. Think of the social networking example: users will almost certainly make multipe connections to other users who are already a part of their connected component. Being connected to another user only indirectly through a connected component (a friend of a friend) isn't very fun. 

This reality makes the quick-find approach impractical for large data sets. With each call to `union(a, b)` taking linear time and being performed potentially N or more times you have a quadratic (N^2) algorithm. As such, this is an algorithm does not scale well and could not be used to solve large dynamic connectivity problems. 

Even with a very powerful computer this algorithm would likely do us no good, which raises one of the key benefits to learning algorithms: algorithmic gains in efficiency can be (and are in this case) orders of magnitude more effective than hardware improvements. Furthermore, greater memory capacity tends to develop at roughly the same rate as more powerful processors do. So, a more powerful computer might be taking on proportionately larger sets of data.

### Quick-union

With the quick-union approach we organize connected components into trees where every node has either a parent node, or is the root node of the tree. All connected nodes will have the same root. **A non-root node's value will be a reference to the 0-based index of its direct parent**, which will in turn reference its parent node's position in the array until the root node is reached.

Calling `union(a, b)` makes the second node a child of the first, effectively giving the second node and all of its connected nodes the same root as the first node. This means that in any call to `union(a, b)` only one ID ever needs to be changed, allowing the function to complete in linear (N) time in the worst case scenario (having to traverse the entire array to find that first node and switch its ID).

The trade off for this improved `union(a, b)` performance is a slower `connected(a, b)` function. Where with quick-find we could simply compare the IDs of two nodes, now we must traverse the tree of each node until we arrive at its root node's value. This is done by looking up the value of an element until that value matches the 0-based index of that element within the array, meaning that the element does not refer to any other node for its value. This approach could conceivably involve traversing all values in the array if the two connected components being compared make up the entirety of the set of nodes, and so `connected(a, b)` within quick-union takes linear time. 

### Weighted quick-union

To improve the performance of quick-union's `connected(a, b)` function we can use *weighting* of trees based on their size (number of nodes in this case, but the depth of the tree works fine too).

By always moving the smaller tree (connected component) under the larger we minimize the depth of the combined tree and therefore make the `connected(a,b)` operation faster by reducing the number of operations needed to find the root of the tree. 

This implementation entails moving the root of the smaller tree underneath **the root** of the larger, so you are only ever connecting roots. If the trees being connected are of the same size then we will make the second tree a child of the first.

### Weighted quick-union with path compression

The final iteration of the quick-union algorithm adds *path compression* to the implementation. Path compression means everey time you traverse a tree to find its root, you assign the ID of each node to that of its parent. This incurs only a constant time cost, as the algorithm is already navigating up each node of the tree and now simply needs to assign each node's ID. The benefit of doing so is greatly improved lookup time in subsequent traversals of the tree, because node's will reference the root more quickly as a result of referencing their parent's ID (which in turn references its parent's ID, etc.). This algorithm has a **log 2N** big-O notation, making it highly scalable for large data sets. Whoohoo!

## Percolation: A real-world dynamic connectivity problem


