import react from 'react';
import {useHistory} from 'react-router-dom';

function datecalc(fromdate,todate)
{
   const oneday=24*60*60*1000;
   const begin=new Date(fromdate)
   const end=new Date(todate);
   const totalday=Math.round(Math.abs((begin-end)/oneday));
   return totalday;
}

function Hotelcards(props)
{
  const history=useHistory();
    return(        
    <div>
         
         <div className="container singlecol">
         <div className="row">
            <div className="col-md-5" >
           <img src={'http://localhost:3002/collect/image/'+ (props.id)} alt="https://via.placeholder.com/900x500.png?text=roomimage" className="card-image img img-fluid " />       
             </div>
             <div className="col-md-7  secondcolumn">

                <h5 style={{fontFamily: "'Mate SC', serif", color:"black",fontWeight:"bold",paddingTop:"10px"}} >{props.title}</h5>
                <hr style={{color:"black"}}></hr>
                <i class="fas fa-map-marker-alt"> <h7 style={{color:"#1597BB",fontWeight:"bold"}}>  {props.location}  </h7>   </i>
                <p> </p>
                <p style={{fontFamily:"'Crimson Text', serif"}}>{props.description}...</p>
                <p>

                </p>
                  <div className="row">
                    <div className="col-md-5">
                        <h8 style={{fontSize:"12px",backgroundColor:"#E7E7DE",padding:"8px",borderRadius:"10%"}}> Available for  {datecalc(props.begin,props.end)} {datecalc(props.begin,props.end)<=1?'day':'days'} </h8>
                    </div>
                    <div className="col-md-5">
                      <h8 style={{fontSize:"12px",backgroundColor:"#E7E7DE",padding:"8px",borderRadius:"10%"}}> from :11/11/11 </h8>
                    </div>

                  </div>
                  <div style={{height:"30px"}}>

                  </div>
                  
                 <button onClick={()=>{
                   history.push('/separate/'+(props.id))
                 }} className="btn btn-dark" >view details</button>
               </div>
         </div>
         </div>

        <p></p>
        
    </div>

  );
}

export default Hotelcards;