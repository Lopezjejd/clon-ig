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
        <article className="bg-gray-200
        m-auto
        max-w-xl
        p-10
        text-black flex flex-col justify-center"
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
         bg-gray-300 p-5 rounded-b-2xl">
            <p className="font-bold">{post.caption}</p>
            <span className="flex m-2 gap-4">
                <button className="cursor-pointer"
                onClick={() => toggleLike(post.id)}
            >❤️ {post.likes}
                </button>
                <button className="cursor-pointer inline-flex  items-center gap-1 ml-4"
                onClick={openModal}
                >
                
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" role="img">
  <title>Comentario</title>
  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 21l3-4h7" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 7h8" fill="none" stroke="#000" stroke-width="1.4" stroke-linecap="round" />
  <path d="M8 10h6" fill="none" stroke="#000" stroke-width="1.4" stroke-linecap="round" />
</svg>
   { post.comments.length}
                </button>
               </span>


            <ScrollableModal isOpen={isModalOpen} onClose={closeModal} title="Comments">

            <ul className="bg-gray-200 p-3 w-full h-full overflow-y-auto flex flex-col gap-4">
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
                   <CommentTextarea onPost={handleAddComment} className="" ></CommentTextarea>
            </ul>
          
            </ScrollableModal>
             <CommentTextarea onPost={handleAddComment} ></CommentTextarea>
         </div>
    </article>
)
}