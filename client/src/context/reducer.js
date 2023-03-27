// Ο reducer αναλαμβάνει την αποθήκευση της εκάστοτε κατάστασης (state)
// μέσα σε ολόκληρη την εφαρμογή ανάλογα με την ενέργεια που περνάμε.

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === 'DISPLAY_ALERT') {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Συμπλήρωσε όλα τα πεδία! (Reducer)',
    };
  }
  if (action.type === 'CLEAR_ALERT') {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === 'TOGGLE_SIDEBAR') {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === 'REGISTER_USER_BEGIN') {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === 'REGISTER_USER_SUCCESS') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Ο Χρήστης Δημιουργήθηκε! Ανακατεύθυνση...',
    };
  }
  if (action.type === 'REGISTER_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === 'LOGIN_USER_BEGIN') {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === 'LOGIN_USER_SUCCESS') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Επιτυχής Είσοδος! Ανακατεύθυνση...',
    };
  }
  if (action.type === 'LOGIN_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === 'UPDATE_USER_BEGIN') {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === 'UPDATE_USER_SUCCESS') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Τα Στοιχεία Χρήστη Ενημερώθηκαν!',
    };
  }
  if (action.type === 'UPDATE_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === 'LOGOUT_USER') {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: '',
    };
  }
  throw new Error(`no such action :${action.type}`);
};
export default reducer;
