import {
    TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS, TOUR_LIST_FAIL,
    TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
    TOUR_TOP5_REQUEST, TOUR_TOP5_SUCCESS, TOUR_TOP5_FAIL,
    TOUR_CREATE_REQUEST, TOUR_CREATE_SUCCESS, TOUR_CREATE_FAIL,
    TOUR_DELETE_REQUEST, TOUR_DELETE_SUCCESS, TOUR_DELETE_FAIL,
    TOUR_SAVE_REQUEST, TOUR_SAVE_SUCCESS, TOUR_SAVE_FAIL,
  } from "../constants/tourConstants"
import axios from 'axios';
import showAlert from '../functions/alerts';

const listTours = (difficulty = '', search = '', sort = '') => async (dispatch) => {
    try {
      dispatch({ type: TOUR_LIST_REQUEST });
      const res = await axios.get("http://localhost:5000/api/v1/tours?difficulty=" + difficulty +
        "&search=" + search + "&sort=" + sort);
      // console.log(res.data.data.data);
      dispatch({ type: TOUR_LIST_SUCCESS, payload: res.data.data.data, length : res.data.results });
    }
    catch (error) {
      dispatch({ type: TOUR_LIST_FAIL, payload: error.message });
    }
}

const top5Tours = () => async (dispatch) => {
  try {
    dispatch({ type: TOUR_TOP5_REQUEST });
    const res = await axios.get("http://localhost:5000/api/v1/tours/top-5-cheap");
    // console.log(res.data.data.data);
    dispatch({ type: TOUR_TOP5_SUCCESS, payload: res.data.data.data, length : res.data.results });
  }
  catch (error) {
    dispatch({ type: TOUR_TOP5_FAIL, payload: error.message });
  }
}

const createTour = (form) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOUR_CREATE_REQUEST });
    const { userSignin: { userInfo } } = getState();

    axios.interceptors.request.use((config) => {
      const token =  userInfo.token;
      config.headers.Authorization =  `Bearer ${token}`;
      return config;
    }, (error) => {
      return Promise.reject(error);
  });
    const url = 'http://localhost:5000/api/v1/tours';
        const res = await axios({
          method: 'POST',
          url,
          form
        });
    
        if (res.data.status === 'success') {
          // showAlert('success', 'sds');
          dispatch({ type: TOUR_CREATE_SUCCESS, payload: res.data.status });
        }
    // const res = await axios.post(`http://localhost:5000/api/v1/tours`, 
    //   form, {
    //     headers: {
    //       'Authorization': 'Bearer ' + userInfo.token
    //     }
    //   });
      
  }
  catch (error) {
    dispatch({ type: TOUR_CREATE_FAIL, payload: error.message });
  }
}

const detailTour = (tourId) => async (dispatch) => {
    try {
      dispatch({ type: TOUR_DETAILS_REQUEST, payload: tourId });
      const res = await axios.get("http://localhost:5000/api/v1/tours/" + tourId);
      
      dispatch({ type: TOUR_DETAILS_SUCCESS, payload: 
        { 
          tour: res.data.data.data, images: res.data.data.data.images,
          reviews: res.data.data.data.reviews, guides: res.data.data.data.guides,
          locations: res.data.data.data.locations, date: res.data.data.data.startDates[0] 
        }});
    } catch (error) {
      dispatch({ type: TOUR_DETAILS_FAIL, payload: error.message });
  
    }
  }
  
  const deleteTour = (tourId) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: TOUR_DELETE_REQUEST, payload: tourId });
      const res = await axios.delete("http://localhost:5000/api/v1/tours/" + tourId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: TOUR_DELETE_SUCCESS, payload: res.data, success: true });
    } catch (error) {
      dispatch({ type: TOUR_DELETE_FAIL, payload: error.message });
  
    }
  }
  
  const saveTour = (tour, tourId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOUR_SAVE_REQUEST, payload: tour });
      const { userSignin: { userInfo } } = getState();
      // if (!tour._id) {
      //   const res = await axios.post(`http://localhost:5000/api/v1/tours`, 
      //   tour, {
      //     headers: {
      //       'Authorization': 'Bearer ' + userInfo.token
      //     }
      //   });
      //   dispatch({ type: TOUR_SAVE_SUCCESS, payload: res.data.status });
      // } else {
        const res = await axios.patch('http://localhost:5000/api/v1/tours/' + tourId, 
        tour, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: TOUR_SAVE_SUCCESS, payload: res.data });
      // }
    } catch (error) {
      dispatch({ type: TOUR_SAVE_FAIL, payload: error.message });
      // showAlert('error', error.response.data.message);
    }
  }


  export { listTours, detailTour, top5Tours, createTour, deleteTour, saveTour }