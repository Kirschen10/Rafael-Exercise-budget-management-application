const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  loading: false, // Loading state
  logIn: false,
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
        logIn: true,
      };
    case 'LOADING_USER_DATA':
      return {
        ...state,
        loading: true, // Start loading
      };
      case 'LOGOUT_USER':
        return {
          ...state,
          username: '',
          firstName: '',
          lastName: '',
          loading: false,
          logIn: false,
        };
    default:
      return state;
  }
};

export default userReducer;
