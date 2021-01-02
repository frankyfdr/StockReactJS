import React from 'react';
import Compare from './Components/Compare/Compare.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Show from './Components/Show/Show.js';
import Loading from  "./Components/Loading/Loading.js";
import Login from "./Components/LoginForm/Login.js";


const Routes = (props) => (
    
    <Switch>
        <Route path="/compare/:sym" component={ (props2) => { 

            
            return ( <Compare  sym={props2.match.params}nodejs={props.nodejs} />)
        }} />  
        <Route path="/login" component={Login} />  
        <Route  exact path="/" component={() => 
        {
          
            if(props.symInfo.length != 0)
            return( <Show  symInfo={props.symInfo} />)
            else
            return (<Loading />)
            
        }
            
        } />       
    </Switch>
);
export default Routes;