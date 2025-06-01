import { useState } from 'react';
import { X, Check, UserPlus } from 'lucide-react';
import { FoodItem } from '../../types';
import { useFoodItems } from '../../contexts/FoodItemsContext';
import { useFriends } from '../../contexts/FriendsContext';

interface FoodItemShareModalProps {
  item: FoodItem;
  onClose: () => void;
}

const FoodItemShareModal = ({ item, onClose }: FoodItemShareModalProps) => {
  const { friends } = useFriends();
  const { shareItem } = useFoodItems();
  const [selectedFriends, setSelectedFriends] = useState<string[]>(
    item.sharedWith || []
  );

  const acceptedFriends = friends.filter(
    (friend) => friend.status === 'accepted'
  );

  const handleToggleFriend = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      if (selectedFriends.length < 5) {
        setSelectedFriends([...selectedFriends, friendId]);
      }
    }
  };

  const handleShare = () => {
    shareItem(item.id, selectedFriends);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Share "{item.name}" with Friends</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Share this item with up to 5 friends. They'll be able to see it in their dashboard.
          </p>
          
          {acceptedFriends.length === 0 ? (
            <div className="text-center py-6">
              <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                You don't have any friends yet. Add friends to share items with them.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
              {acceptedFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="py-2 flex items-center justify-between hover:bg-gray-50 px-2 rounded"
                >
                  <div className="flex items-center">
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {friend.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span>{friend.name}</span>
                  </div>
                  <button
                    onClick={() => handleToggleFriend(friend.userId)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedFriends.includes(friend.userId)
                        ? 'bg-primary-500 text-white'
                        : 'border border-gray-300'
                    }`}
                  >
                    {selectedFriends.includes(friend.userId) && (
                      <Check size={14} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            {selectedFriends.length} of 5 friends selected
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="btn-outline mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="btn-primary"
            disabled={selectedFriends.length === 0}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemShareModal;