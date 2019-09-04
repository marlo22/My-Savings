import { Map } from 'immutable';

import { SIGN_IN } from '../consts/auth';

const initialState = Map({
  userData: null
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state.set('userData', Map(action.payload));
    default:
      return state;
  }
}

export default authReducer;