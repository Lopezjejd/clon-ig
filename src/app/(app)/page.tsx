import { Post } from "@/types/Post";
import { MOCK_FEED_POSTS } from "../data/feedData";

import PostFeed  from "@/components/post/PostFeed";
export default async function FeedMain(){
    const postUser = await MOCK_FEED_POSTS
return(
<section>
    {postUser && postUser.map((post:Post) =>{
       return <PostFeed key={post.id} post={post}></PostFeed>
    })}
</section>
)

}