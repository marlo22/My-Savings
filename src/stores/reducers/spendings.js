import { Map } from 'immutable';

import {
  GET_SPENDINGS_SUCCESS,
  ADD_SPENDING_SUCCESS,
  EDIT_SPENDING_SUCCESS,
  DELETE_SPENDING_SUCCESS
} from '../consts/spendings';

const initialState = Map({
  spendings: Map()
});

function spendingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPENDINGS_SUCCESS:
      return state.set('spendings', Map(action.spendings));
    case ADD_SPENDING_SUCCESS:
      return state.setIn(['spendings', action.spendingId], action.spending);
    case EDIT_SPENDING_SUCCESS:
      return state.setIn(['spendings', action.spendingId], action.spending);
    case DELETE_SPENDING_SUCCESS:
      return state.removeIn(['spendings', action.spendingId]);
    default:
      return state;
  }
}

export default spendingsReducer;