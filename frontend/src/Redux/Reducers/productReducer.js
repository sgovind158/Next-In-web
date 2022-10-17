import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../Constant/productConstant";


export const productsReducer = (state = { products: [] }, action) => {
    const {type,payload} = action;
    switch (type) {
      case ALL_PRODUCT_REQUEST:
     
        return {
          loading: true,
          products: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: payload.products,
          productsCount: payload.productsCount,
          resultPerPage: payload.resultPerPage,
          filteredProductsCount: payload.filteredProductsCount,
        };
  
     
      case ALL_PRODUCT_FAIL:
    
        return {
          loading: false,
          error: payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };