import { initialInventoryItems } from '../data/items';

export const inventoryLogic = (state = initialInventoryItems, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

// Use initialInventoryItems for inventory state or mock data.