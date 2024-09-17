import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/auth/authSlice';
import { RootState } from '../../store/store';
import {  useNavigate } from 'react-router';

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().min(2,'Invalid username address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: 'mhernandez',
      password: 'clave789',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
      console.log(isAuthenticated);

      
      

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};




