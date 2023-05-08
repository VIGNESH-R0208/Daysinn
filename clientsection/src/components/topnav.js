import react from "react";
import { Link } from "react-router-dom";




function Nav(){
    return(
     <div>   
      <nav className="navbar navbar-expand-lg navbar-light">
   <div className="container-fluid">
  <i className="fab fa-tripadvisor fa-3x "></i>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  ms-auto">
      <li className="nav-item chill ">
        
    <Link className="nav-link active " aria-current="page" to="/"> home </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/owner/dashboard"> dashboard </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/new/task"> newtask </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/logout"> logout </Link>
      </li>
    </ul>
  </div>
 </div>
 </nav>
    </div>
    )
}
export default Nav;


