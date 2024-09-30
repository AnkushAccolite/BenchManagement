import axios from 'axios'

export const login = (data, setIsLoading) => async (dispatch) => {
  axios
    .post('http://localhost:8080/api/auth/login', data)
    .then((response) => {
      console.log('Login successful:', response.data)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      })
    })
    .catch((error) => {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      )
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login failed',
      })
    })
    .finally(() => {
      setIsLoading(false)
    })
}

export const logout = (data) => async (dispatch) => {
  axios
    .post('http://localhost:8080/api/auth/logout', data)
    .then((response) => {
      console.log('Logout successful:', response.data)
    })
    .catch((error) => {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      )
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login failed',
      })
    })
}
