const initialState = [];

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.data];
        case 'LIST':
            return [...action.data];
        case 'UPDATE':
            return state.map((item) => item.id === action.data.id ? action.data : item);
        case 'REMOVE':
            return state.filter(({id}) => id !== action.data);
        default:
            return state;
    }
}