// Εδώ περνάμε όλες τις καταστάσεις και τις λειτουργίες σε όλα τα επίπεδα της εφαρμογής.

import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

export const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || '',
  jobLocation: location || '',
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  showSidebar: false,
};

const AppContext = React.createContext();

// Οικουμενική πρόσβαση στις καταστάσεις και τις λειτουργίες που δημιουργούμε παρακάτω. Χρήση στο index.js
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios
  // Εξασφαλίζουμε ότι το αποδεικτικό μας δεν το στέλνουμε σε όλες τις προσκομίσεις μας αλλά μόνο στα url που δηλώνουμε εδώ.
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  // Λειτουργίες
  const displayAlert = () => {
    dispatch({ type: 'DISPLAY_ALERT' });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, 5000);
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: 'REGISTER_USER_BEGIN' });
    try {
      const response = await axios.post(
        '/api/v1/auth/registerUser',
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: { user, token, location },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      dispatch({
        type: 'REGISTER_USER_ERROR',
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: 'LOGIN_USER_BEGIN' });
    try {
      const response = await axios.post('/api/v1/auth/loginUser', currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: { user, token, location },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_ERROR',
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        toggleSidebar,
        loginUser,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
