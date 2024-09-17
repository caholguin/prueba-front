import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ProductRoutes } from "../products/routes/ProductRoutes"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";



export const AppRouter = () => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  let token = false;

  if (localStorage.getItem("token")) {
    token = true;    
  }
  
  return (
    <Routes>

        {/* Login */}
        <Route path="/auth/*" element={ < AuthRoutes /> }/>
      
        {/* Products */}        
        <Route path="/" element={token ? <ProductRoutes /> : <Navigate to="/auth" />} />
        {/* <Route path="/*" element={ < ProductRoutes /> }/> */}

    </Routes>
  )
}
