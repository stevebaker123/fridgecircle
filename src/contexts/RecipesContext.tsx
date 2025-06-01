import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '../types';
import { useFoodItems } from './FoodItemsContext';
import { useAuth } from './AuthContext';

interface RecipesContextType {
  recipes: Recipe[];
  suggestedRecipes: Recipe[];
  fetchRecipes: () => Promise<void>;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

// Mock recipes for demo purposes
const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Stir Fry',
    ingredients: [
      '2 chicken breasts, sliced',
      '1 bell pepper, sliced',
      '1 onion, sliced',
      '2 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp olive oil',
    ],
    instructions: [
      'Heat oil in a large pan over medium-high heat.',
      'Add chicken and cook until browned, about 5 minutes.',
      'Add vegetables and garlic, cook for 3-4 minutes until tender-crisp.',
      'Add soy sauce and stir to combine.',
      'Serve hot over rice or noodles.',
    ],
    imageUrl: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=300',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    matchingIngredients: ['chicken breasts'],
    missingIngredients: ['bell pepper', 'onion', 'garlic', 'soy sauce'],
  },
  {
    id: '2',
    title: 'Apple Cinnamon Oatmeal',
    ingredients: [
      '1 cup rolled oats',
      '2 cups milk',
      '1 apple, diced',
      '1 tsp cinnamon',
      '2 tbsp honey',
      'Pinch of salt',
    ],
    instructions: [
      'Combine oats, milk, and salt in a saucepan.',
      'Bring to a simmer over medium heat.',
      'Cook for 5 minutes, stirring occasionally.',
      'Add diced apple and cinnamon, cook for another 2 minutes.',
      'Remove from heat and stir in honey.',
      'Let stand for 5 minutes before serving.',
    ],
    imageUrl: 'https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg?auto=compress&cs=tinysrgb&w=300',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    matchingIngredients: ['apples', 'milk'],
    missingIngredients: ['rolled oats', 'cinnamon', 'honey'],
  },
  {
    id: '3',
    title: 'Grilled Cheese and Apple Sandwich',
    ingredients: [
      '2 slices bread',
      '2 slices cheddar cheese',
      '1/2 apple, thinly sliced',
      '1 tbsp butter',
    ],
    instructions: [
      'Butter one side of each slice of bread.',
      'Place one slice butter-side down in a pan over medium heat.',
      'Layer cheese and apple slices on the bread.',
      'Top with the second slice of bread, butter-side up.',
      'Cook until golden brown, about 3 minutes per side.',
    ],
    imageUrl: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=300',
    prepTime: 5,
    cookTime: 6,
    servings: 1,
    matchingIngredients: ['apples', 'bread'],
    missingIngredients: ['cheddar cheese', 'butter'],
  },
];

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { items } = useFoodItems();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In a real app, we would fetch recipes from an API
      const storedRecipes = localStorage.getItem(`fridgeCircle_recipes_${user.id}`);
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      } else {
        // Use mock data for demo
        setRecipes(MOCK_RECIPES);
        localStorage.setItem(`fridgeCircle_recipes_${user.id}`, JSON.stringify(MOCK_RECIPES));
      }
    } else {
      setRecipes([]);
    }
  }, [user]);

  const fetchRecipes = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would fetch recipes based on user's items
    setRecipes(MOCK_RECIPES);
    
    if (user) {
      localStorage.setItem(`fridgeCircle_recipes_${user.id}`, JSON.stringify(MOCK_RECIPES));
    }
  };

  // Generate suggested recipes based on expiring items
  const suggestedRecipes = recipes.filter(recipe => {
    const itemNames = items.map(item => item.name.toLowerCase());
    return recipe.matchingIngredients.some(ingredient => 
      itemNames.some(itemName => ingredient.toLowerCase().includes(itemName))
    );
  });

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        suggestedRecipes,
        fetchRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};