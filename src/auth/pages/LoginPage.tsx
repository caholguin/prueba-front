import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router';
import { loginRequest } from '../../store/actions/authActions';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues: LoginFormValues = { username: 'mhernandez', password: 'clave789' };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<LoginFormValues> = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          dispatch(loginRequest({ ...values, navigate }));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='mb-3'>
              <label htmlFor="username" className="form-label">Username</label>
              <Field type="text" name="username" className="form-control"/>

              
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
