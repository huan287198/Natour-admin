import axios from "axios";
import {
  REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS, REVIEW_LIST_FAIL,
  
} from "../constants/reviewConstants";
import { showAlert } from '../functions/alerts';

const listReviews = () => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const res = await axios.get("http://localhost:5000/api/v1/reviews", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: REVIEW_LIST_SUCCESS, payload: res.data.data.data })
    } catch (error) {
      dispatch({ type: REVIEW_LIST_FAIL, payload: error.message });
    }
}
export { listReviews };