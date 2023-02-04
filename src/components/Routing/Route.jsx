import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import "../../index.css";
import App from "../../App";
import Signin from "../Signinpage/Signin";
import Signup from "../SignUp page/Signup";
import Sellerhome from "../Seller/Sellerhome";
import Completed from "../Seller/Completed";
import Delivery from "../Seller/Delivery";
import Particle from "../Homepage/particles";
import { Admin } from "../Admin/Admin";
import Master from "../Admin/Master/Master";
import Addmobile from "../Admin/Master/Addmobile";
import Sidebar from "../SIdebar/Sidebar";
import SidebarLayout from "../SIdebar/Sidebarlayout";
import Upcoming from "../Seller/Upcoming";
import Newuser from "../Seller/newuser";
import { QueryClient, QueryClientProvider } from 'react-query';
import AdCompleted from "../Admin/Completed";
import AdDelivery from "../Admin/Delivery";
import AdUpcoming from "../Admin/Upcoming";
const queryClient = new QueryClient()
const Routing =()=>{
  return(
    <QueryClientProvider client={queryClient}>
    <Router forceRefresh={true} >
      <Routes >
        <Route element={<SidebarLayout/>}>
        <Route path="/sellerhome" element={<Sellerhome/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/completed" element={<Completed/>}></Route>
        <Route exact path="/delivery" element={<Delivery/>}></Route>
        <Route exact path="/upcoming" element={<Upcoming/>}></Route>
        <Route exact path="/adcompleted" element={<AdCompleted/>}></Route>
        <Route exact path="/addelivery" element={<AdDelivery/>}></Route>
        <Route exact path="/adupcoming" element={<AdUpcoming/>}></Route>
        </Route>
        
        <Route exact path="/" element={<App />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
      
        
        
        <Route exact path="/particles" element={<Particle/>}></Route>
       
        <Route exact path="/master" element={<Master/>}></Route>
        <Route exact path="/addmobile" element={<Addmobile/>}></Route>
        <Route exact path="/newuser" element={<Newuser/>}></Route>
      </Routes>
    </Router>
    </QueryClientProvider>
    )
}
 

ReactDOM.render(<Routing/>, document.getElementById("root"));
