import * as types from '../actionTypes/App';

const initialState = {
  user: null,
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

    default:
      return state;
  }
};

export default AppReducer;
