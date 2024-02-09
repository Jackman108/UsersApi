import { combineReducers } from 'redux';
import users from 'src/pages/users/usersReducer';

export default combineReducers({
    users: users
});
