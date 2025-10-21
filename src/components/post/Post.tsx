"use client"
import type {Post} from "@/types/Post"
import Image from "next/image";

interface Props{
    post:Post;
}
export default function Post({post}:Props){
    <article>
        <div className="flex w-full gap-1">
         <Image
         src={post.user.profilePicture}
         alt={`foto de perfil de ${post.user.username}`}
         width={40}
         height={40}
         className="h-10 w-10 rounded-full object-cover cursor-pointer"
         />
         <span>{post.user.username}</span>
         <span>{post.timeAgo}</span>
        </div>
         <Image
         src={post.imageUrl}
         alt={`publicasion de ${post.user.username}`}
         width={100}
         height={100}
         ></Image>
    </article>
}