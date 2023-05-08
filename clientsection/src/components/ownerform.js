import react, { useState } from"react";
import AlgoliaPlacesReact from 'algolia-places-react/dist'
import 'antd/dist/antd.css';
import { DatePicker, Select } from 'antd';
import moment from "moment";
//import { format } from "morgan";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Posthotel from "../reactactions/formsending";

function Registerhotel(){
    const[uploadimg,uploadimgcontent]=useState("https://via.placeholder.com/100x100.png?text=PREVIEW")
    const [location,roomloc]=useState(""); 
    const [registeroom ,addroom]=useState({
    roomtitle:"",
    roomdesc:"",
    roomimg:"",
    roomrate:"",
    bedcount:"",
    fromdate:"",
    todate:"" 
});
  const {roomtitle,roomdesc,bedcount,roomimg,roomrate,fromdate,todate}=registeroom;
  const {option}=Select;
  function Forminput(event)
  {
    const naming=event.target.name;
    const value =event.target.value;
    if(naming==="roomtitle")
    {
      addroom((prevalue) =>{
        return{
          roomtitle:value,
          roomdesc:prevalue.roomdesc,
          roomimg:prevalue.roomimg,
          roomrate:prevalue.roomrate,
          fromdate:prevalue.fromdate,
          bedcount:prevalue.bedcount,
          todate:prevalue.todate

        };
      });
    }
    else if(naming==="roomdesc")
    {
      addroom((prevalue) =>{
        return{
          roomtitle:prevalue.roomtitle,
          roomdesc:value,
        
          roomimg:prevalue.roomimg,
          roomrate:prevalue.roomrate,
          fromdate:prevalue.fromdate,
          bedcount:prevalue.bedcount,
          todate:prevalue.todate

        };
      });
    }
   else  if(naming==="roomrate")
    {
      addroom((prevalue) =>{
        return{
          roomtitle:prevalue.roomtitle,
          roomdesc:prevalue.roomdesc,
          roomimg:prevalue.roomimg,
          roomrate:value,
          fromdate:prevalue.fromdate,
          bedcount:prevalue.bedcount,
          todate:prevalue.todate
        };
      });
    }
   else if(naming==="fromdate")
   {
      addroom((prevalue) =>{
        return{
          roomtitle:prevalue.roomtitle,
          roomdesc:prevalue.roomdesc,
          roomimg:prevalue.roomimg,
          bedcount:prevalue.bedcount,
          roomrate:prevalue.roomrate,
          fromdate:value,
          todate:prevalue.todate

        };
      });
    }
    else
    {
      addroom((prevalue) =>{
        return{
          roomtitle:prevalue.roomtitle,
          roomdesc:prevalue.roomdesc,
          roomimg:prevalue.roomimg,
          roomrate:prevalue.roomrate,
          fromdate:prevalue.fromdate,
          bedcount:prevalue.bedcount,
          todate:value

        };
      });
    }
    
    
  }
  const Angoliaoptions={
    appId:process.env.ANGOLIA_APP_ID,
    searchKey:process.env.ANGOLIA_SEARCH_KEY,
    language:"en"

  }
  function Photoupdate(event){
    //console.log(event.target.files[0])
    uploadimgcontent(URL.createObjectURL(event.target.files[0])) //IT IS USED TO ACCESS THE WINDOWS IMAGE OBJECT
    addroom({...registeroom,roomimg:event.target.files[0]})
  }
 async function Finalformsubmission(event)
  {
      event.preventDefault()
      console.log(registeroom);
      console.log(location);
      var postData= new   FormData();
      postData.append('roomtitle',roomtitle)
      postData.append('roomdesc',roomdesc)
      roomimg && postData.append('roomimg',roomimg)
      postData.append('roomlocation',location)
      postData.append('from',fromdate)
      postData.append('to',todate)
      postData.append('price',roomrate)
      postData.append('bed',bedcount)
      console.log(Array.from(postData))
      console.log("please")
     
      try
      {
      
  
       const final=  Posthotel(postData).then
       alert("hotel succssfully booked");
       setTimeout(()=>{
            window.location.reload();
          },1000)
    
      }
     catch(err)
     {
      alert("not working");
     }
  }

  function Imageuploading(){
  return(

    <form  onSubmit={Finalformsubmission} className="formpad"> 
       <div className="form-group">
       <label className="btn btn-outline-secondary btn-block m-2 text-left">
       upload a image
       <input type="file" name="image"  accept="image/*" hidden onChange={Photoupdate} />

       </label>
       <p></p>
       </div>
       <input   type="text"  name="roomtitle"  onChange={Forminput}  className="form-control m-2 formdesign" placeholder="title" requires />
       <p></p>
       <textarea   type="text" name="roomdesc"  onChange={Forminput} value={roomdesc} className="form-control m-2 formdesign textpad" placeholder="description"  required/>
       <p></p>
       <AlgoliaPlacesReact  placeholder="location(nearby)" className="form-control m-2 formdesign" onChange={({suggestion})=>roomloc(suggestion.value)} required/>
       <p></p>
      <input type="Number" name="roomrate"  onChange={Forminput} value={roomrate} className="form-control m-2 formdesign" placeholder="price $"  required/>
       <Select required placeholder="number of beds" className="form-control m-2 formdesign" size="large" onChange={(values)=>{addroom({...registeroom,bedcount:values})}}> 
       <option key={1}>1</option>
       <option key={2}>2</option>
       <option key={4}>4</option>
       <option key={10}>10</option>
       </Select>
       <p></p>
      <DatePicker 
         onChange={(Date,datestring)=>
          addroom({...registeroom,fromdate:datestring})
          }
         className="form-control m-2 formdesign"
         placeholder="from"
         disabledDate={(current)=>{
          return  current  && current.valueOf() < moment().subtract(1,"days")
         }}
         style={{
         
         border: "2px solid black",
         borderRadius: "10px"

       }}
   
         required
      />
       <p></p>
      <DatePicker 
         onChange={(date,datestring)=>
          addroom({...registeroom,todate:datestring})
          }
         className="form-control m-2 formdesign"
         placeholder="to"
         disabledDate={(current)=>{
          return  current  && current.valueOf() < moment().subtract(2,"days")
         }}
         style={{
         
            border: "2px solid black",
            borderRadius: "10px"
   
          }}
         required
      />
      <p></p>
      <p></p>
        <button type="submit" class="btn btn-dark">save</button>
    </form>
  );
    
   } 

    return(<div className="formback">
     <div className="container-fluid p-5 textcenter " >
      
  
    </div>
     <div className="container-fluid   ">
        <div className="row">
        <div className="col-md-6">
            <img src="https://image.freepik.com/free-vector/hostel-employee-chef-maid-bell-boy-education_335657-3154.jpg" alt="" ></img>
          </div>
          <div className="col-md-4">
          {Imageuploading()}
            
          </div>
        </div>
       <p></p>
    
     </div>
     
     
    </div>
   
 )
}
export  default Registerhotel;