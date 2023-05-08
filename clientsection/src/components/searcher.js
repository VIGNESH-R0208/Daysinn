import {useHistory} from 'react-router-dom';
import React,{useState} from "react";
import { DatePicker,Select } from "antd";
import AlgoliaPlacesReact from 'algolia-places-react/dist';
import 'antd/dist/antd.css';
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";
const {RangePicker}=  DatePicker;
const {option}=Select;


const Angoliaoptions={
    appId:process.env.ANGOLIA_APP_ID,
    searchKey:process.env.ANGOLIA_SEARCH_KEY,
    language:"en"

}

function Searcher()
{
    const history=useHistory();

    const[location,updatelocation]=useState("")
    const[date,updatedate]=useState("")
    const[bed,updatebed]=useState("")
    const[hotel,updatehotel]=useState("")
    function getfinalsearch()
    {

 
        history.push("/search?location="+location+"&bed="+bed+"&date="+date)
    }
    return(
        <div>
            <div className="container">
               <div className="row">
                   <div className="col-md-3">
                   <AlgoliaPlacesReact options={Angoliaoptions} defaultValue={location} placeholder="location(nearby)" className="form-control m-2" onChange={({suggestion})=>updatelocation(suggestion.value)} required/>
                  </div>
                <div className="col-md-3">     
                <RangePicker 
                 onChange={(Date,datestring)=>
                 updatedate(datestring)
                    }
                 className="form-control m-2"
                 style={{paddingTop:"6px",paddingBottom:"10px"}}
                    placeholder="from"
                  disabledDate={(current)=>{
                 return  current  && current.valueOf() < moment().subtract(1,"days")
                  }}
                 required
                />         
                </div>
                <div className="col-md-3">
                <Select required placeholder="number of beds" className="form-control m-2" size="large" onChange={(values)=>{updatebed(values)}}> 
                 <option key={1}>1</option>
                <option key={2}>2</option>
                <option key={4}>4</option>
                <option key={10}>10</option>
               </Select>
               
              </div>
              <div className="col-md-3">
                <SearchOutlined  style={{color:"white",fontSize:"20px",paddingTop:"23px",paddingLeft:"20px"}}onClick={getfinalsearch} />
                </div>
               </div>
               
            </div>
        </div>
    )
}
export default Searcher;