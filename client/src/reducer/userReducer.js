import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_INSERT_FAILURE,
  USER_INSERT_REQUEST,
  USER_INSERT_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../action"

export default (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        list: {isLoading: true},
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        list: {success: action.payload, isLoading: false},
      }
    case USER_LIST_FAILURE:
      return {
        ...state,
        list: {error: action.payload, isLoading: false},
      }
    case USER_INSERT_REQUEST:
      return {
        ...state,
        insert: {isLoading: true},
      }
    case USER_INSERT_SUCCESS:
      return {
        ...state,
        insert: {success: action.payload, isLoading: false},
      }
    case USER_INSERT_FAILURE:
      return {
        ...state,
        insert: {error: action.payload, isLoading: false},
      }
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        update: {isLoading: true},
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        update: {success: action.payload, isLoading: false},
      }
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        update: {error: action.payload, isLoading: false},
      }
    case USER_DELETE_REQUEST:
      return {
        ...state,
        update: {isLoading: true},
      }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        update: {success: action.payload, isLoading: false},
      }
    case USER_DELETE_FAILURE:
      return {
        ...state,
        update: {error: action.payload, isLoading: false},
      }
    default:
      return state
  }
}
