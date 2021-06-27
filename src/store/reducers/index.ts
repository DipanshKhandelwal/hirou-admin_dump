import { combineReducers } from 'redux';
import AppReducer from './App';
import BaseRouteReducer from './BaseRoute';

const rootReducer = combineReducers({
  app: AppReducer,
  baseRoute: BaseRouteReducer,
});

export default rootReducer;
