import React from 'react';

export default function CompareGithub(user1, user2){
    let scoreUser1 = 0;
    let scoreUser2 = 0;

    // 1. Check number of repos
    if(user1.public_repos === user2.public_repos){
        scoreUser1 += 1;
        scoreUser2 += 1;
    } else if(user1.public_repos > user2.public_repos){
        scoreUser1 += 2;
    } else if(user1.public_repos < user2.public_repos){
        scoreUser2 += 2;
    }

    // 2. Check if user has a blog of his own
    if(user1.blog!=="" && user2.blog!==""){
        scoreUser1 += 1;
        scoreUser2 += 1;
    } else if(user1.blog !== ""){
        scoreUser1 += 2;
    } else if(user2.blog !== ""){
        scoreUser2 += 2;
    }

    // 3. Check difference of followers and following
    const diffOfFol1 = user1.followers - user1.following;
    const diffOfFol2 = user2.followers - user2.following;

    if(diffOfFol1 == diffOfFol2){
        scoreUser1 += 1;
        scoreUser2 += 1;
    } else if(diffOfFol1 > diffOfFol2){
        scoreUser1 += 2;
    } else if(diffOfFol2 < diffOfFol1){
        scoreUser2 += 2;
    }

    // 4. Check if the user has a company of his own
    if(user1.company != null && user2.company != null){
        scoreUser1 += 1;
        scoreUser2 += 1;
    } else if(user1.company != null){
        scoreUser1 += 2;
    } else if(user2.company != null){
        scoreUser2 += 2;
    }

    return ({
        scoreUser1,
        scoreUser2
    });

}