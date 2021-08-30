import { combineReducers } from 'redux';
import AppReducer from './App';
import BaseRouteReducer from './BaseRoute';
import TaskRouteReducer from './TaskRoute';

const rootReducer = combineReducers({
  app: AppReducer,
  baseRoute: BaseRouteReducer,
  taskRoute: TaskRouteReducer,
});

export default rootReducer;
