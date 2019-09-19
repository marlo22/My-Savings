export const getUserData = state => state.auth.get('userData');
export const getUserId = state => state.auth.getIn(['userData', 'uid']);