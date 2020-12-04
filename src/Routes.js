import React from 'react';
import Compare from './Components/Compare/Compare.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Show from './Components/Show/Show.js';
import Loading from  "./Components/Loading/Loading.js";


const Routes = (props) => (
    
    <Switch>
        <Route path="/compare/:sym" component={Compare} />  
        <Route  exact path="/" component={() => 
        {
          
            if(props.list.length !==0)
            return( <Show  list={props.list} listCnt={props.listCnt} setListCnt={props.setListCnt} />)
            else
            return (<Loading />)
            
        }
            
        } />       
    </Switch>
);
export default Routes;