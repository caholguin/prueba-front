import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../store/actions/authActions";

export const ProductLayout = () => {


  const dispatch = useDispatch(); 


  const handleSubmit = () => {    
    dispatch(logoutRequest());
  };

  return (
   <>  

   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Productos</Link>         
        </li>        
        <li className="nav-item">          
          <Link className="nav-link active" aria-current="page" to="/products/create">Crear</Link>
        </li>        

        <button className="btn btn-danger" onClick={handleSubmit}>
              Logout
            </button>
      </ul>      
    </div>
  </div>
</nav>
   
</>
    

    


  )
}
