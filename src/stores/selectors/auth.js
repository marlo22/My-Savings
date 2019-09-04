export const getUserData = state => state.get('userData');
export const getUserId = state => state.getIn(['userData', 'uid']);