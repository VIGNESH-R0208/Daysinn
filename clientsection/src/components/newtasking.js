import React from "react";
import axios from "axios";
import react, { useState ,useEffect} from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import Hotelcards from "./hotelcard";
 function Newtasking(){
        
  const[newtask,Newtasking]=useState([])
  useEffect(()=>{
     allhotels();

  },[])
  async function allhotels(){
       await axios.get('http://localhost:3002/task').then((res)=>{
        console.log(res.data)
        Newtasking(res.data);
        
    })
  }   

  return(
    <div style={{backgroundColor:"black"}}>
    <div style={{height:"70px"}}>

    </div>
  
    <div style={{backgroundColor:"black"}} className="row">

     {newtask.map((h,index)=><Hotelcards key={h._id} id={h._id}title={h.roomtitle} description={h.roomdesc} location={h.roomlocation} begin={h.from} end={h.to}  />)}

</div>
    </div>
  )
}
export default Newtasking;