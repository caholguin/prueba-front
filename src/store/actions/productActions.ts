export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export interface Product {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Content[];
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  last:             boolean;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Content {
  id:    number;
  name:  string;
  brand: string;
  model: string;
  data:  Datum[];
}

export interface Datum {
  id:        number;
  productId: number;
  price:     number;
  color:     string;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  unsorted: boolean;
  sorted:   boolean;
}

export interface SaveProduct {
  name:  string;
  price: number;
  brand: string;
  model: string;
  data:  SaveDatum[];
}

export interface SaveDatum {
  color: string;
  price: number;
}



export interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  error: string;
}

export interface CreateProductRequestAction {
  type: typeof CREATE_PRODUCT_REQUEST;
  payload: Omit<SaveProduct, 'id'>; 
}

export interface CreateProductSuccessAction {
  type: typeof CREATE_PRODUCT_SUCCESS;
  payload: SaveProduct;
}

export interface CreateProductFailureAction {
  type: typeof CREATE_PRODUCT_FAILURE;
  error: string;
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | CreateProductRequestAction
  | CreateProductSuccessAction
  | CreateProductFailureAction;


export const fetchProductsRequest = (): FetchProductsRequestAction => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]): FetchProductsSuccessAction => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: string): FetchProductsFailureAction => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});


export const createProductRequest = (product: Omit<SaveProduct, 'id'>) => ({
  type: CREATE_PRODUCT_REQUEST,
  payload: product,
});

export const createProductSuccess = (product: SaveProduct) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

export const createProductFailure = (error: string) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});
