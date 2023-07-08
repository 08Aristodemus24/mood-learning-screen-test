const randomIntArrayInRange = (min, max, n=1) =>
    Array.from(
        { length: n },
        () => Math.floor(Math.random() * (max - min + 1)) + min
);

let users_total_likes = randomIntArrayInRange(0, 100, 2);



function swap(arr, i, j){
    /* 
    this is a utility funciton to swap elements in an array
    given the two elements indeces i and j

    args: 
        arr - array to swap the two elements in
        i - index of element 1
        j - index of element 2

    note: this modifies the array in place so no new copy array 
    of the array is returned
    */

    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function partition(users, lo, hi){
    // quick sort here
    let pivot = Math.floor(Math.random() * (hi - lo) + lo);
    swap(users, pivot, hi);

    let i = lo;

    // set j pionter to the last end of the scan
    let j = hi - 1;

    
    // console.log(`${users[i][key]} at index ${i}`);

    // when i pointer has greater index it has crossed the 
    // border of the j pointer
    while(i <= j){
        // if i and j ptrs are < and >= to pivot then increm and decrem
        if(users[i] >= users[hi] && users[j] < users[hi]){
            swap(users, i, j);
            ++i;
        }

        // check if either of the two, needs to be incremented or decremented or both
        else if(users[i] >= users[hi] && users[j] >= users[hi]){
            --j;
        }

        else if(users[j] < users[hi] && users[i] < users[hi]){
            ++i;
        }

        else{
            --j;
            ++i;
        }
    }

    // swap pivot element located in [hi] and swap with i
    swap(users, i, hi);

    // return new position of fixed pivot element
    return i;
}

function sort(users, lo, hi){
    /* 
    args:
        implements the quicksort sorting algorithm

        users - an iterable of objects containing the id and posts of users
        key - the key in which the sorting function should base from, or when
        the comparison happens between two values this is what is used

        lo -
        
        hi -

        key - key of the iterable of objects to use in comparing two values with

        note: this function modifies the array in place and does not return
        a new copy fo the array
    */

    // if lo is greater than hi, it means array length reached 1
    if(lo < hi){
        fixed = partition(users, lo, hi);

        // processes the sorted left side of the pivot
        sort(users, lo, fixed - 1);

        // processes the sorted right side of the pivot
        sort(users, fixed + 1, hi);
    }
}


// const sort_button = document.getElementById("sort-button");
// sort_button.addEventListener('click', () => {
//     console.log(users_total_likes);
//     sort(users_total_likes, 0, users_total_likes.length - 1, 'likes');
//     console.log(users_total_likes);
// });

console.log(users_total_likes);
sort(users_total_likes, 0, users_total_likes.length - 1);
console.log(users_total_likes);