import { google } from 'googleapis';
import { User, FoodItem, Friend, Recipe } from '../types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export class GoogleSheetsService {
  private sheets;
  private spreadsheetId;

  constructor(credentials: any, spreadsheetId: string) {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = spreadsheetId;
  }

  async getUsers(): Promise<User[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Users!A2:F',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows.map(row => ({
      id: row[0],
      name: row[1],
      email: row[2],
      avatar: row[3] || undefined,
      location: row[4] || undefined,
    }));
  }

  async getFoodItems(userId: string): Promise<FoodItem[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Foods!A2:K',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter(row => row[1] === userId)
      .map(row => ({
        id: row[0],
        ownerId: row[1],
        name: row[2],
        quantity: Number(row[3]),
        unit: row[4],
        expiryDate: row[5],
        category: row[6],
        imageUrl: row[7] || undefined,
        notes: row[8] || undefined,
        isShared: row[9] === 'true',
        addedDate: row[10],
      }));
  }

  async getFriends(userId: string): Promise<Friend[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Friends!A2:D',
    });

    const rows = response.data.values;
    if (!rows) return [];

    const users = await this.getUsers();
    
    return rows
      .filter(row => row[1] === userId)
      .map(row => {
        const friendUser = users.find(u => u.id === row[2]);
        if (!friendUser) throw new Error('Friend user not found');
        
        return {
          id: row[0],
          userId: row[2],
          name: friendUser.name,
          email: friendUser.email,
          avatar: friendUser.avatar,
          status: row[3] as 'pending' | 'accepted' | 'declined',
        };
      });
  }

  async getRecipes(): Promise<Recipe[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Recipes!A2:H',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows.map(row => ({
      id: row[0],
      title: row[1],
      ingredients: row[2].split(',').map(i => i.trim()),
      instructions: row[3].split('\n').map(i => i.trim()),
      imageUrl: row[4] || undefined,
      prepTime: Number(row[5]),
      cookTime: Number(row[6]),
      servings: Number(row[7]),
      matchingIngredients: [],
      missingIngredients: [],
    }));
  }

  async getRecipeSuggestions(userId: string): Promise<string[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'RecipeSuggestions!A2:E',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter(row => row[1] === userId && new Date(row[4]) >= new Date())
      .map(row => row[3]);
  }
}