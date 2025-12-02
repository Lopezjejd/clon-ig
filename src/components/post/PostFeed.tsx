"use client"
import type {Post} from "@/types/Post"
import Image from "next/image";
import type { Comment } from "@/types/Comment";
import UserProfile from "../user/UserProfile";
import CommentTextarea from "./CommentTextarea";
import UsePostStore from "@/store/usePost";
import ScrollableModal from "./ScrollableModal";
import { useState } from "react";
interface Props{
    post:Post;
}
export default function PostFeed({post}:Props){
    const {toggleLike,addComment}=UsePostStore(); 
    const handleAddComment=(text:string)=>{
        const newComment:Comment={
            id:post.user.id + '-' + Date.now().toString(),
            user:post.user,
            text:text,
            timeAgo:Date.now().toString()
        };
        addComment(post.id,newComment);
        }
        const [isModalOpen, setIsModalOpen] = useState(false);
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
return (
        <article className="
        m-auto
        max-w-xl
        p-10
         flex flex-col justify-center"
    >
      <UserProfile user={post.user}></UserProfile>
         <Image
         className="w-full"
         src={post.imageUrl}
         alt={`publicasion de ${post.user.username}`}
         width={300}
         height={300}
         ></Image>
         <div className="flex flex-col justify-center
          p-5 rounded-b-2xl">
            <p className="font-bold">{post.caption}</p>
            <span className="flex m-2 gap-4">
                <button className="cursor-pointer"
                onClick={() => toggleLike(post.id)}
            >❤️ {post.likes}
                </button>
                <button className="cursor-pointer inline-flex  items-center gap-1 ml-4"
                onClick={openModal}
                >
                
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path 
    fill="currentColor"
    d="M20.656 2.344H3.344C2.612 2.344 2 2.956 2 3.688V16.312C2 17.044 2.612 17.656 3.344 17.656H6.625V21.656L11.312 17.656H20.656C21.388 17.656 22 17.044 22 16.312V3.688C22 2.956 21.388 2.344 20.656 2.344ZM7 9H17V11H7V9ZM7 13H14V15H7V13Z"
  />
</svg>
   { post.comments.length}
                </button>
               </span>


            <ScrollableModal isOpen={isModalOpen} onClose={closeModal} title="Comments">

            <ul className=" relative p-3 w-full h-100 overflow-y-auto flex flex-col gap-4">
             {post.comments.length > 0 && post.comments.map((comment:Comment)=>{
              return (
                        <li
                    key={comment.id}

                    >
                     <span className="flex gap-3"
                     >
     <Image
         src={comment.user.profilePicture}
         alt={`foto de perfil de ${post.user.username}`}
         width={40}
         height={40}
         className="h-10 w-10 rounded-full object-cover cursor-pointer"
         />
                        {comment.user.username}: <p>{comment.text}</p>
                        
                     </span>
                    
                    </li>
              )
                })}
                   <CommentTextarea onPost={handleAddComment} className="z-20 fixed bottom-20 right-[10%]" ></CommentTextarea>
            </ul>
          
            </ScrollableModal>
             <CommentTextarea onPost={handleAddComment} ></CommentTextarea>
         </div>
    </article>
)
}