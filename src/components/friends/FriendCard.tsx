import { UserCheck, UserX, UserMinus } from 'lucide-react';
import { Friend } from '../../types';
import { useFriends } from '../../contexts/FriendsContext';

interface FriendCardProps {
  friend: Friend;
}

const FriendCard = ({ friend }: FriendCardProps) => {
  const { acceptFriendRequest, declineFriendRequest, removeFriend } = useFriends();
  
  return (
    <div className="card p-4">
      <div className="flex items-center">
        {friend.avatar ? (
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">
              {friend.name.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{friend.name}</h3>
          <p className="text-sm text-gray-500">{friend.email}</p>
        </div>
        
        {friend.status === 'pending' ? (
          <div className="flex space-x-2">
            <button
              onClick={() => acceptFriendRequest(friend.id)}
              className="p-2 bg-primary-100 text-primary-600 rounded-full hover:bg-primary-200"
              title="Accept request"
            >
              <UserCheck size={18} />
            </button>
            <button
              onClick={() => declineFriendRequest(friend.id)}
              className="p-2 bg-error-100 text-error-600 rounded-full hover:bg-error-200"
              title="Decline request"
            >
              <UserX size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => removeFriend(friend.id)}
            className="p-2 text-gray-500 hover:text-error-600"
            title="Remove friend"
          >
            <UserMinus size={18} />
          </button>
        )}
      </div>
      
      {friend.status === 'pending' && (
        <div className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full inline-block">
          Pending
        </div>
      )}
    </div>
  );
};

export default FriendCard;