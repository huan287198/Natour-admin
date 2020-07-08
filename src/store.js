import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { 
    userSigninReducer, userRegisterReducer, userUpdateReducer, 
    userListReducer, userDeleteReducer,
    countBookReducer, countReviewReducer
} from './reducers/userReducers';
import { 
    tourListReducer, tourDetailReducer, top5TourReducer, 
    createTourReducer ,tourDeleteReducer, tourSaveReducer
} from './reducers/tourReducers';
import { bookListReducer, bookDeleteReducer } from './reducers/bookReducers';
import { reviewListReducer } from './reducers/reviewReducers';

// const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    countBook: countBookReducer,
    countReview: countReviewReducer,
    tourList: tourListReducer,
    tourDetail: tourDetailReducer,
    top5Tour: top5TourReducer,
    tourSave: tourSaveReducer,
    tourDelete: tourDeleteReducer,
    bookList: bookListReducer,
    bookDelete: bookDeleteReducer,
    reviewList: reviewListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;