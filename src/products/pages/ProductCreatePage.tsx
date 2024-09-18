import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { createProductRequest } from '../../store/actions/productActions';
import { useNavigate } from 'react-router';
import { ProductLayout } from '../layout/ProductLayout';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser un número mayor a 0'),
  brand: Yup.string().required('La marca es obligatoria'),
  model: Yup.string().required('El modelo es obligatorio'),
  data: Yup.array().of(
    Yup.object({
      color: Yup.string().required('El color es obligatorio'),
      price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser un número mayor a 0')
    })
  ).min(1, 'Debe haber al menos un dato')
});

const initialValues = {
  name: '',
  price: 0,
  brand: '',
  model: '',
  data: [
    {
      color: '',
      price: 0,
    },
  ],
};


export const ProductCreatePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <>
      <ProductLayout />

      <div className='container card mt-3 mb-3'>

        <h1 className='mt-3 mb-3'>Crear producto</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {            
            const formattedValues = {
              ...values,
              price: Number(values.price),
              data: values.data.map(datum => ({
                ...datum,
                price: Number(datum.price)
              }))
            };
            await new Promise((r) => setTimeout(r, 500));

            dispatch(createProductRequest(formattedValues));

            navigate('/products');
          }}
        >
          {({ values }) => (
            <Form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className='form-label'>Nombre</label>
                <Field className="form-control" id="name" name="name" placeholder="" />
                <ErrorMessage name="name" component="div" className="field-error text-danger" />
              </div>

              <div className="col-md-6">
                <label htmlFor="price" className='form-label'>Precio</label>
                <Field className="form-control" type="number" id="price" name="price" placeholder="" />
                <ErrorMessage name="price" component="div" className="field-error text-danger" />
              </div>

              <div className="col-md-6">
                <label htmlFor="brand" className='form-label'>Marca</label>
                <Field className="form-control" id="brand" name="brand" placeholder="" />
                <ErrorMessage name="brand" component="div" className="field-error text-danger" />
              </div>
              <div className="col-md-6 mb-5">
              <label htmlFor="model" className='form-label'>Modelo</label>
              <Field className="form-control" id="model" name="model" placeholder="" />
              <ErrorMessage name="model" component="div" className="field-error text-danger" />
              </div>

              <hr />

              <FieldArray name="data">
                {({ remove, push }) => (
                  <div>
                    {values.data.length > 0 &&
                      values.data.map((_data, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-4">
                            <label htmlFor={`data.${index}.color`}>Color</label>
                            <Field
                              className="form-control"
                              name={`data.${index}.color`}
                              placeholder=""
                              type="text"
                            />
                            <ErrorMessage
                              name={`data.${index}.color`}
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor={`data.${index}.price`}>Precio</label>
                            <Field
                              className="form-control"
                              name={`data.${index}.price`}
                              placeholder=""
                              type="number"
                            />
                            <ErrorMessage
                              name={`data.${index}.price`}
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                          <div className="col mt-4">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => remove(index)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-primary mb-3"
                      onClick={() => push({ color: '', price: '' })}
                    >
                      Agregar
                    </button>
                  </div>
                )}
              </FieldArray>
              <button type="submit" className='btn btn-success mb-3'>Guardar</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
