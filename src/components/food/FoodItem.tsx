import { useState } from 'react';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Edit, Trash2, Share2 } from 'lucide-react';
import { FoodItem as FoodItemType } from '../../types';
import { useFoodItems } from '../../contexts/FoodItemsContext';
import FoodItemShareModal from './FoodItemShareModal';

interface FoodItemProps {
  item: FoodItemType;
  onEdit: (item: FoodItemType) => void;
}

const FoodItem = ({ item, onEdit }: FoodItemProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { deleteItem } = useFoodItems();
  
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  const threeDaysFromNow = addDays(today, 3);
  
  const isExpired = isBefore(expiryDate, today);
  const isExpiringSoon = !isExpired && isBefore(expiryDate, threeDaysFromNow);
  
  const getExpiryStatusClass = () => {
    if (isExpired) return 'bg-error-100 text-error-700 border-error-300';
    if (isExpiringSoon) return 'bg-warning-100 text-warning-700 border-warning-300';
    return 'bg-success-100 text-success-700 border-success-300';
  };
  
  const getExpiryStatusText = () => {
    if (isExpired) return 'Expired';
    if (isExpiringSoon) return 'Expiring Soon';
    return 'Fresh';
  };

  return (
    <div className="card overflow-hidden transition-all hover:shadow-md group">
      <div className="relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getExpiryStatusClass()}`}
        >
          {getExpiryStatusText()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>
            {item.quantity} {item.unit}
          </p>
          <p>Expires: {format(expiryDate, 'PPP')}</p>
          {item.category && (
            <p className="mt-1">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </p>
          )}
        </div>
        
        {item.notes && (
          <p className="mt-2 text-sm text-gray-600">{item.notes}</p>
        )}
        
        <div className="mt-3 flex justify-between">
          <button
            onClick={() => onEdit(item)}
            className="text-secondary-600 hover:text-secondary-800 p-1"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="text-primary-600 hover:text-primary-800 p-1"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => deleteItem(item.id)}
            className="text-error-600 hover:text-error-800 p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {isShareModalOpen && (
        <FoodItemShareModal
          item={item}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FoodItem;