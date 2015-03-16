# Dynamic Connectivity

Given a set of *N* nodes with an arbitrary number of connections how do you determine if two nodes are connected?  Nodes can be connected directly or through a chain of intermediary connections. The `union` function connects two nodes and the `connected` function checks to see if two nodes are connected.

Groups of nodes connected together are referred to as *connected components*.

## Implementations

There are a few different common implementations of solutions to the dynamic connectivity problem.

+ Quick Find - All nodes are stored in an array, `ids`, which gives each node a numeric ID based on its position in the array (so within the range 0 to N - 1 for N nodes). `connected(a, b)` simply checks if the two nodes share the same ID, thus the name "quick-find".  A tradeoff of this simple `connected` method is an inefficient `union(a, b)` method which must change the ID of every node in the connected component of one of the nodes being connected. By convention this is typically the second node, `b`.

