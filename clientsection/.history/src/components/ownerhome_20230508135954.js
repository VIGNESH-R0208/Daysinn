import React from "react";
import Nav from "./topnav";
import { Link } from "react-router-dom";

function Ownerhome()
{
    return (
        <div style={{backgroundColor:"#BB371A",height:"100vh"} }>
         <Nav/>
         <div className="container">
           <div className="row">
              <div className="col-md-6">
                <h1 className="ohomehead"> lets  start  updating  your  hotel</h1>
                <p></p>
                <hr></hr>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem</p>
                <Link className="ohomelink" to="/ownerform"> start  </Link>
           
             </div>
             <div className="Col-md-6 second" >
                
              </div>
            </div>
           </div>
         </div>
    
    )
}
export default Ownerhome;