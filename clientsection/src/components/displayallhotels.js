
import axios from "axios";
import react, { useState ,useEffect} from "react";
import Hotelcards from "./hotelcard";
import Searcher from "./searcher";
function Homecontent(){
    const[allhotels,getallhotels]=useState([])
    useEffect(()=>{
       fetchallhotels();

    },[])
    async function fetchallhotels(){
         let all=  await axios.get('http://localhost:3002/client/home');
         getallhotels(all.data)
    }
    return (

    <div className="allcontainer">
     <div className="container allcontainer" style={{paddingTop:"100px",paddingBottom:"50px",position:"relative",left:"100px"}}>
     <Searcher />
     </div>
       {allhotels.map((h,index)=><Hotelcards key={h._id} id={h._id}title={h.roomtitle} description={h.roomdesc} location={h.roomlocation} begin={h.from} end={h.to}  />)}
       <div style={{height:"10px"}}> </div>
       <p></p>
    </div>

    );
}
export default Homecontent;