/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";
import { Context } from "../API/Context.js";
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

const App = (props) =>
{ 
const ctx = useContext(Context)
const [x,setX] = useState();
const [y,setY]= useState();
    useEffect(() => {
        var d = new Date();
     
    const data = {
        
        "sym":props.sym,
        "p1": d.setDate(d.getDate()),
        "p2": d.setDate(d.getDate() - 5)
    }
    axios.get(ctx[6]+"/graf/"+data.sym+"/"+data.p2+"/"+data.p1).then((data)=>{

        const _X = data.data[0].map((item)=>{
            let date = new Date(item*1000)

            return date.getDate()+"/"+(date.getMonth()+1)+"-"+date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes() ;
        })
        setX(_X)
        setY(data.data[1])

 
    })
      },[props.sym]);


return(<div id="myDiv">
  <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
          },
        
        ]}
        layout={ {width: "100%", height: "100%",backgroundColor:"black"}}
      />
</div>
)}

export default App;
