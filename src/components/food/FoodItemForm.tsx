import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Camera, X } from 'lucide-react';
import { FoodItem, FoodCategory } from '../../types';

interface FoodItemFormProps {
  initialData?: FoodItem;
  onSubmit: (data: Omit<FoodItem, 'id' | 'ownerId' | 'addedDate'>) => void;
  onCancel: () => void;
}

const categories: FoodCategory[] = [
  'dairy',
  'meat',
  'fruit',
  'vegetable',
  'grain',
  'bakery',
  'frozen',
  'canned',
  'beverage',
  'condiment',
  'snack',
  'other',
];

const FoodItemForm = ({ initialData, onSubmit, onCancel }: FoodItemFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [quantity, setQuantity] = useState(initialData?.quantity.toString() || '1');
  const [unit, setUnit] = useState(initialData?.unit || 'count');
  const [expiryDate, setExpiryDate] = useState(
    initialData?.expiryDate
      ? format(new Date(initialData.expiryDate), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd')
  );
  const [category, setCategory] = useState<FoodCategory>(initialData?.category || 'other');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server
      // For demo purposes, we'll just create a local URL
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);
      
      // In a real app, this would be the URL returned from the server
      setImageUrl(localUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      name,
      quantity: Number(quantity),
      unit,
      expiryDate: new Date(expiryDate).toISOString(),
      category,
      imageUrl,
      notes,
      isShared: initialData?.isShared || false,
      sharedWith: initialData?.sharedWith || [],
    });
  };

  const handleCancel = () => {
    if (previewImage && !imageUrl.includes('https://')) {
      URL.revokeObjectURL(previewImage);
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Item Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input mt-1"
          placeholder="e.g., Milk, Apples, Chicken"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity *
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input mt-1"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700"
          >
            Unit *
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="input mt-1"
            required
          >
            <option value="count">Count</option>
            <option value="g">Grams (g)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="ml">Milliliters (ml)</option>
            <option value="l">Liters (l)</option>
            <option value="cup">Cup</option>
            <option value="tbsp">Tablespoon</option>
            <option value="tsp">Teaspoon</option>
            <option value="dozen">Dozen</option>
            <option value="piece">Piece</option>
            <option value="box">Box</option>
            <option value="can">Can</option>
            <option value="bottle">Bottle</option>
            <option value="package">Package</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="expiryDate"
          className="block text-sm font-medium text-gray-700"
        >
          Expiry Date *
        </label>
        <input
          type="date"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="input mt-1"
          required
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category *
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as FoodCategory)}
          className="input mt-1"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
            {previewImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setImageUrl('');
                  }}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-sm"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
              >
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">Add Photo</span>
              </label>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {!previewImage && (
            <div className="text-sm text-gray-500">
              <p>Upload a photo of your food item.</p>
              <p>JPG, PNG, or GIF up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input mt-1"
          rows={3}
          placeholder="Add any additional details about this item"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default FoodItemForm;