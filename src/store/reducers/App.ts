import * as types from '../actionTypes/App';

const initialState = {
  user: {},
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
