import {
    BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
    BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL,
    // TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
  } from "../constants/bookConstants"
import axios from 'axios';

const listBooks = () => async (dispatch, getState) => {
    try {
      dispatch({ type: BOOK_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const res = await axios.get("http://localhost:5000/api/v1/bookings", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      // console.log(res.data.data.data);
      dispatch({ type: BOOK_LIST_SUCCESS, payload: res.data.data.data, length : res.data.results });
    }
    catch (error) {
      dispatch({ type: BOOK_LIST_FAIL, payload: error.message });
    }
}

// const detailTour = (tourId) => async (dispatch) => {
//     try {
//       dispatch({ type: TOUR_DETAILS_REQUEST, payload: tourId });
//       const res = await axios.get("http://localhost:5000/api/v1/tours/" + tourId);
      
//       dispatch({ type: TOUR_DETAILS_SUCCESS, payload: 
//         { 
//           tour: res.data.data.data, images: res.data.data.data.images,
//           reviews: res.data.data.data.reviews, guides: res.data.data.data.guides,
//           locations: res.data.data.data.locations, date: res.data.data.data.startDates[0] 
//         }});
//     } catch (error) {
//       dispatch({ type: TOUR_DETAILS_FAIL, payload: error.message });
  
//     }
//   }
  
const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: BOOK_DELETE_REQUEST, payload: bookId });
    const res = await axios.delete("http://localhost:5000/api/v1/bookings/" + bookId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: BOOK_DELETE_SUCCESS, payload: res.data, success: true });
  } catch (error) {
    dispatch({ type: BOOK_DELETE_FAIL, payload: error.message });

  }
}
  
export { listBooks, deleteBook }