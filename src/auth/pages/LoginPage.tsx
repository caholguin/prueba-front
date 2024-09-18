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

  const initialValues: LoginFormValues = { username: 'admin', password: 'clave789' };


  const handleSubmit = (values: LoginFormValues) => {    
    dispatch(loginRequest(values, navigate));
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="border p-4 rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 fw-normal">Login</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<LoginFormValues> = {};
            if (!values.username) {
              errors.username = 'El username es obligatorio';
            }
            if (!values.password) {
              errors.password = 'La contraseña es obligatoria';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}

              <button type="submit" disabled={isSubmitting || loading} className="btn btn-primary w-100">
                {loading ? 'Loading...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;


