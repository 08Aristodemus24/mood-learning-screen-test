let users_total_likes = [
    {
        likes: 10,
        post: 'post 1',
    },
    {
        likes: 2,
        post: 'post 2',
    },
    {
        likes: 30,
        post: 'post 3',
    },
    {
        likes: 9,
        post: 'post 4',
    },
    {
        likes: 50,
        post: 'post 5',
    },
    {
        likes: 40,
        post: 'post 6',
    },
    {
        likes: 14,
        post: 'post 7',
    },
];


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

function partition(users, lo, hi, key){
    /*
    partitions the given array through the generated pivot

    args:
        users - an iterable of objects containing the number of likes and posts 
        of users
        
        key - the key in which the sorting function should base from, or when
        the comparison happens between two values this is what is used

        hi - the index to the right of the current pivot index of the
        array
        
        lo - the index to the left of the current pivot index of the
        array

        returns the index of the sorted partitions of the array
    */

    // generate
    let pivot = Math.floor(Math.random() * (hi - lo) + lo);
    swap(users, pivot, hi);

    // set i pointer to the beginning of the scan to compare to the pivot
    let i = lo;

    // set j pionter to the last end of the scan to compare to the pivot
    let j = hi - 1; 

    // when i pointer has greater index it has 
    // crossed the border of the j pointer
    while(i <= j){
        // if i and j ptrs are < and >= to pivot then increm and decrem
        if(users[i][key] >= users[hi][key] && users[j][key] < users[hi][key]){
            swap(users, i, j);
            ++i;
        }

        // check if either of the two, needs to be incremented or decremented or both
        else if(users[i][key] >= users[hi][key] && users[j][key] >= users[hi][key]){
            --j;
        }

        else if(users[j][key] < users[hi][key] && users[i][key] < users[hi][key]){
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

function sort(users, lo, hi, key){
    /* 
    args:
        implements the quicksort sorting algorithm

        users - an iterable of objects containing the number of likes and posts 
        of users
        
        hi - the index to the right of the current pivot index of the
        array
        
        lo - the index to the left of the current pivot index of the
        array

        key - key of the iterable of objects to use in comparing two values with

        note: this function modifies the array in place and does not return
        a new copy fo the array
    */

    // if lo is greater than hi, it means array length reached 1
    if(lo < hi){
        fixed = partition(users, lo, hi, key);

        // processes the sorted left side of the pivot
        sort(users, lo, fixed - 1, key);

        // processes the sorted right side of the pivot
        sort(users, fixed + 1, hi, key);
    }
}

const sort_button = document.getElementById("sort-button");
sort_button.addEventListener('click', () => {
    console.log(users_total_likes);
    sort(users_total_likes, 0, users_total_likes.length - 1, 'likes');
    console.log(users_total_likes);
});