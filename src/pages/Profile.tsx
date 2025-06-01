import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, User } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        name,
        location,
        ...(previewImage && { avatar: previewImage }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setLocation(user.location || '');
    setPreviewImage(null);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server
      // For demo purposes, we'll just create a local URL
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            {isEditing ? (
              <div className="w-24 h-24 rounded-full overflow-hidden relative group">
                {previewImage || user.avatar ? (
                  <img
                    src={previewImage || user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User size={36} className="text-gray-400" />
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={24} className="text-white" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User size={36} className="text-gray-400" />
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                    placeholder="City, State"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="small\" color="text-white" />
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-outline"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.location && (
                  <p className="text-gray-600 mt-1">{user.location}</p>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 btn-outline"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Email Address</h4>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700">Password</h4>
              <p className="text-gray-600">••••••••</p>
              <button className="text-sm text-secondary-600 hover:text-secondary-800 mt-1">
                Change Password
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={logout}
              className="text-error-600 hover:text-error-800 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;