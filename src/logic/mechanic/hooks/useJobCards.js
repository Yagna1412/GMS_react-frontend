import { initialJobCards } from '../data/jobcards';

export const mechanicLogic = (state = initialJobCards, action) => {
    switch (action.type) {
        case 'ADD_JOB_CARD':
            return [...state, action.payload];
        case 'DELETE_JOB_CARD':
            return state.filter(jobCard => jobCard.id !== action.payload);
        case 'UPDATE_JOB_CARD':
            return state.map(jobCard => jobCard.id === action.payload.id ? action.payload : jobCard);
        default:
            return state;
    }
};

// Use initialJobCards for job card state or mock data.