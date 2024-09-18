import { Navigate, Route, Routes } from "react-router"


import ProductsPage from "../pages/ProductsPage"
import { ProductCreatePage } from "../pages/ProductCreatePage"


export const ProductRoutes = () => {
  return (
    <Routes>
        <Route path="create" element={ <ProductCreatePage /> } />
        <Route path="/" element={ <ProductsPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
