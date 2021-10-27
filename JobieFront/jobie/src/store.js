import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { applicationDetailsReducer, applicationListReducer, applicationEditReducer, applicationStatsReducer } from './reducers/applicationsReducers'

const reducer = combineReducers({
    applicationList: applicationListReducer,
    applicationDetails: applicationDetailsReducer,
    applicationEdit:  applicationEditReducer,
    applicationStats: applicationStatsReducer
})

const initialState = {
    
}

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(...middleware));

export default store;