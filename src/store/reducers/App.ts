import * as types from '../actionTypes/App';

const initialState = {
  user: null,
  selectedRoute: 11,
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case types.SELECT_ROUTE:
      return {
        ...state,
        selectedRoute: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
