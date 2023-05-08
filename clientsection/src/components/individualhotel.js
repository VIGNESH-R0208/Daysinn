
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Bookhotel from "../reactactions/bookhotel";
import Searcher from "./searcher";
function Fetchsinglehotel({match})
{
  const[onehotel,fetchone]=useState({});
  const[podapunda,checked]=useState(false);

  useEffect(()=>{
    console.log(match);
    fetchingonehotel();
  },[])
  useEffect(()=>{
    checkbookedhotel();
  },[])
  async function fetchingonehotel(){
    const alts=await axios.get('http://localhost:3002/single/'+(match.params.hotelId))
    fetchone(alts.data)
    console.log(alts)
    
  }
  async function checkbookedhotel()
  {
    const check=await axios.get('http://localhost:3002/check/'+(match.params.hotelId)).then((res) =>{
      console.log(res.data.results)
      checked(res.data.results);
      console.log({podapunda})
    })
  
  }
  async function savehotel(){
    var saving=new FormData();
    saving.append('saveid',match.params.hotelId)
    saving.append('savename',onehotel.roomtitle)
    saving.append('roomdesc',onehotel.roomdesc)
    saving.append('roomlocation',onehotel.roomlocation)
    saving.append('from',onehotel.from)
    saving.append('to',onehotel.to)
    saving.append('price',onehotel.price)
    saving.append('bed',onehotel.bed)  
    console.log(Array.from(saving));
    try{
      const saveditems=await Bookhotel(saving).then
      alert("hotel succssfully booked");
       //setTimeout(()=>{
          //  window.location.reload();
          //},1000)
    }
    catch(err)
    {
      console.log(err)
    }
  }
function datecalc(fromdate,todate)
{
   const oneday=24*60*60*1000;
   const begin=new Date(fromdate)
   const end=new Date(todate);
   const totalday=Math.round(Math.abs((begin-end)/oneday));
   return totalday;
}
  
  return(
    <div style={{backgroundColor:"black",height:"100vh"}} >
   
      <div className="container-fluid singlecol2"  >    

       <div className="row ">
         <div className="col-md-6" >
         <img src={'http://localhost:3002/collect/image/'+ (match.params.hotelId)} alt="https://via.placeholder.com/900x500.png?text=roomimage" className="card-image-2 img img-fluid " />       
          </div>
         <div className="col-md-6  secondcolumn" style={{paddingTop:"100px"}}>

           <h5 style={{fontFamily: "'Mate SC', serif", color:"white",fontWeight:"bold",paddingTop:"10px" ,paddingBottom:"10px",fontSize:"30px"}} >{onehotel.roomtitle}</h5>
           <hr style={{color:"white"}}></hr>
           <i class="fas fa-map-marker-alt"> <h7 style={{color:"#1597BB",fontWeight:"bold",fontSize:"17px"}}>  {onehotel.roomlocation}  </h7>   </i>
           <p> </p>
           <p style={{fontFamily:"'Crimson Text', serif",paddingTop:"10px",fontSize:'17px', paddingBottom:"30px"}}>{onehotel.roomdesc}...</p>
           
           <p>

           </p>
                <div className="row " style={{paddingBottom:"20px"}}>
                     <div className="col-md-3">
                      <h8 style={{fontSize:"15px",backgroundColor:"#362222",padding:"8px",borderRadius:"10%"}}> Available for  {datecalc(onehotel.from,onehotel.to)} {datecalc(onehotel.from,onehotel.to)<=1?'day':'days'} </h8>
                     </div>
                       <div className="col-md-3">
                          <h8 style={{fontSize:"15px",backgroundColor:"#362222",padding:"8px",borderRadius:"10%"}}> from :11/11/11 </h8>
                        </div>
                        <div className="col-md-3">
                          <h8 style={{fontSize:"15px",backgroundColor:"#362222",padding:"8px",borderRadius:"10%"}}> to :11/11/11 </h8>
                        </div>
                        <div className="col-md-3">
                          <h8 style={{fontSize:"15px",backgroundColor:"#362222",padding:"8px",borderRadius:"10%"}}> bed:{onehotel.bed} </h8>
                        </div>
                    </div>
                    <div style={{height:"50px"}}>

                    </div>
                    <button onClick={savehotel} type="button" class="btn btn-info" disabled={podapunda}>{podapunda?'ALREADYBOOKED':'BOOK NOW'}</button>
        </div>
        </div>
        </div>           

   <p></p>

</div>

  )

}

export default Fetchsinglehotel;