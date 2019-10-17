import {
  GET_SPENDING_CATEGORIES_BEGIN,
  GET_SPENDING_CATEGORIES_SUCCESS,
  GET_SPENDING_CATEGORIES_FAILED,
  ADD_SPENDING_CATEGORY_BEGIN,
  ADD_SPENDING_CATEGORY_SUCCESS,
  ADD_SPENDING_CATEGORY_FAILED,
  EDIT_SPENDING_CATEGORY_BEGIN,
  EDIT_SPENDING_CATEGORY_SUCCESS,
  EDIT_SPENDING_CATEGORY_FAILED,
  DELETE_SPENDING_CATEGORY_BEGIN,
  DELETE_SPENDING_CATEGORY_SUCCESS,
  DELETE_SPENDING_CATEGORY_FAILED
} from '../consts/categories';

import { getUserId } from '../selectors/auth';

import { firebase } from '../../api';

// GET_SPENDING_CATEGORIES

export const getSpendingCategoriesBegin = () => ({
  type: GET_SPENDING_CATEGORIES_BEGIN
});

export const getSpendingCategoriesSuccess = categories => ({
  type: GET_SPENDING_CATEGORIES_SUCCESS,
  payload: categories // @TODO payload -> categories
});

export const getSpendingCategoriesFailed = () => ({
  type: GET_SPENDING_CATEGORIES_FAILED
});

export const getSpendingCategories = () => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(getSpendingCategoriesBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(getSpendingCategoriesFailed());
  }

  firebase.database().ref(`categories/${userId}`).once('value')
    .then(snapshot => {
      const categories = snapshot.val();
      dispatch(getSpendingCategoriesSuccess(categories));
      resolve(categories);
    })
    .catch(err => {
      dispatch(getSpendingCategoriesFailed());
      reject(err);
    });
});

// ADD_SPENDING_CATEGORY

export const addSpendingCategoryBegin = () => ({
  type: ADD_SPENDING_CATEGORY_BEGIN
});

export const addSpendingCategorySuccess = (category, categoryId) => ({
  type: ADD_SPENDING_CATEGORY_SUCCESS,
  category,
  categoryId
});

export const addSpendingCategoryFailed = () => ({
  type: ADD_SPENDING_CATEGORY_FAILED
});

export const addSpendingCategory = category => (dispatch, getState) => new Promise((resolve, reject) => {  
  dispatch(addSpendingCategoryBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(addSpendingCategoryFailed());
  }

  const categories = firebase.database().ref(`categories/${userId}/`);
  const newCategory = categories.push();
  const categoryId = newCategory.key;

  newCategory.set(category)
    .then(() => {
      dispatch(addSpendingCategorySuccess(category, categoryId));
      resolve(category);
    })
    .catch(err => {
      dispatch(addSpendingCategoryFailed());
      reject(err);
    });
});

// EDIT_SPENDING_CATEGORY

export const editSpendingCategoryBegin = () => ({
  type: EDIT_SPENDING_CATEGORY_BEGIN
});

export const editSpendingCategorySuccess = (category, categoryId) => ({
  type: EDIT_SPENDING_CATEGORY_SUCCESS,
  category,
  categoryId
});

export const editSpendingCategoryFailed = () => ({
  type: EDIT_SPENDING_CATEGORY_FAILED
});

export const editSpendingCategory = ({ key: categoryId, ...category }) => (dispatch, getState) => new Promise((resolve, reject) => {  
  dispatch(editSpendingCategoryBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(editSpendingCategoryFailed());
  }

  firebase.database().ref(`categories/${userId}/${categoryId}`).set(category)
    .then(() => {
      dispatch(editSpendingCategorySuccess(category, categoryId));
      resolve(category);
    })
    .catch(err => {
      dispatch(editSpendingCategoryFailed());
      reject(err);
    });
});

// DELETE_SPENDING_CATEGORY

export const deleteSpendingCategoryBegin = () => ({
  type: DELETE_SPENDING_CATEGORY_BEGIN
});

export const deleteSpendingCategorySuccess = categoryId => ({
  type: DELETE_SPENDING_CATEGORY_SUCCESS,
  categoryId
});

export const deleteSpendingCategoryFailed = () => ({
  type: DELETE_SPENDING_CATEGORY_FAILED
});

export const deleteSpendingCategory = categoryId => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(deleteSpendingCategoryBegin());

  const state = getState();
  const userId = getUserId(state);

  if (!userId) {
    return dispatch(deleteSpendingCategoryFailed());
  }

  firebase.database().ref(`categories/${userId}/${categoryId}`).remove()
    .then(() => {
      dispatch(deleteSpendingCategorySuccess(categoryId));
      resolve();
    })
    .catch(err => {
      dispatch(deleteSpendingCategoryFailed());
      reject(err);
    });
});