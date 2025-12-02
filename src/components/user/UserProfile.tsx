"use client";

import React from "react";
import Image from "next/image";
import type { User } from "@/types/User";
import NextLink from "next/link";
import Link from "next/link";

type Props = {
  user: User;
  showFullName?: boolean; // por defecto true
  onClick?: () => void; // opcional: si querés manejar click sin navegar
  className?: string;
};

export default function UserProfile({
  user,
  showFullName = true,
  onClick,
  className = "",
}: Props) {
  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.username.slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/profile/${encodeURIComponent(user.username)}-${user.id}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex z-50 items-center gap-2 cursor-pointer hover:opacity-95 ${className}`}
      aria-label={`Ver perfil de ${user.username}`}
    >
      {/* Contenedor del avatar: tamaño fijo (48px) y si tiene stories muestra el degradado */}
      <div
        className={`relative flex items-center mb-0.5 justify-center w-12 h-12 rounded-full ${
          user.stories ? "p-0.5 bg-linear-to-tr from-yellow-400 to-purple-600" : ""
        }`}
        aria-hidden
      >
        {/* Fondo blanco interior para separar el degradado */}
        <div className="w-full h-full rounded-full bg-white overflow-hidden">
          {user.profilePicture ? (
            <div className="relative w-full h-full">
              <Image
                src={user.profilePicture}
                alt={user.fullName ?? user.username}
                fill
                className="object-cover object-center rounded-full"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-700">
              <span className="font-semibold">{initials}</span>
            </div>
          )}
        </div>
      </div>

      {/* Textos */}
      <div className="min-w-0">
        <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          {user.username}
        </div>
        {showFullName ? (
          <div className="text-xs text-gray-500 truncate">{user.fullName}</div>
        ) : null}
      </div>
    </Link>
  );
}
