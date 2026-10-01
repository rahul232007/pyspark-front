import { Friend, FriendRequest } from '../types/friends';

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'fr_1',
    username: 'CodeSamurai',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeSamurai',
    rank: 'Gold',
    xp: 3450,
    streakDays: 12,
    status: 'online',
    lastActive: 'Just now',
  },
  {
    id: 'fr_2',
    username: 'PyKnight',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PyKnight',
    rank: 'Silver',
    xp: 2100,
    streakDays: 7,
    status: 'in_game',
    lastActive: 'In Python Quiz',
  },
  {
    id: 'fr_3',
    username: 'AlgoWizard',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlgoWizard',
    rank: 'Diamond',
    xp: 8200,
    streakDays: 24,
    status: 'offline',
    lastActive: '2 hours ago',
  },
];

export const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'req_1',
    senderId: 'usr_req_1',
    senderName: 'NeonCoder',
    senderAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonCoder',
    senderRank: 'Bronze',
    timestamp: '10 mins ago',
    status: 'pending',
  },
];

export const friendsService = {
  async getFriends(): Promise<Friend[]> {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_FRIENDS;
  },

  async getFriendRequests(): Promise<FriendRequest[]> {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_FRIEND_REQUESTS;
  },

  async searchUsers(query: string): Promise<Friend[]> {
    await new Promise((r) => setTimeout(r, 300));
    if (!query) return [];
    return [
      {
        id: `usr_search_${Date.now()}`,
        username: query + '_Spark',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${query}`,
        rank: 'Silver',
        xp: 1800,
        streakDays: 4,
        status: 'online',
        lastActive: 'Active now',
      },
    ];
  },
};
