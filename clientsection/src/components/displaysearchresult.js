import React from "react";
import {useState,useEffect} from "react";
import  queryString from "query-string";
import { Link } from "react-router-dom";
import Searcher from "./searcher";

import axios from "axios";
import Hotelcards from "./hotelcard";
 function Searchdisplay()
{
   
    const[searchloc,getfinalloc]=useState("");
    const[searchdate,getfinaldate]=useState("");
    const[searchbed,getfinalbed]=useState("");
    const[searchfully,getfulsearch]=useState([]);
    useEffect(()=>
    {
        const{location,date,bed}=queryString.parse(window.location.search)
        console.log({location,date,bed})
        let valo= axios.post('http://localhost:3002/search',({location,bed,date})).then((res)=>{
            console.log(res.data)
            getfulsearch(res.data)
            
        })
    
          
    },[window.location.search])
    return(
        <div style={{backgroundColor:"black",height:"100vh"}}>
           <div className="container allcontainer" style={{paddingTop:"100px",paddingBottom:"50px",position:"relative",left:"100px"}}>
         <Searcher />
        </div>
           <div style={{backgroundColor:"black"}} className="row">

                {searchfully.map((h,index)=><Hotelcards key={h._id} id={h._id}title={h.roomtitle} description={h.roomdesc} location={h.roomlocation} begin={h.from} end={h.to}  />)}
    
           </div>
        </div>
    )
}
export default Searchdisplay;