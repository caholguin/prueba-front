/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  ProductActionTypes,  
} from '../actions/productActions';

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: [...state.products, action.payload] };
    case FETCH_PRODUCTS_FAILURE:
    case CREATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
