import * as types from '../actionTypes/App';

const initialState = {
  count: 0,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default AppReducer;
