import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus, Bell, Search, Filter } from 'lucide-react';
import { FoodItem as FoodItemType } from '../types';
import { useFoodItems } from '../contexts/FoodItemsContext';
import FoodItem from '../components/food/FoodItem';
import FoodItemForm from '../components/food/FoodItemForm';

const Dashboard = () => {
  const { items, addItem, updateItem, getExpiringItems } = useFoodItems();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<FoodItemType | null>(null);
  
  const expiringItems = getExpiringItems();
  
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const handleAddItem = (item: Omit<FoodItemType, 'id' | 'ownerId' | 'addedDate'>) => {
    addItem(item);
    setIsAddItemModalOpen(false);
  };
  
  const handleEditItem = (item: FoodItemType) => {
    setEditingItem(item);
    setIsAddItemModalOpen(true);
  };
  
  const handleUpdateItem = (item: Omit<FoodItemType, 'id' | 'ownerId' | 'addedDate'>) => {
    if (editingItem) {
      updateItem(editingItem.id, item);
    }
    setIsAddItemModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Food Inventory</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsAddItemModalOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Item
        </button>
      </div>

      {expiringItems.length > 0 && (
        <div className="mb-8 bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Bell className="text-warning-500 mr-2" size={20} />
            <h2 className="text-lg font-semibold">Expiring Soon</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiringItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Expires: {format(parseISO(item.expiryDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <button
                  onClick={() => handleEditItem(item)}
                  className="text-secondary-600 hover:text-secondary-800 text-sm font-medium"
                >
                  Use it
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="relative">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input pl-10 pr-8 appearance-none"
          >
            <option value="all">All Categories</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="grain">Grain</option>
            <option value="bakery">Bakery</option>
            <option value="frozen">Frozen</option>
            <option value="canned">Canned</option>
            <option value="beverage">Beverage</option>
            <option value="condiment">Condiment</option>
            <option value="snack">Snack</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Items grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <RefrigeratorIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || categoryFilter !== 'all'
              ? "Try changing your search or filter"
              : "Your inventory is empty. Add some items to get started!"}
          </p>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsAddItemModalOpen(true);
            }}
            className="btn-primary"
          >
            <Plus size={18} className="mr-2" />
            Add New Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodItem key={item.id} item={item} onEdit={handleEditItem} />
          ))}
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <FoodItemForm
                initialData={editingItem || undefined}
                onSubmit={editingItem ? handleUpdateItem : handleAddItem}
                onCancel={() => {
                  setIsAddItemModalOpen(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this helper component for empty state
const RefrigeratorIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
    <path d="M5 10h14" />
    <path d="M15 7v6" />
  </svg>
);

export default Dashboard;