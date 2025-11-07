import { Post } from "@/types/Post";
import { MOCK_FEED_POSTS } from "../data/feedData";
import FeedMain from "@/components/post/PostFeedContainer";

import StoriesBar from "@/components/stories/StoriesBar";
export default async function FeedMainPage(){

return(
    
<section>
    <StoriesBar></StoriesBar>
    <FeedMain initialPosts={MOCK_FEED_POSTS}></FeedMain>
</section>
)

}