import {
    BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
    BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL,
    // TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
  } from "../constants/bookConstants";

function bookListReducer(state = { books: [] }, action) {
    switch (action.type) {
        case BOOK_LIST_REQUEST:
        return { loading: true, books: [] };
        case BOOK_LIST_SUCCESS:
        return { loading: false, books: action.payload, length: action.length };
        case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state;
    }
}

// function tourDetailReducer(state = { tour: {} }, action) {
//     switch (action.type) {
//       case TOUR_DETAILS_REQUEST:
//         return { loading: true };
//       case TOUR_DETAILS_SUCCESS:
//         return { loading: false, tour: action.payload.tour, images: action.payload.images,
//           reviews: action.payload.reviews, guides: action.payload.guides, 
//           locations: action.payload.locations, date: action.payload.date
//         };
//       case TOUR_DETAILS_FAIL:
//         return { loading: false, error: action.payload }
//       default:
//         return state;
//     }
// }

function bookDeleteReducer(state = { book: {} }, action) {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, book: action.payload, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export { bookListReducer, bookDeleteReducer }