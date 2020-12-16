import React from 'react';
import "./style.css";
const Loading = ()=>
  <div className="loadDiv">     
        <center>
        <div className="loader" id="loader"></div>
        <div className="loader" id="loader2"></div>
        <div className="loader" id="loader3"></div>
        <div className="loader" id="loader4"></div>
        <span id="text">LOADING...</span><br></br>
        </center>
</div>      

export default Loading;