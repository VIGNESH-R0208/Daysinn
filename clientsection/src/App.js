import react from "react";
import { BrowserRouter, Route, Link,Switch,Redirect} from "react-router-dom";
import Nav from "./components/topnav";
import Ownerhome from "./components/ownerhome";
import Registerhotel from "./components/ownerform";
import Homecontent from "./components/displayallhotels";
import PrivateRoute from "./components/privateroute";
import Fetchsinglehotel from "./components/individualhotel";
import Searchdisplay from "./components/displaysearchresult";
import Ownerdashboard from "./components/ownerdash";
import Clientdashboard from "./components/clientdashboard";
import Newtasking from "./components/newtasking";
function App() {
  return (
    <div>
    <BrowserRouter>
  
       <Switch>
         <Route exact path="/home" component={Ownerhome} />
          <Route exact path="/ownerform" component={Registerhotel} />
          <Route exact path="/client/home" component={Homecontent} />
         <Route exact path="/search" component={Searchdisplay} /> 
         <Route exact path="/owner/dashboard" component={Ownerdashboard} /> 
         <Route exact path="/new/task" component={Newtasking} /> 
         <Route exact path="/client/dashboard" component={Clientdashboard} /> 
      </Switch>
       <PrivateRoute exact path="/separate/:hotelId" component={Fetchsinglehotel} />
    
     </BrowserRouter> 
    </div>
  );
}

export default App;
