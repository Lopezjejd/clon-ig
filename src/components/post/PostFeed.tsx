"use client"
import type {Post} from "@/types/Post"
import Image from "next/image";
import type { Comment } from "@/types/Comment";
interface Props{
    post:Post;
}
export default function PostFeed({post}:Props){
return (
        <article className="bg-gray-200
        p-10
        text-black flex flex-col justify-center"
    >
        <div className="flex w-full align-middle
        justify-left
        p-4
         gap-1">
         <Image
         src={post.user.profilePicture}
         alt={`foto de perfil de ${post.user.username}`}
         width={40}
         height={40}
         className="h-10 w-10 rounded-full object-cover cursor-pointer"
         />
         <span>{post.user.username}</span>
         <span
         className="text-center text-[10px]"
         >hace {post.timeAgo}</span>
        </div>
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
            <span>
                <button className="cursor-pointer"
            >❤️
                </button>
                {post.likes}</span>
            <ul className="bg-gray-200 p-3">
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
            </ul>
         </div>
    </article>
)
}