import axios from "axios";
import Cookie from 'js-cookie';
import { showAlert } from '../functions/alerts';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, 
  USER_LOGOUT, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_COUNT_BOOK_REQUEST, USER_COUNT_BOOK_SUCCESS, USER_COUNT_BOOK_FAIL,
  USER_COUNT_REVIEW_REQUEST, USER_COUNT_REVIEW_SUCCESS, USER_COUNT_REVIEW_FAIL,
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/login", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
      showAlert('success', 'Logged in successfully!');
      Cookie.set('userInfo', JSON.stringify(res.data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT });
}

const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const res = await axios.get("http://localhost:5000/api/v1/users", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    // console.log(res.data.data.data);
    dispatch({ type: USER_LIST_SUCCESS, payload: res.data.data.data, length: res.data.results,
    lenBooking: res.data.lenBooking, lenReview: res.data.lenReview });
  }
  catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
}

const countBooks = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_COUNT_BOOK_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const res = await axios.get("http://localhost:5000/api/v1/users/count-books/" + userId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    // console.log(res.data.data.data);
    dispatch({ type: USER_COUNT_BOOK_SUCCESS, payload: res.data.results });
  }
  catch (error) {
    dispatch({ type: USER_COUNT_BOOK_FAIL, payload: error.message });
  }
}

const countReviews = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_COUNT_REVIEW_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const res = await axios.get("http://localhost:5000/api/v1/users/count-reviews/" + userId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    // console.log(res.data.data.data);
    dispatch({ type: USER_COUNT_REVIEW_SUCCESS, payload: res.data.results });
  }
  catch (error) {
    dispatch({ type: USER_COUNT_REVIEW_FAIL, payload: error.message });
  }
}

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const res = await axios.delete("http://localhost:5000/api/v1/users/" + userId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: res.data, success: true });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });

  }
}

export { signin, logout, listUsers, deleteUser, countBooks, countReviews };