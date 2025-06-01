import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Friend } from '../types';
import { useAuth } from './AuthContext';

interface FriendsContextType {
  friends: Friend[];
  pendingRequests: Friend[];
  addFriend: (email: string) => Promise<void>;
  acceptFriendRequest: (id: string) => void;
  declineFriendRequest: (id: string) => void;
  removeFriend: (id: string) => void;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

// Mock friends for demo purposes
const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    userId: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    status: 'accepted',
  },
  {
    id: '2',
    userId: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    status: 'accepted',
  },
  {
    id: '3',
    userId: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/150?u=bob',
    status: 'pending',
  },
];

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In a real app, we would fetch friends from an API
      const storedFriends = localStorage.getItem(`fridgeCircle_friends_${user.id}`);
      if (storedFriends) {
        setFriends(JSON.parse(storedFriends));
      } else {
        // Use mock data for demo
        setFriends(MOCK_FRIENDS);
        localStorage.setItem(`fridgeCircle_friends_${user.id}`, JSON.stringify(MOCK_FRIENDS));
      }
    } else {
      setFriends([]);
    }
  }, [user]);

  const saveFriends = (newFriends: Friend[]) => {
    if (user) {
      setFriends(newFriends);
      localStorage.setItem(`fridgeCircle_friends_${user.id}`, JSON.stringify(newFriends));
    }
  };

  const pendingRequests = friends.filter(friend => friend.status === 'pending');

  const addFriend = async (email: string) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if already friends
    const existingFriend = friends.find(friend => friend.email === email);
    if (existingFriend) {
      throw new Error('You are already friends with this user or have a pending request');
    }
    
    // In a real app, we would send a friend request to the server
    const newFriend: Friend = {
      id: uuidv4(),
      userId: `new-${uuidv4()}`,
      name: email.split('@')[0],
      email,
      status: 'pending',
    };
    
    const newFriends = [...friends, newFriend];
    saveFriends(newFriends);
  };

  const acceptFriendRequest = (id: string) => {
    const newFriends = friends.map(friend => 
      friend.id === id ? { ...friend, status: 'accepted' as const } : friend
    );
    saveFriends(newFriends);
  };

  const declineFriendRequest = (id: string) => {
    const newFriends = friends.map(friend => 
      friend.id === id ? { ...friend, status: 'declined' as const } : friend
    );
    saveFriends(newFriends);
  };

  const removeFriend = (id: string) => {
    const newFriends = friends.filter(friend => friend.id !== id);
    saveFriends(newFriends);
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        pendingRequests,
        addFriend,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};