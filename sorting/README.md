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

+ To do this you'll need an inner loop with a variable holding the value of the starting index beginning with the first element in the array. Increment this inner index after each comparison with the element at the current index of the outerl loop.

This implementation on average takes (N^2/)4 time, but various significantly in performance based on the degree to which the array is already sorted.

Consider situations where a collection of values is for the most part sorted, except for a few elements. In practical terms perhaps the collection is periodically sorted, meaning that when new data is added *without regard to maintaining the sorted order of the array* small parts of the collection will be temporarily out of order. 

In these situations insertion sort is markedly faster than with unsorted data as each inner loop returns *as soon as a smaller value is present to left of the inner index*. Said another way, insertion sort doesn't need to search the entire collection for the smallest value, it only searches until if finds a value smaller in the subset of the array to the left of the current element. That subset will have already been sorted, allowing you to stop iterating through the inner loop as soon as a smaller value than the current one is encountered, as you're guaranteed that it is smaller than the remaining elements in that subset of the array. 

With a completely sorted collection insertion sort takes only about N time. On the other hand a reverse-sorted set of data (largest values first) will require each iteration to move the current element the full length of the subset, all the way to the left of the array. This plays out to about (N^2)/2 time, or the same performance profile offered by selection sort regardless of the degree of sorting in the given collection. 

## Shell Sort

A more complex variant of insertion sort, shell sort (named after its inventor, Donald Shell) performs a series of **h-sorts** which are themselves insertion sorts. H-sorting is a technique where instead of comparing the element at the current outer index to each element to the left one by one you compare the current element to every `h`th element to the left.

Shell sort begins with a large `h` value, so only a small number of comparisons are made for the intial insertion sort. Each subsequent insertion sort uses a signifcantly smaller `h` value until `h` is 1, meaning that every element is compared to the element immediately on its left as is the case in a normal insertion sort.

The mathematically optimal set of `h` values has not yet been proven, but we have ideas of what good sets of `h` values are. A commonly used set is the one generated by Donald Knuth's *3x + 1* factor. This means that the `h` values for an array of length `n` would be 1, 4, 13, 40, 121, etc, continuing until there are no more `h` values less than `n`.

To implement shell sort you perform an insertion sort with the largest `h` value as the amount to increment the inner index by, repeating that process with all `h` values until eventually the inner index is incremented by 1 as it would be in a normal insertion sort.

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

## Mergesort
A divide-and-conquer algorithm which, depending on your implementation, either recursively splits the given array into two sub-arrays until it is broken down into pairs of elements; or repeatedly iterates over the original array, at first comparing single elements, then pairs, then groups of four, etc., until two halves of the original array are compared. 

With either approach, adjacent sub-arrays are **merged** (and thereby sorted) by using an empty place holder array and comparing the first elements of each  sub-array, assigning the lower of the two values to the new placeholder array, and incrementing the indexes of that placeholder array and the array from which the lower value was taken.

This procedure is repeated, resulting in increasingly large sorted sub-arrays being merged together until the complete sorted array is created. Some points of interest on mergesort:

+ Worst case scenario is *N log(N)*, a linearthmic algorithm. This means your household computer can likely sort an array of billions of elements only a few minutes.

+ The main drawback to mergesort is its large memory overhead. Because of the need for a placeholder array equal to the size of the original array, you can effectively sort only a collection half the size of your availabe working memory with mergesort.

+ To reduce the memory overhead of mergesort the smallest sub-arrays, say arrays of 7 or 8 elements, can be sorted using another algorithm, such as insertion sort. This saves the creation of many small placeholder arrays which would normally be required to perform each of the merges.

+ When merging it's a good idea to first check if the largest item either sub-array is smaller then the smallest item in the other sub-array, saving time on the off chance that your sub-arrays are already sorted.

