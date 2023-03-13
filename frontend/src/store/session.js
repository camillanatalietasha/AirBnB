import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// action creators
const actionSetUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const actionRemoveUser = () => {
  return {
    type: REMOVE_USER,
  };
};


// export login thunk action
export const thunkLoginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(actionSetUser(data.user));
  return res;
};

// export thunk restore user
export const thunkRestoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(actionSetUser(data.user));
  return response;
};


// export thunk signup user
export const thunkSignup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(actionSetUser(data.user));
  return response;
};

// export thunk logout
export const thunkLogout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(actionRemoveUser());
  return response;
};

// initial state - set user as null 
const initialState = { user: null };

// export default session reducer
const sessionReducer = (state = initialState, action ) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
        newState = { ...state};
        newState.user = null;
        return newState;
    default:
      return state;
  };
};

export default sessionReducer;