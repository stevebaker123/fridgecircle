import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDays, parseISO, isBefore, isAfter } from 'date-fns';
import { FoodItem, FoodCategory } from '../types';
import { useAuth } from './AuthContext';

interface FoodItemsContextType {
  items: FoodItem[];
  addItem: (item: Omit<FoodItem, 'id' | 'ownerId' | 'addedDate'>) => void;
  updateItem: (id: string, item: Partial<FoodItem>) => void;
  deleteItem: (id: string) => void;
  shareItem: (id: string, friendIds: string[]) => void;
  getExpiringItems: () => FoodItem[];
  getItemsByCategory: (category: FoodCategory) => FoodItem[];
}

const FoodItemsContext = createContext<FoodItemsContextType | undefined>(undefined);

// Mock food items for demo purposes
const generateMockFoodItems = (userId: string): FoodItem[] => [
  {
    id: '1',
    name: 'Milk',
    quantity: 1,
    unit: 'gallon',
    expiryDate: addDays(new Date(), 3).toISOString(),
    category: 'dairy',
    imageUrl: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=300',
    notes: 'Organic whole milk',
    isShared: false,
    ownerId: userId,
    addedDate: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Apples',
    quantity: 6,
    unit: 'count',
    expiryDate: addDays(new Date(), 7).toISOString(),
    category: 'fruit',
    imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300',
    notes: 'Honeycrisp',
    isShared: false,
    ownerId: userId,
    addedDate: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Chicken Breasts',
    quantity: 2,
    unit: 'pounds',
    expiryDate: addDays(new Date(), 2).toISOString(),
    category: 'meat',
    imageUrl: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=300',
    notes: 'Boneless, skinless',
    isShared: false,
    ownerId: userId,
    addedDate: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    expiryDate: addDays(new Date(), 4).toISOString(),
    category: 'bakery',
    imageUrl: 'https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg?auto=compress&cs=tinysrgb&w=300',
    notes: 'Whole wheat',
    isShared: false,
    ownerId: userId,
    addedDate: new Date().toISOString(),
  },
];

export const FoodItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In a real app, we would fetch items from an API
      const storedItems = localStorage.getItem(`fridgeCircle_items_${user.id}`);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        // Use mock data for demo
        const mockItems = generateMockFoodItems(user.id);
        setItems(mockItems);
        localStorage.setItem(`fridgeCircle_items_${user.id}`, JSON.stringify(mockItems));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  const saveItems = (newItems: FoodItem[]) => {
    if (user) {
      setItems(newItems);
      localStorage.setItem(`fridgeCircle_items_${user.id}`, JSON.stringify(newItems));
    }
  };

  const addItem = (item: Omit<FoodItem, 'id' | 'ownerId' | 'addedDate'>) => {
    if (!user) return;
    
    const newItem: FoodItem = {
      ...item,
      id: uuidv4(),
      ownerId: user.id,
      addedDate: new Date().toISOString(),
    };
    
    const newItems = [...items, newItem];
    saveItems(newItems);
  };

  const updateItem = (id: string, itemData: Partial<FoodItem>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...itemData } : item
    );
    saveItems(newItems);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
  };

  const shareItem = (id: string, friendIds: string[]) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isShared: true,
          sharedWith: friendIds,
        };
      }
      return item;
    });
    saveItems(newItems);
  };

  const getExpiringItems = () => {
    const today = new Date();
    const inThreeDays = addDays(today, 3);
    
    return items.filter(item => {
      const expiryDate = parseISO(item.expiryDate);
      return (
        isBefore(expiryDate, inThreeDays) && 
        isAfter(expiryDate, today)
      );
    });
  };

  const getItemsByCategory = (category: FoodCategory) => {
    return items.filter(item => item.category === category);
  };

  return (
    <FoodItemsContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        shareItem,
        getExpiringItems,
        getItemsByCategory,
      }}
    >
      {children}
    </FoodItemsContext.Provider>
  );
};

export const useFoodItems = () => {
  const context = useContext(FoodItemsContext);
  if (context === undefined) {
    throw new Error('useFoodItems must be used within a FoodItemsProvider');
  }
  return context;
};