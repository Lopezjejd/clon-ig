// EN: data/storiesData.ts - MISMA ESTRUCTURA QUE feedData.ts
import { Story } from "@/types/Story";
import { User } from "@/types/User";
import { MOCK_USERS } from "./UsersData";

export const mockStories: Story[] = [
  {
    id: '1',
    userId: MOCK_USERS[0].id,           // Reutiliza IDs de users existentes
    mediaUrl: '/stories/1.jpg',
    createdAt: new Date(),
    // ... usa misma estructura de mock data
  }
];

