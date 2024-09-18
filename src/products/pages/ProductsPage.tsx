import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest } from '../../store/actions/productActions';
import { RootState, AppDispatch } from '../../store';
import { ProductLayout } from '../layout/ProductLayout';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.productState);


  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  if (loading) return <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ProductLayout />
      <div className='container  mt-3' >
        <h1>Productos</h1>

        <table className='table striped bordered hover table-bordered'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              {/* Agrega más encabezados según tus necesidades */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                {/* Agrega más celdas para otros datos de product.content */}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default ProductsPage;
