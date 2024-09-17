import { Navigate, Route, Routes } from "react-router"
import { ProductsPage } from "../pages/ProductsPage"


export const ProductRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ProductsPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
