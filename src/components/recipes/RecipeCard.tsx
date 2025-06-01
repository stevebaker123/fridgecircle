import { Clock, Users } from 'lucide-react';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="card overflow-hidden group hover:scale-[1.02] transition-transform">
      <div className="relative">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="p-4 text-white font-semibold text-lg">{recipe.title}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-gray-700">You have:</h4>
            <div className="mt-1 flex flex-wrap gap-1">
              {recipe.matchingIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700">You need:</h4>
            <div className="mt-1 flex flex-wrap gap-1">
              {recipe.missingIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button className="mt-4 w-full btn-primary">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;