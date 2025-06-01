export const SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID,
  ranges: {
    users: 'Users!A2:F',
    foodItems: 'Foods!A2:K',
    friends: 'Friends!A2:D',
    recipes: 'Recipes!A2:H',
    recipeSuggestions: 'RecipeSuggestions!A2:E'
  }
};