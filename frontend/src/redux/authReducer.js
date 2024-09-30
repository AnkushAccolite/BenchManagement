const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  userId: null,
  role: null,
  name: null,
  email: null,
  empId: null,
  loading: false,
  error: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        userId: action.payload.userId,
        role: action.payload.role,
        name: action.payload.name,
        email: action.payload.email,
        empId: action.payload.empId,
        loading: false,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        userId: null,
        role: null,
        name: null,
        email: null,
        empId: null,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        userId: null,
        role: null,
        name: null,
        email: null,
        empId: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
