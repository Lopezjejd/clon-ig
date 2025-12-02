export interface Story {
  id: string;           // necesario para updates y tracking
  mediaUrl: string;     
  createdAt: Date;      
  expiresAt?: Date;     // opcional (24h estilo IG)
  type?: "image" | "video"; // opcional útil para el viewer
}
