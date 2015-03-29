# Bags, stacks and queues

## Stacks

Below are two implementations which set out to satisfy the following API:

- `push(x)` adds *x* to the stack and returns *x*

- `pop()` removes topmost item from the stack and returns that item

- `isEmpty()` returns a boolean

- `size()` returns the number of elements in the stack

### A linked list implementation

Linked lists are a data structure where each element in the list is comprised of two properties: one containing the value associated with that element, and another containing a *pointer* or reference to the next element in the list.

Linked lists are best used in scenarios where you need to perform many updates to your data set, either deletions or insertions, and where the order of the elements if significant. A great example is the to-do list [problem](http://programmers.stackexchange.com/questions/128520/what-are-concrete-examples-of-use-cases-of-linked-lists), where you need to repeatedly add and remove items from your to-do list, and where the errands must be run in a particular order. 

The advantage linked lists provide for repeated updates is that they don't need to re-order the entire data set in memory when an element is added or removed. They only need to update a single element's pointer. This means that inserts and deletions take constant time. 

Arrays on the other hand need to reorder all elements that appear after the element being updated (inserted or deleted), meaning that in the worst case scenario insertions and deletions would take linear time. For example removing the first item in the array means that every other element would need to have its index decremented. That's *n* operations where *n* is the length of the array - linear time. 

However, linked lists are not as efficient as arrays when iterating over an entire collection and require more memory as they have the overhead of creating a pointer to the next element in the list. An even bigger caveat for using linked lists is their inability to quickly find the value at a given index as an array can. 

Arrays can find an element by index in constant time, whereas in the worst case scenario a linked list requires linear time to do so as it can only arrive at a given element by starting at one end of the list and following each reference until the desired valued is found - linear time.

So, after all of that, here's an overview of the linked-list implementation:

- The constructor: assigns `last` to null.

- Node: an object with an `item` (string) property and a `prev` property which references another `Node` object.

- `isEmpty()`:  Is `last` null?

- `push(*string*)`: Saves a reference to `last` in a new variable, reassigns `last` to a new Node with `item` of *string* and `prev` of the original Node. Returns the value of the new `last` Node's `.string` property.

- `pop()`: Saves a reference to `last.item` in a variable, reassigns `last` to `last.prev` and returns the `item` value that was saved as a variable.

- `size()`: If `isEmpty()` return 0, else create a `counter` variable with a value of 1 and a `currentNode` variable assigned to `last`. Increment the counter and reassign `currentNode` every time `currentNode.prev` is not null, else return `counter`.

### An array implementation

First some background on arrays. Java and C-family arrays are **static**, they need to be instantiated at a specific length and you can't resize them. There are already implementations in Java for dynamic arrays, but if you're using the default array class you'll need to implement resizing yourself. Why does this matter for higher level languages like Ruby, Python and JavaScript? Well, they are written in or implemented in lower-level languages like C and C++, so it's good to know what's going on under the hood. Although we (or is that just me?) seldom think about the underlying implementation of arrays in higher level languages such as JavaScript the details are actually important to consider. 

A couple more interesting point to consider when thinking about arrays is literal construction versus instantiation, and how arrays compare to objects or hash maps for certain operations. Running `node ./literal_vs_instance.js` will provide some benchmarks on both instantiating and accessing various types of arrays and a hash map. Long story short, array literals are the quickest to instantiate or loop over, but hash maps provide the fastest access to individual elements ...no surprises there. 

Note that performance does differ from engine to engine as you can see [here](http://news.qooxdoo.org/javascript-array-performance-oddities-characteristics) although it appears that in 2010 when that article was written V8 was king performance-wise for these particluar scenarios.

Now, without further adieu, on to the implementation of a stack with dynamically sized array.

- The constructor instantiates array `stack` with a specified capacity and an index *N*.

- If we were implementing this is Java (as the Coursera course does) having to pass in a capacity for the array would be a defect. For this assignment you don't want the client to have to pass in an array length. That breaks the API, and more importantly forces the client to choose some amount of memory to allocate for the stack. What if they choose an insufficient amount? Or a humongous amount to be "safe"? A better solution is to implement a **dynamic** array that resizes itself automatically, never allowing the array to restrict the size of the stack, and ensuring that too much memory is never wasted with empty values.

- `isEmpty()`: N == 0?

- `push(*string*)`: Assign `stack[N++]` to *string* (assign then increment).

- `pop()`: Assign `stack[N--]` to `null` (assign then decrement) IF N > 0.

- `size()`: return N

### Implementing a dynamic (automatically resized) array using static arrays

Resizing a static array entails creating a new array of the desired size and then copying each item from the original array over to the new array. This is an expensive operation and so we don't want to have to perform the operation frequently. Doubling the array size on `push()` when the array is full (`N == array.length - 1`) will allow many more `push()` operations before another increase in array size is required. Similarly halving the array size on `pop()` when the array is only a quarter full (`N == array.length / 4`) will allow for many `pop()` operations before another reduction in size is required.

Doubling only when the array is full makes intuitive sense (you have no more room in the array and therefore you must double), but why halve the array when it is a quarter full? Why not halve the array when it is only half full to better minimize wasted memory space. Halving only when the array is quarter full helps to avoid *thrashing*. 

Thrashing is alternating calls `pop()` and `push()` on a *half-full + 1* array. Calling `pop()` on a half-full + 1 stack halves it, leaving you with a full stack. Subsequently calling `push()` will double the array, making the stack half-full again. This process could repeat many times, being very costly. To avoid thrashing you want the capacity threshold for reducing the size of the array to be different than the resulting capacity from increasing the size of the array.

### Performance comparison on the linked-list and dynamic array implementations of a stack

This is a case of consistency (linked lists) versus better amortized performance (arrays). Because our dynamic arrays periodically need to perform expensive resizing operations, which involve creating new arrays and copying over all elements from the original array, there are spikes in the time taken to complete `push()` and `pop()` operations when resizing is required.

By contrast, linked lists may have lower average performance, but do not experience the delays caused by resizing. This makes each implementation more appropriate for certain use cases. If it is unacceptable for the client to experience slower performance on any one given operation than linked lists are probably the way to go. If only average performance matters, than our dynamic array implementation is likely preferable.

## Queues

Largely the same for both implementations, see the code. For linked lists make sure you keep a reference to both the first and list elements to avoid needing to traverse the entire list to the element at the opposite end.

## Djikstra's Algorithm

A way to process arithmetic operations with parentheses using two stacks. It also gives you some insight into how compilers work, processing characters and performing differenct actions based on what that character is.

Djikstra's algorithm has a stack for *operands* (integers or doubles in the simplest case), and parses an input string one character at a time. If a left parentheses is encountered it is ignored, if an operand is encountered it is pushed to the stack, and if a right parentheses is encountered ...magic happens. When you encounter a right parentheses you pop the two most recent operands off of the stack and apply the operator to those operands, with the operator going between the two and the most recenet operand coming after the operator.
