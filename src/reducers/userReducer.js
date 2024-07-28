const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  loading: false, // Loading state
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_PERSONAL_DETAILS':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loading: false, // End loading
      };
    case 'LOADING_USER_DATA':
      return {
        ...state,
        loading: true, // Start loading
      };
    default:
      return state;
  }
};

export default userReducer;
