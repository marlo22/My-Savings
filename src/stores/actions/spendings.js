import {
  GET_SPENDINGS_BEGIN,
  GET_SPENDINGS_SUCCESS,
  GET_SPENDINGS_FAILED,
  ADD_SPENDING_BEGIN,
  ADD_SPENDING_SUCCESS,
  ADD_SPENDING_FAILED,
  EDIT_SPENDING_BEGIN,
  EDIT_SPENDING_SUCCESS,
  EDIT_SPENDING_FAILED,
  DELETE_SPENDING_BEGIN,
  DELETE_SPENDING_SUCCESS,
  DELETE_SPENDING_FAILED,
} from '../consts/spendings';

import { getUserId } from '../selectors/auth';

import { firebase } from '../../api';

// GET_SPENDINGS

export const getSpendingsBegin = () => ({
  type: GET_SPENDINGS_BEGIN
});

export const getSpendingsSuccess = spendings => ({
  type: GET_SPENDINGS_SUCCESS,
  spendings
});

export const getSpendingsFailed = () => ({
  type: GET_SPENDINGS_FAILED
});

export const getSpendings = () => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(getSpendingsBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(getSpendingsFailed());
  }

  firebase.database().ref(`spendings/${userId}`).once('value')
    .then(snapshot => {
      const spendings = snapshot.val();
      dispatch(getSpendingsSuccess(spendings));
      resolve(spendings);
    })
    .catch(err => {
      dispatch(getSpendingsFailed());
      reject(err);
    });
});

// ADD_SPENDING

export const addSpendingBegin = () => ({
  type: ADD_SPENDING_BEGIN
});

export const addSpendingSuccess = (spending, spendingId) => ({
  type: ADD_SPENDING_SUCCESS,
  spending,
  spendingId
});

export const addSpendingFailed = () => ({
  type: ADD_SPENDING_FAILED
});

export const addSpending = spending => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(addSpendingBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(addSpendingFailed());
  }

  const spendings = firebase.database().ref(`spendings/${userId}/`);
  const newSpending = spendings.push();
  const spendingId = newSpending.key;

  newSpending.set(spending)
    .then(() => {
      dispatch(addSpendingSuccess(spending, spendingId));
      resolve(spending);
    })
    .catch(err => {
      dispatch(addSpendingFailed());
      reject(err);
    });
});

// EDIT_SPENDING_CATEGORY

export const editSpendingBegin = () => ({
  type: EDIT_SPENDING_BEGIN
});

export const editSpendingSuccess = (spending, spendingId) => ({
  type: EDIT_SPENDING_SUCCESS,
  spending,
  spendingId
});

export const editSpendingFailed = () => ({
  type: EDIT_SPENDING_FAILED
});

export const editSpending = ({ key: spendingId, ...spending }) => (dispatch, getState) => new Promise((resolve, reject) => {  
  dispatch(editSpendingBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(editSpendingFailed());
  }

  firebase.database().ref(`spendings/${userId}/${spendingId}`).set(spending)
    .then(() => {
      dispatch(editSpendingSuccess(spending, spendingId));
      resolve(spending);
    })
    .catch(err => {
      dispatch(editSpendingFailed());
      reject(err);
    });
});

// DELETE_SPENDING_CATEGORY

export const deleteSpendingBegin = () => ({
  type: DELETE_SPENDING_BEGIN
});

export const deleteSpendingSuccess = spendingId => ({
  type: DELETE_SPENDING_SUCCESS,
  spendingId
});

export const deleteSpendingFailed = () => ({
  type: DELETE_SPENDING_FAILED
});

export const deleteSpending = spendingId => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(deleteSpendingBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(deleteSpendingFailed());
  }

  firebase.database().ref(`spendings/${userId}/${spendingId}`).remove()
    .then(() => {
      dispatch(deleteSpendingSuccess(spendingId));
      resolve();
    })
    .catch(err => {
      dispatch(deleteSpendingFailed());
      reject(err);
    });
});