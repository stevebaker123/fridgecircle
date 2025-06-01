import { useState } from 'react';
import { useFriends } from '../../contexts/FriendsContext';

interface AddFriendFormProps {
  onCancel: () => void;
}

const AddFriendForm = ({ onCancel }: AddFriendFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { addFriend } = useFriends();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await addFriend(email);
      onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add friend');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Friend's Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mt-1"
          placeholder="Enter your friend's email"
          required
        />
        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Friend'}
        </button>
      </div>
    </form>
  );
};

export default AddFriendForm;