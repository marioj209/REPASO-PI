const initialState = {
  characters:[],
  allCharacters: [],
  
};

export default function rootReducer(state=initialState,action) {
  switch (action.type) {
    case 'GET_CHARACTER':
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
}

