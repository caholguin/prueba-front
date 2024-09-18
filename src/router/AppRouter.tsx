import { Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ProductRoutes } from "../products/routes/ProductRoutes"
import PrivateRoute from "../products/routes/PrivateRoutes"




export const AppRouter = () => {


  
  return (
    <Routes>

        {/* Login */}
        <Route path="/auth/*" element={ < AuthRoutes /> }/>
      
        {/* Products */}    
        {/* <Route path="/products*" element={ < ProductRoutes /> }/>  */}
        <Route path="/products/*" element={<PrivateRoute />}>
        <Route path="*" element={<ProductRoutes />} />
      </Route>

    </Routes>
  )
}
