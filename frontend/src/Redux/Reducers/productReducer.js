import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,

} from "../Constant/productConstant";


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


  export const productDetailsReducer = (state = { product: {} }, action) => {
    const {type,payload} = action;
    switch (type) {
      case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: payload,
        };
  
     
        case PRODUCT_DETAILS_FAIL:
          return {
            loading: false,
            error: action.payload,
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