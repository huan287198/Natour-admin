import { 
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,  
  USER_COUNT_BOOK_REQUEST, USER_COUNT_BOOK_SUCCESS, USER_COUNT_BOOK_FAIL,  
  USER_COUNT_REVIEW_REQUEST, USER_COUNT_REVIEW_SUCCESS, USER_COUNT_REVIEW_FAIL,  
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userListReducer(state = { users: [] }, action) {
  switch (action.type) {
      case USER_LIST_REQUEST:
      return { loading: true, users: [] };
      case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload, length: action.length,
      lenBooking: action.lenBooking, lenReview: action.lenReview };
      case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
      default:
      return state;
  }
}

function countBookReducer(state = {}, action) {
  switch (action.type) {
      case USER_COUNT_BOOK_REQUEST:
      return { loading: true };
      case USER_COUNT_BOOK_SUCCESS:
      return { loading: false, length: action.payload };
      case USER_COUNT_BOOK_FAIL:
      return { loading: false, error: action.payload }
      default:
      return state;
  }
}

function countReviewReducer(state = {}, action) {
  switch (action.type) {
      case USER_COUNT_REVIEW_REQUEST:
      return { loading: true };
      case USER_COUNT_REVIEW_SUCCESS:
      return { loading: false, length: action.payload };
      case USER_COUNT_REVIEW_FAIL:
      return { loading: false, error: action.payload }
      default:
      return state;
  }
}

function userDeleteReducer(state = { user: {} }, action) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export {
  userSigninReducer, userRegisterReducer, userUpdateReducer, userListReducer, userDeleteReducer,
  countBookReducer, countReviewReducer
}