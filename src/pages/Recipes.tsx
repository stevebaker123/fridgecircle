import { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useRecipes } from '../contexts/RecipesContext';
import { useFoodItems } from '../contexts/FoodItemsContext';
import RecipeCard from '../components/recipes/RecipeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Recipes = () => {
  const { recipes, suggestedRecipes, fetchRecipes } = useRecipes();
  const { getExpiringItems } = useFoodItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const expiringItems = getExpiringItems();
  
  useEffect(() => {
    // Fetch recipes on initial load if none are loaded
    if (recipes.length === 0) {
      handleRefreshRecipes();
    }
  }, [recipes.length]);
  
  const handleRefreshRecipes = async () => {
    setIsLoading(true);
    try {
      await fetchRecipes();
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Recipe Suggestions</h1>
        <button
          onClick={handleRefreshRecipes}
          className="btn-outline flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            <RefreshCw size={18} className="mr-2" />
          )}
          Refresh Recipes
        </button>
      </div>

      {/* Expiring items section */}
      {expiringItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Ingredients Expiring Soon
          </h2>
          <div className="flex flex-wrap gap-2">
            {expiringItems.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-warning-100 text-warning-800 rounded-full text-sm"
              >
                {item.name} ({item.quantity} {item.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Recipes */}
      {suggestedRecipes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Recipes Based on Your Ingredients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Search section */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search all recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* All Recipes */}
      <h2 className="text-xl font-semibold mb-4">All Recipes</h2>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No recipes found</h3>
          <p className="text-gray-600 mt-2">
            {searchQuery
              ? "Try a different search term"
              : "We couldn't find any recipes matching your ingredients"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;