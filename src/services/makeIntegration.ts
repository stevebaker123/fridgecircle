import { MAKE_CONFIG } from '../config/make';
import { FoodItem } from '../types';

export async function notifyExpiringItems(items: FoodItem[]) {
  try {
    const response = await fetch(MAKE_CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'EXPIRING_ITEMS',
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          expiryDate: item.expiryDate,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to notify Make.com');
    }

    return await response.json();
  } catch (error) {
    console.error('Error notifying Make.com:', error);
    throw error;
  }
}

export async function shareItemWithFriends(item: FoodItem, friendEmails: string[]) {
  try {
    const response = await fetch(MAKE_CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'SHARE_ITEM',
        item: {
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          expiryDate: item.expiryDate,
        },
        friendEmails,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to share item through Make.com');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sharing item through Make.com:', error);
    throw error;
  }
}