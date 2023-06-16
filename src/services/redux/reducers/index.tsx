import { combineReducers } from 'redux';

import loginReducer from './login'
import collectionsReducer from './collections';
import suppliersReducer from './suppliers';

export default combineReducers({
    loginReducer,
    collectionsReducer,
    suppliersReducer,
});