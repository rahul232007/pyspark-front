import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Search, Check, X, UserMinus, MessageSquare } from 'lucide-react';
import { friendsService } from '../../services/friends';
import { Friend, FriendRequest } from '../../types/friends';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { Badge } from '../../components/common/Badge/Badge';
import { Loader } from '../../components/common/Loader/Loader';

export const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([friendsService.getFriends(), friendsService.getFriendRequests()]).then(
      ([fList, rList]) => {
        setFriends(fList);
        setRequests(rList);
        setLoading(false);
      }
    );
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      friendsService.searchUsers(query).then((res) => setSearchResults(res));
    } else {
      setSearchResults([]);
    }
  };

  const handleAcceptRequest = (reqId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
  };

  if (loading) return <Loader text="Loading Friends Guild..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-100 flex items-center gap-2">
          <Users className="w-8 h-8 text-cyan-400" />
          <span>Friends & Adventurers Guild</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Connect with Python study buddies, track progress, and send requests.
        </p>
      </div>

      {/* Search Bar */}
      <Card variant="glass" className="p-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Py-Spark users by username..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase">Search Results</span>
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} rank={user.rank} size="sm" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{user.username}</h4>
                    <Badge rank={user.rank} size="sm" />
                  </div>
                </div>
                <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
                  Send Request
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Pending Requests Section */}
      {requests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-400" />
            <span>Pending Friend Requests ({requests.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <Card key={req.id} variant="gold" className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Avatar src={req.senderAvatar} rank={req.senderRank} size="sm" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{req.senderName}</h4>
                    <span className="text-xs text-slate-400">{req.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAcceptRequest(req.id)}
                    className="p-2 rounded-xl bg-emerald-500 text-slate-950 hover:brightness-110"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => handleAcceptRequest(req.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Friends List Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-100">
          Your Python Buddies ({friends.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <Card key={friend.id} hoverEffect className="flex flex-col justify-between p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={friend.avatar} rank={friend.rank} size="md" />
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{friend.username}</h4>
                    <Badge rank={friend.rank} size="sm" />
                  </div>
                </div>

                <div
                  className={`w-3 h-3 rounded-full ${
                    friend.status === 'online'
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                      : friend.status === 'in_game'
                      ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                      : 'bg-slate-600'
                  }`}
                  title={friend.lastActive}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>{friend.xp} XP</span>
                <span className="font-mono">{friend.lastActive}</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-rose-400 hover:bg-rose-500/10"
                  onClick={() => handleRemoveFriend(friend.id)}
                  leftIcon={<UserMinus className="w-3.5 h-3.5" />}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
