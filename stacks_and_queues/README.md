# Bags, stacks and queues

## Stacks

Below are two implementations which set out to satisfy the following API:

- `push()`

- `pop()`

- `isEmpty()`

- `size()`

## A linked list implementation

- Constructor: assigns `last` to null.

- Node (inner class): an object with an `item` (string) property and a `prev` property which references another `Node` object.

- isEmpty():  Is `last` null?

- push(*string*): Saves a reference to `last` in a new variable, reassigns `last` to a new Node with `item` of *string* and `prev` of the original Node. Returns the value of the new `last` Node's `.string` property.

- pop(): Saves a reference to `last.item` in a variable, reassigns `last` to `last.prev` and returns the `item` value that was saved as a variable.

- size(): If `isEmpty()` return 0, else create a `counter` variable with a value of 1 and a `currentNode` variable assigned to `last`. Increment the counter and reassign `currentNode` every time `currentNode.prev` is not null, else return `counter`.

## An array implementation

First some background on arrays. Java and C-family arrays are **static**, they need to be instantiated at a specific length and you can't resize them. There are already implementations in Java for dynamic arrays, but if you're using the default array class you'll need to implement resizing yourself. Why does this matter for higher level languages like Ruby, Python and JavaScript? Well, they are written in or implemented in lower-level languages like C and C++, so it's good to know what's going on under the hood. Although we (or is that just me?) seldom think about the underlying implementation of arrays in higher level languages such as JavaScript the details are actually important to consider. 

A couple more interesting point to consider when thinking about arrays is literal construction versus instantiation, and how arrays compare to objects or hash maps for certain operations. Running `node ./literal_vs_instance.js` will provide some benchmarks on both instantiating and accessing various types of arrays and a hash map. Long story short, array literals are the quickest to instantiate or loop over, but hash maps provide the fastest access to individual elements ...no surprises there. 

Note that performance does differ from engine to engine as you can see [here](http://news.qooxdoo.org/javascript-array-performance-oddities-characteristics) although it appears that in 2010 when that article was written V8 was king performance-wise for these particluar scenarios.

Now, without further adieu, on to the implementation of a stack with dynamically sized array.

- The constructor instantiates array `stack` with a specified capacity and an index *N*.

- If we were implementing this is Java (as the Coursera course does) having to pass in a capacity for the array would be a defect. For this assignment you don't want the client to have to pass in an array length. That breaks the API, and more importantly forces the client to choose some amount of memory to allocate for the stack. What if they choose an insufficient amount? Or a humongous amount to be "safe"? A better solution is to implement a **dynamic** array that resizes itself automatically, never allowing the array to restrict the size of the stack, and ensuring that too much memory is never wasted with empty values.

- isEmpty(): N == 0?

- push(*string*): Assign `stack[N++]` to *string* (assign then increment).

- pop(): Assign `stack[N--]` to `null` (assign then decrement) IF N > 0.

- size(): return N

## Implementing a dynamic (automatically resized) array using static arrays

Resizing a static array entails creating a new array of the desired size and then copying each item from the original array over to the new array. This is an expensive operation and so we don't want to have to perform the operation frequently. Doubling the array size on `push()` when the array is full (`N == array.length - 1`) will allow many more `push()` operations before another increase in array size is required. Similarly halving the array size on `pop()` when the array is only a quarter full (`N == array.length / 4`) will allow for many `pop()` operations before another reduction in size is required.

Doubling only when the array is full makes intuitive sense (you have no more room in the array and therefore you must double), but why halve the array when it is a quarter full? Why not halve the array when it is only half full to better minimize wasted memory space. Halving only when the array is quarter full helps to avoid *thrashing*. 

Thrashing is alternating calls `pop()` and `push()` on a *half-full + 1* array. Calling `pop()` on a half-full + 1 stack halves it, leaving you with a full stack. Subsequently calling `push()` will double the array, making the stack half-full again. This process could repeat many times, being very costly. To avoid thrashing you want the capacity threshold for reducing the size of the array to be different than the resulting capacity from increasing the size of the array.

## Performance comparison on the linked-list and dynamic array implementations of a stack

This is a case of consistency (linked lists) versus better amortized performance (arrays). Because our dynamic arrays periodically need to perform expensive resizing operations, which involve creating new arrays and copying over all elements from the original array, there are spikes in the time taken to complete `push()` and `pop()` operations when resizing is required.

By contrast, linked lists may have lower average performance, but do not experience the delays caused by resizing. This makes each implementation more appropriate for certain use cases. If it is unacceptable for the client to experience slower performance on any one given operation than linked lists are probably the way to go. If only average performance matters, than our dynamic array implementation is likely preferable.
