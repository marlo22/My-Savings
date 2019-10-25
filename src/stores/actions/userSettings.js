import {
  GET_USER_SETTINGS_BEGIN,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_FAILED,
  SAVE_USER_SETTINGS_BEGIN,
  SAVE_USER_SETTINGS_SUCCESS,
  SAVE_USER_SETTINGS_FAILED
} from '../consts/userSettings';

import { getUserId } from '../selectors/auth';

import { firebase } from '../../api';

// GET_USER_SETTINGS

export const getUserSettingsBegin = () => ({
  type: GET_USER_SETTINGS_BEGIN
});

export const getUserSettingsSuccess = settings => ({
  type: GET_USER_SETTINGS_SUCCESS,
  settings
});

export const getUserSettingsFailed = () => ({
  type: GET_USER_SETTINGS_FAILED
});

export const getUserSettings = () => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(getUserSettingsBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(getUserSettingsFailed());
  }

  firebase.database().ref(`settings/${userId}`).once('value')
    .then(snapshot => {
      const settings = snapshot.val();
      dispatch(getUserSettingsSuccess(settings));
      resolve(settings);
    })
    .catch(err => {
      dispatch(getUserSettingsFailed());
      reject(err);
    });
});

// SAVE_USER_SETTINGS

export const saveUserSettingsBegin = () => ({
  type: SAVE_USER_SETTINGS_BEGIN
});

export const saveUserSettingsSuccess = settings => ({
  type: SAVE_USER_SETTINGS_SUCCESS,
  settings
});

export const saveUserSettingsFailed = () => ({
  type: SAVE_USER_SETTINGS_FAILED
});

export const saveUserSettings = newSettings => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(saveUserSettingsBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(saveUserSettingsFailed());
  }

  const settings = firebase.database().ref(`settings/${userId}/`);

  settings.update(newSettings)
    .then(() => {
      dispatch(saveUserSettingsSuccess(newSettings));
      resolve(newSettings);
    })
    .catch(err => {
      dispatch(saveUserSettingsFailed());
      reject(err);
    });
});
