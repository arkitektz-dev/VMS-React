import { actionTypes } from "./action";

const initialAuthState = {
  user: null,
  tenant: null,
  accessToken: null,
  permissions: null,
};

function reducer(state = initialAuthState, action) {
  switch (action.type) {
    case actionTypes.Login: {
      const { accessToken } = action.payload;

      return { accessToken, user: null, tenant: null };
    }

    case actionTypes.SetUser: {
      const { user, tenant } = action.payload;

      return { ...state, user, tenant };
    }

    case actionTypes.SetConfiguration: {
      const { auth: permissions } = action.payload;

      return { ...state, permissions };
    }

    case actionTypes.Logout: {
      // TODO: Change this code. Actions in reducer aren't allowed.
      return initialAuthState;
    }

    default:
      return state;
  }
}

export default reducer;
