import { useState } from 'react';
import { UserPlus, UserX, Users } from 'lucide-react';
import { useFriends } from '../contexts/FriendsContext';
import FriendCard from '../components/friends/FriendCard';
import AddFriendForm from '../components/friends/AddFriendForm';

const Friends = () => {
  const { friends, pendingRequests } = useFriends();
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>(
    pendingRequests.length > 0 ? 'pending' : 'all'
  );
  
  const acceptedFriends = friends.filter(
    (friend) => friend.status === 'accepted'
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Friends</h1>
        <button
          onClick={() => setIsAddFriendModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Add New Friend
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Friends ({acceptedFriends.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Requests ({pendingRequests.length})
            {pendingRequests.length > 0 && (
              <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                {pendingRequests.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Friends list */}
      {activeTab === 'all' && (
        <>
          {acceptedFriends.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No friends yet</h3>
              <p className="text-gray-600 mb-6">
                Add friends to share your extra food items and reduce waste together.
              </p>
              <button
                onClick={() => setIsAddFriendModalOpen(true)}
                className="btn-primary"
              >
                <UserPlus size={18} className="mr-2" />
                Add New Friend
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {acceptedFriends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Pending requests */}
      {activeTab === 'pending' && (
        <>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <UserX className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
              <p className="text-gray-600">
                You don't have any pending friend requests right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Friend Modal */}
      {isAddFriendModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Friend</h2>
              <AddFriendForm onCancel={() => setIsAddFriendModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;