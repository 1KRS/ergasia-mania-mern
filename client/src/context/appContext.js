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
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['Πλήρης Απασχόληση',
  'Ημιαπασχόληση',
  'Απομακρυσμένη',
  'Πρακτική',
  'Υβριδική'],
  jobType: 'Πλήρης Απασχόληση',
  statusOptions: ['Εκκρεμεί', 'Συνέντευξη', 'Απορρίφθηκε'],
  status: 'Εκκρεμεί',
  jobLocation: location || '',
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
        logoutUser();
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
    dispatch({ type: 'UPDATE_USER_BEGIN' });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      // no token
      const { user, location } = data;

      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token: initialState.token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: 'UPDATE_USER_ERROR',
          payload: { msg: error.response.data },
        });
      }
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
    removeUserFromLocalStorage();
  };

  const createJob = async () => {
    dispatch({ type: 'CREATE_JOB_BEGIN' });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: 'CREATE_JOB_SUCCESS',
      });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: 'CREATE_JOB_ERROR',
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: { name, value },
    });
  };

  const clearValues = async () => {
    await dispatch({
      type: 'CLEAR_VALUES',
    });
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
        createJob,
        handleChange,
        clearValues,
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
