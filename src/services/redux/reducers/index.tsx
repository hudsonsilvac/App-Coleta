import { combineReducers } from 'redux';

import loginReducer from './login'
import collectionsReducer from './collections';

const appReducer = combineReducers({
    loginReducer,
    collectionsReducer
});

export default appReducer;