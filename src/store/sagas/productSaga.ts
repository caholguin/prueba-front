/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
  CREATE_PRODUCT_REQUEST,
  createProductSuccess,
  createProductFailure,
  Product,
  Content,
  SaveProduct,  
} from '../actions/productActions';


const baseUrl = import.meta.env.baseUrl;

console.log('URL',baseUrl);

// Función para obtener el token del localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Configura los headers con el token
const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

const fetchProductsFromApi = async (): Promise<Content[]> => {
  const response = await axios.get<Product>(`http://localhost:8080/api/v1/products`, getAuthHeaders());  

  return response.data.content;
};

const createProductApi = async (product: Omit<SaveProduct, 'id'>): Promise<SaveProduct> => {

  const response = await axios.post<SaveProduct>(`http://localhost:8080/api/v1/products`, product, getAuthHeaders());
  return response.data;
 
};

function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(fetchProductsFromApi);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* createProductSaga(action: any) {
  try {
    const product: SaveProduct = yield call(createProductApi, action.payload);
    yield put(createProductSuccess(product));
  } catch (error: any) {
    yield put(createProductFailure(error.message));
  }
}

export function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(CREATE_PRODUCT_REQUEST, createProductSaga);
}
