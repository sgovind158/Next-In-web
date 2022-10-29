import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./Reducers/productReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
});

let initState = {};

const middleware = [thunk];

const store = createStore(reducer,initState,composeWithDevTools(applyMiddleware(...middleware)))

export default store