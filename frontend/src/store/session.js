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

// TODO export login thunk action
export const thunkLoginUser = (user) => async (dispacth) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = response.json();
  dispatch(actionSetUser(data.user));
  return res;
};

// TODO initial state - set user as null 
const initialState = { user: null };

// TODO export default session reducer
const sessionReducer = (state = initialState, action ) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    default:
      return state;
  };
};

export default sessionReducer;