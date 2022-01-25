import * as types from '../actionTypes/App';
import UserGroups from '../../constants/userGroups';

const initialState = {
  user: null,
  admin: true,
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN: {
      let isAdmin = true;
      if (action.payload.groups)
        if (action.payload.groups.includes(UserGroups.READ_ONLY))
          isAdmin = false;

      return {
        ...state,
        user: action.payload,
        admin: isAdmin,
      };
    }

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        admin: true,
      };

    default:
      return state;
  }
};

export default AppReducer;