## Quicksort
Quicksort is another high performance divide-and-conquer algorithm, originally developed by [Tony Hoare](http://en.wikipedia.org/wiki/Tony_Hoare). Quicksort, unlike mergesort, is an in-place algorithm, meaning that it doesn't require a placeholder array for storing elements as they are sorted. This greatly reduces the memory requirements of the algorithm, allowing you sort a collection that occupies roughly the amount of free memory in your computer. 

In the average case quicksort is also marginally faster than mergesort (they both run in linearithmic time, but quicksort's coefficient for **N** tends to be lower).  

Quicksort works by **partitioning** the input array by treating the first element in a randomly shuffled array as the separator between two sub-arrays. The left-hand sub-array should be composed entirely of element of lesser value than the separator, and the right-hand sub-array should be composed entirely of elements of greater value than the separator.

To accomplish this quicksort uses two indexes, one located at the final element of the array and one at the first element beyond the separator. These indexes decrement and increment, respectively, until they cross (the upper index goes below the lower index). When the high index encounters a value that is less than or equal to the separator the index stops decrementing. Similarly, the lower index stops incrementing when it encounters a value greater than or equal to the separator. When both indexes have stopped at inappropriate value, they swap those values and resume decrementing/incrementing. These swaps ensure the all values higher than the separator are in the right-hand sub-array, and that all values lower than the separator are in the left-hand sub-array.

This process of partitioning is then recursively repeated on each sub-array until the entire original array is sorted.

Quicksort's worst case scenario for time taken to sort is quadratic (N^2) time and occurs when the array is already sorted, or reverse sorted, resulting in either the upper or lower index needing to compare every element in the sub-array to the partition element. For this reason quicksort's input array is actually shuffled before it is sorted.

Much like with mergesort, it is advantageous to use insertion sort on small sub-arrays (say 10 elements or less), to avoid the memory requirements of recursively partitioning a large number of sub-arrays.

## Dealing with large numbers of duplicate values
A major drawback to the quicksort implementation discussed above is that in scenarios where there are many duplicate values those duplicates will end up (multiple times) in both the left and right-hand sub-arrays and will require further sorting in subsequent partitionings.

This means that for some datasets with many duplicate values quicksort can take nearly quadratic time, even if the array is randomly shuffled.

[Edsger Djikstra](http://en.wikipedia.org/wiki/Edsger_W._Dijkstra), a smart dude, came up with an alternate quicksort implementation featuring **3-way partitioning** that better handles for large numbers of duplicate values.

The 3-way partition approach entails employing three indexes: `l` to mark the upper bound of a left-hand partition used for storing values less than the separator, `r` to mark the lower bound of a right-hand partition used for storing values greater than the separator, and `i` for marking the current element being compared to the separator.

Both the `l` and `i` begin at the 0th element in the shuffled array, which is the separator. `r` begins at the last element. When the element at `i` is equal to the separator (which is always true at the outset of the algorithm), `i` is incremented. When it is less than the separator the `i`th element is swapped with the element at `l` and both `i` and `l` are incremented. When the `i`th element is greater than the separator it is swapped with the element at `r` and `r` is decremented. This procedure continues until `r` and `i` cross, indicating that all element have been compared, and that all elements are in the appropriate partition. 

As with the original implementation of quicksort, recursively repeat this process until the partitions are only single elements, and therefore all elements have been sorted.

## Selection with quicksort/quickselect
Find or **select** the *kth* largest value in an array. So, `k = 0` is the minimum, `k = array.length - 1` is the maximum, etc.

At first thought you might simply find the minimum or maximum value and discard it `k` times until you've found the `k` largest or smallest value. However, this algorithm would require roughly **0.5 K^2** time to iterate through the entire remainder of the collection `k` times.

A better approch would be to modify quicksort for use a selection algorithm: **quickselect**. Quickselect operates largely the same as quicksort does, however after each partitioning the separator is compared to the value at `array[k]`. 

If the separator is less than `array[k]` quickselect will proceed to partition only the larger (right-hand) sub-array, as it will be guaranteed that only values smaller than the separator (and therefore smaller than `array[k]`) will be in the left-hand sub-array. If the separator is greater than `array[k]` you follow the same reasoning and partition the left-hand sub-array, as you know that only values smaller than the separator will be present there.

If after any partition the separator element is equal to the `array[k]` element being search for the function returns the separator. In this way we can achieve roughly linear time for an implementation of select. 
