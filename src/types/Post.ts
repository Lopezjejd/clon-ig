import {User} from "./User"
import { Comment } from "./Comment";

export interface Post {
    id:string;
    user:User;
    imageUrl:string;
    caption:string;
    likes:number;
    isLikedByCurrentUser:boolean;
    timeAgo:string;
    comments:Comment[];

}