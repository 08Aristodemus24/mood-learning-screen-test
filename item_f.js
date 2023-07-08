const users = [
    {
        id: 1,
        posts: [
            {userId: 1, likes: 10, comments: 5},
            {userId: 1, likes: 20, comments: 3},
            {userId: 1, likes: 15, comments: 2}
        ]
    },
    {
        id: 2,
        posts: [
            {userId: 2, likes: 5, comments: 2},
            {userId: 2, likes: 8, comments: 4},
        ]
    },
    {
        id: 3,
        posts: [
            {userId: 3, likes: 12, comments: 6},
            {userId: 3, likes: 8, comments: 3},
            {userId: 3, likes: 10, comments: 2},
            {userId: 3, likes: 5, comments: 1}
        ]
    },
    {
        id: 4,
        posts: [
            {userId: 4, likes: 7, comments: 9},
            {userId: 4, likes: 12, comments: 6},
            {userId: 4, likes: 30, comments: 12}
        ]
    },
    {
        id: 5,
        posts: [
            {userId: 5, likes: 6, comments: 9},
            {userId: 5, likes: 12, comments: 16},
        ]
    },
    {
        id: 6,
        posts: [
            {userId: 6, likes: 92, comments: 66},
            {userId: 6, likes: 80, comments: 53},
            {userId: 6, likes: 30, comments: 22},
            {userId: 6, likes: 45, comments: 31}
        ]
    },
    {
        id: 7,
        posts: [
            {userId: 7, likes: 20, comments: 11},
            {userId: 7, likes: 23, comments: 16},
            {userId: 7, likes: 16, comments: 9}
        ]
    },
    {
        id: 8,
        posts: [
            {userId: 8, likes: 5, comments: 0},
            {userId: 8, likes: 8, comments: 4},
            {userId: 8, likes: 19, comments: 10},
            {userId: 8, likes: 32, comments: 12}
        ]
    },
    {
        id: 9,
        posts: [
            {userId: 9, likes: 112, comments: 69},
            {userId: 9, likes: 228, comments: 100},
            {userId: 9, likes: 310, comments: 138},
            {userId: 9, likes: 225, comments: 120}
        ]
    },
    {
        id: 10,
        posts: [
            {userId: 10, likes: 30, comments: 15},
            {userId: 10, likes: 101, comments: 13},
            {userId: 10, likes: 90, comments: 32},
            {userId: 10, likes: 65, comments: 55},
            {userId: 10, likes: 42, comments: 23},
            {userId: 10, likes: 30, comments: 12},
        ]
    },
    {
        id: 11,
        posts: [
            {userId: 11, likes: 5, comments: 2},
            {userId: 11, likes: 9, comments: 3},
        ]
    },
    {
        id: 12,
        posts: [
            {userId: 12, likes: 92, comments: 62},
            {userId: 12, likes: 68, comments: 33},
            {userId: 12, likes: 30, comments: 22},
            {userId: 12, likes: 45, comments: 19}
        ]
    },
]

function avg_eng_rate(users){
    /* 
    calculates the average engagement rate per post of each user defined
    by the formula eng_rate = (total_comments * total_likes) / num_of_posts

    users - takes in an iterable of objects containign the id and posts
    of a certain user where each users posts also contain an array of
    objects containing their userId, number of likes for each post, and
    number of comments
    
    returns the average engagement rate for each. Once executed each user 
    will now have the following information returned
    {
        id: 1,
        posts: [
            {id: 1, avg_eng_rate: 34.3},
            {id: 1, avg_eng_rate: 34.3},
            {id: 1, avg_eng_rate: 34.3},
            {id: 1, avg_eng_rate: 34.3},
        ]
    }
    */

    let users_avg_eng_rate = [];
    
    for(let user of users){
        // get total num of posts of user
        num_of_posts = user['posts'].length;

        // construct an empty array for the array of posts that will
        // contain the id of user and each of their posts avg_eng_rate
        let user_avg_eng_rate = {
            id: user['id'],
            posts: []
        }

        for(let i = 0; i < num_of_posts; ++i){
            let temp = {};
            temp['id'] = user['id'];
            temp['avg_eng_rate'] = (user['posts'][i]['likes'] * user['posts'][i]['comments']) / num_of_posts;
            user_avg_eng_rate['posts'].push(temp);

            // console.log(temp);
        }
        // console.log('\n');
        
        // append new dicitonary/object of id and posts containign the id also 
        // of user and their eachg of their posts average engagement rate
        users_avg_eng_rate.push(user_avg_eng_rate);
    }

    return users_avg_eng_rate;
}



function view_avg_eng(users_avg_eng_rate){

    for(let user of users_avg_eng_rate){
        console.log(`user ${user['id']}'s posts average engagement rate: `)
        console.log(user['posts']);
        console.log('\n');
    }
}



const users_avg_eng_rate = avg_eng_rate(users);
view_avg_eng(users_avg_eng_rate);