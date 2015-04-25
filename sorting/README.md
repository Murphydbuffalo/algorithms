# Sorting Algorithms, yo!
Running `benchmark.js` will let you see the performance characteristics of different sorting algorithms for partially sorted, unsorted and reverse sorted arrays of integers.

`npm install` and run `node_modules/babel/bin/babel-node benchmark.js` (you can just use `babel-node` if you have the `babel` module installed globally). By default this will use the selection sort algorithm (discussed below) on 10 integer long arrays.

You can pass a number of options to `benchmark.js`:

+ Specify the name of the algorithm you want to use with the `--algorithm` or `-a` flags. Accepted algorithm names are: 'selection', 'insertion', 'shell', 'merge' and 'quick'. 

+ Pass the desired size of the arrays to the `--number-elements` or `-n` flags.

+ Use `--array-type` or `-t` to specify the degree to which the original array is sorted. Valid options are 'unsorted', 'reverse', 'partial', and 'all'. `--array-type` defaults to 'unsorted'.

+ Set the `--logging` or `-l` flag to log out both the original array and the sorted array produced by the algorithm. This is not enabled by default.

For example `babel-node benchmark.js -a insertion -n 1000 -t partial -l` would run insertion sort on a partially sorted 1000 element array, and would display both the original and sorted arrays.

## Selection Sort

+ Implement a `minimum(index)` method which iterates through the collection from a given index onward and finds the smallest value. This is done by assigning the first value to a variable `min` and comparing each subsequent value to that variable, reassigning to a lower value if one is encountered.

+ Implement `swap(a, b)` should store value `a` in a variable and then assign `a` to the value of `b` and `b` to the original value of `a` stored in that variable.

+ For each element in the collection, iterating with the index `i`, call `minimum` to find smallest value between `i` and the end of the array and `swap` that minimum value with `i`. In effect this will loop over the whole collection, find the smallest value and place it at the beginning of the array, and repeat the process with the subset of the collection to the right of the first element.

+ Selection sort takes roughly (N^2)/2 time, as for every element it must iterate through all elements in the colletion greater than the current index, `i`. As `i` increases that subset of elements decreases in size so that on average `minimum` must only iterate through N/2 elements.

It is important to note that whether or not the given array is already sorted the selection short algorithm will *still take quadratic time*. It always scans all elements at indexes greater than `i`, regardless of the order they are in, because it must check for the **minimum** value on each subset of the array and not simply a value that is less than the previous element in the array.

The next algorithm we explore, insertion sort, will do just that, making it significantly more performant in pre-sorted or partially sorted arrays.

## Insertion Sort

+ Iterate through the array, and compare the current element to each element *to the left* in succession, swapping if the larger value is on the right.

+ To do this you'll need an inner loop with a variable, `j` holding the value of the starting index (so equal to `i` from the outer loop) to start. Decrement this inner index after each comparison with the element at `j - 1`.

This implementation on average takes (N^2/)4 time, but various significantly in performance based on the degree to which the array is already sorted.

Consider situations where a collection of values is for the most part sorted, except for a few elements. In practical terms perhaps the collection is periodically sorted, meaning that when new data is added *without regard to maintaining the sorted order of the array* small parts of the collection will be temporarily out of order. 

In these situations insertion sort is markedly faster than with unsorted data as each inner loop returns *as soon as a smaller value is present to left of the inner index*. Said another way, insertion sort doesn't need to search the entire subset of the data for the smallest value, it only searches until if finds a value smaller than the current. 

With a completely sorted collection insertion sort takes only about N time. On the other hand a reverse-sorted set of data (largest values first) will require each iteration to move the current element the full length of the subset, all the way to the left of the array. This plays out to about (N^2)/2 time, or the same performance profile offered by selection sort regardless of the degree of sorting in the given collection. 

## Shell Sort

A more complex variant of insertion sort, shell sort (named after its inventor, Donald Shell) performs a series of **h-sorts** which are themselves insertion sorts. H-sorting is a technique where instead of comparing the element immediately previous to the current inner index, `j`, (so that's comparing `j` to the `j - 1`th element) you compare element at index `j` to the element at `j - h`.

Shell sort begins with a large `h` value, so only a small number of comparisons are made for the intial insertion sort. Each subsequent insertion sort uses a signifcantly smaller `h` value until `h` is 1, meaning that every element is compared to the element immediately on its left as is the case in a normal insertion sort.

The mathematically optimal set of `h` values has not yet been proven, but we have ideas of what good sets of `h` values are. A commonly used set is the one generated by Donald Knuth's *3x + 1* factor. This means that the `h` values for an array of length `n` would be 1, 4, 13, 40, 121, etc, continuing until there are no more `h` values less than `n`.

To implement shell sort you perform an insertion sort with the largest `h` value as the amount to decrement the inner index `j` by, repeating that process until all `h` values have been used.

In effect this performs an increasingly large number of insertion sorts on an increasingly sorted set of data, taking advantage of the fact the insertion sort performs significantly better when the data set is partially sorted. Performance of shell sort depends on the size of the data set, and the degree to which its pre-sorted, but typically is close to n^(3/2).

## Shuffling

### Sort shuffle

Assign a random value to each element in the sorted array. Then sort the array according to those randomly generated values.

### Knuth shuffle

Perform an insertion sort where the element at inner index `j` is swapped with the element at a randomly generated index between 0 and `j`.

### The importance of truly random numbers and effective shuffling algorithms

Ensure you shuffle is **uniform**, meaning it covers all elements (doesn't skip the last element), shuffles all values between index 0 and `i` for `n` iterations, and uses as good a random number as can be generated.

Good random numbers are hardware generated (using system entropy) random numbers with many possible values. Java's built in `random()` method only have 2^32 possibilities. 

What about JS? You can manually scale Math.random(), which returns the ten decimal values between 0 (inclusive) and 1 (exclusive) by multiplying the result, but:
> 
Note: Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.  
>

Better to use an encryption or hashing library that can generate random numbers from a humongous set of possible values.

## The Convex Hull

+ What is it? Given a set of points, the convex hull is the subset set of points that when connected makes up the polygon with the smallest possible area that encloses all points in the set.

+ Applications
  - Shortest path around obstacle.
  - Furthest distance between two points in a set of points.

+ The Graham Scan algorithm uses sorting to calculate the convex hull.
  - Find the point with the smallest y-coordinate.
  - Find the angle of the line connecting `p` and the next point, then reassign `p` to the second point.
  - Calculate if the connecting line is a "counter clockwise turn" or a line that doesn't break 180º when compared with the line connecting the next pair of points.

## Merge Sort (next week)

## Quick Sort (next week)
