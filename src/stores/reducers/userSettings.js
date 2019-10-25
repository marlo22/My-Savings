import { Map } from 'immutable';

import {
  GET_USER_SETTINGS_SUCCESS,
  SAVE_USER_SETTINGS_SUCCESS
} from '../consts/userSettings';

const initialState = Map({
  settings: Map()
});

function userSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SETTINGS_SUCCESS:
      return state.set('settings', Map(action.settings));
    case SAVE_USER_SETTINGS_SUCCESS:
      return state.mergeIn(['settings'], action.settings);
    default:
      return state;
  }
}

export default userSettingsReducer;