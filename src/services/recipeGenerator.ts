import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';
import { FoodItem } from '../types';

const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.apiKey,
  dangerouslyAllowBrowser: true // Note: In production, make API calls through your backend
});

export async function generateRecipe(availableItems: FoodItem[]) {
  const ingredients = availableItems.map(item => `${item.quantity} ${item.unit} ${item.name}`).join(', ');

  const prompt = `Create a recipe using some or all of these ingredients: ${ingredients}. 
    The recipe should be practical and easy to make. Include:
    1. Recipe name
    2. Required ingredients (marking which ones are from the available list)
    3. Additional ingredients needed
    4. Step by step instructions
    5. Preparation time
    6. Cooking time
    7. Number of servings`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: OPENAI_CONFIG.model,
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
    });

    const recipeText = completion.choices[0]?.message?.content;
    if (!recipeText) throw new Error('No recipe generated');

    // Parse the recipe text and return structured data
    // This is a simplified parser - you might want to make it more robust
    const lines = recipeText.split('\n');
    const recipe = {
      title: lines[0].replace(/Recipe:|Name:/i, '').trim(),
      ingredients: {
        available: [] as string[],
        needed: [] as string[],
      },
      instructions: [] as string[],
      prepTime: 0,
      cookTime: 0,
      servings: 0,
    };

    // Parse the rest of the recipe...
    // Add your parsing logic here

    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
}