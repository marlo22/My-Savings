import { Map } from 'immutable';

import {
  GET_SPENDING_CATEGORIES_SUCCESS,
  ADD_SPENDING_CATEGORY_SUCCESS,
  EDIT_SPENDING_CATEGORY_SUCCESS,
  DELETE_SPENDING_CATEGORY_SUCCESS
} from '../consts/categories';

const initialState = Map({
  categoriesFetched: false,
  categories: Map()
});

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPENDING_CATEGORIES_SUCCESS: {
      const newState = state.set('categories', Map(action.payload));
      state.set('categoriesFetched', true);
      return newState;
    }
    case ADD_SPENDING_CATEGORY_SUCCESS:
      return state.setIn(['categories', action.categoryId], action.category);
    case EDIT_SPENDING_CATEGORY_SUCCESS:
      return state.setIn(['categories', action.categoryId], action.category);
    case DELETE_SPENDING_CATEGORY_SUCCESS:
      return state.removeIn(['categories', action.categoryId]);
    default:
      return state;
  }
}

export default categoriesReducer;