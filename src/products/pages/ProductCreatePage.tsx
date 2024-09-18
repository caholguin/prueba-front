import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { createProductRequest } from '../../store/actions/productActions';
import { useNavigate } from 'react-router';
import { ProductLayout } from '../layout/ProductLayout';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser un número positivo'),
  brand: Yup.string().required('La marca es obligatoria'),
  model: Yup.string().required('El modelo es obligatorio'),
  data: Yup.array().of(
    Yup.object({
      color: Yup.string().required('El color es obligatorio'),
      price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser un número positivo')
    })
  ).min(1, 'Debe haber al menos un dato')
});

const initialValues = {
  name: 'prueba',
  price: 500,
  brand: 'prueba',
  model: 'prueba',
  data: [
    {
      color: 'prueba',
      price: 500,
    },
  ],
};


export const ProductCreatePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <>
      <ProductLayout />
    <h1 className='mt-3 mb-3'>Crear producto</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
           // Convertir todos los precios a números
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
        <Form>

        <label htmlFor="name">Nombre</label>
        <Field id="name" name="name" placeholder="" />
        <ErrorMessage name="name" component="div" className="field-error" />

        <label htmlFor="price">Precio</label>
        <Field type="number" id="price" name="price" placeholder="" />
        <ErrorMessage name="price" component="div" className="field-error" />

        <label htmlFor="brand">Marca</label>
        <Field id="brand" name="brand" placeholder="" />
        <ErrorMessage name="brand" component="div" className="field-error" />

        <label htmlFor="model">Modelo</label>
        <Field id="model" name="model" placeholder="" />
        <ErrorMessage name="model" component="div" className="field-error" />

          <FieldArray name="data">
            {({ remove, push }) => (
              <div>
                {values.data.length > 0 &&
                  values.data.map((_data, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`data.${index}.color`}>Color</label>
                        <Field
                          name={`data.${index}.color`}
                          placeholder=""
                          type="text"
                        />
                        <ErrorMessage
                          name={`data.${index}.color`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`data.${index}.price`}>Precio</label>
                        <Field
                          name={`data.${index}.price`}
                          placeholder=""
                          type="number"
                        />
                        <ErrorMessage
                          name={`data.${index}.price`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ color: '', price: '' })}
                >
                  Agregar
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Guardar</button>
        </Form>
      )}
    </Formik>
  </>
  )
}
