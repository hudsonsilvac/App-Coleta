import { combineReducers } from 'redux';

import collectionsReducer from './collections';
import suppliersReducer from './suppliers';

export default combineReducers({
    collectionsReducer,
    suppliersReducer,
});