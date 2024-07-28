import axios from 'axios';

export const fetchPersonalDetails = (username) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_USER_DATA' }); // To load the data. Only after everything is loaded - the username will sync, we will upload the data.
    dispatch({ type: 'SET_USERNAME', payload: username });
    const response = await axios.post('http://localhost:3001/personal_details', { username });
    dispatch({ type: 'SET_PERSONAL_DETAILS', payload: response.data });
  } catch (error) {
    console.error('Error fetching personal details:', error);
  }
};
