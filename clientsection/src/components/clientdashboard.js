import React from "react";
import axios from "axios";
import react, { useState ,useEffect} from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import Hotelcards from "./hotelcard";
 function Clientdashboard(){
    const[ownerdash,Ownerdashboard]=useState([])
    useEffect(()=>{
       allhotels();
  
    },[])
    async function allhotels(){
         await axios.get('http://localhost:3002/clientdash').then((res)=>{
          console.log(res.data)
          Ownerdashboard(res.data);
          
      })
    }   
  
    return(
      <div style={{backgroundColor:"black"}}>
      <div style={{height:"70px"}}>
  
      </div>
    
      <div style={{backgroundColor:"black"}} className="row">
  
      {ownerdash.map((h,index)=><Hotelcards key={h.saveid} id={h.saveid}title={h.savename} description={h.roomdesc} location={h.roomlocation} begin={h.from} end={h.to}  />)}
  
  </div>
      </div>
    )

}
export default Clientdashboard;