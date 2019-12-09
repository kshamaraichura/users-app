import api from "../api"

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'

export const USER_INSERT_REQUEST = 'USER_INSERT_REQUEST'
export const USER_INSERT_SUCCESS = 'USER_INSERT_SUCCESS'
export const USER_INSERT_FAILURE = 'USER_INSERT_FAILURE'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE'

export const getAllUsers = () => dispatch => {
  dispatch({type: USER_LIST_REQUEST})

  api.getAllUsers()
    .then(response => dispatch({type: USER_LIST_SUCCESS, payload: response.data.data}))
    .catch(error => dispatch({type: USER_LIST_FAILURE, payload: error.response}))
}

export const insertUser = (payload) => dispatch => {
  dispatch({type: USER_INSERT_REQUEST})

  api.insertUser(payload)
    .then(response => dispatch({type: USER_INSERT_SUCCESS, payload: response.data.data}))
    .catch(error => dispatch({type: USER_INSERT_FAILURE, payload: error.response}))
}

export const updateUser = (id, payload) => dispatch => {
  dispatch({type: USER_UPDATE_REQUEST})

  api.updateUserById(id, payload)
    .then(response => dispatch({type: USER_UPDATE_SUCCESS, payload: response.data.data}))
    .catch(error => dispatch({type: USER_UPDATE_FAILURE, payload: error.response}))
}

export const deleteUser = (id) => dispatch => {
  console.log(id)
  dispatch({type: USER_DELETE_REQUEST})

  api.deleteUserById(id)
    .then(response => {
      dispatch({type: USER_DELETE_SUCCESS, payload: response.data.data})
      dispatch(getAllUsers())
    })
    .catch(error => dispatch({type: USER_DELETE_FAILURE, payload: error.response}))
}
