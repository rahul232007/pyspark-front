import { RankType } from './rank';

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  rank: RankType;
  xp: number;
  streakDays: number;
  status: 'online' | 'offline' | 'in_game';
  lastActive: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRank: RankType;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}
