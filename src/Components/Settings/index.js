/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Settings = (props) => {
  
  const [list, setList] = useState();
  const [checkList, setCheckList] = useState("");
  

  useEffect(() => {
    if (props.list != null) {
      ShowSymList();
    }
    
  }, [props.list, checkList]);

  const ShowSymList = () => 
  {
     var list = props.list.map((item) => 
     {
        return (
          <label className="ListSym" key={item.sym} id="" value={item.sym}>
            <input className="inputCk" onClick={clicked} value={item.sym} type="checkbox" />
            {item.name}
          </label>
        );
      });
      setList(list);
  }


  const clicked = (event) => 
  {
    if(event.target.checked === true)
    {
      if(checkList !== "")
      setCheckList(checkList+","+event.target.value);
      else
      setCheckList(event.target.value);
    }
    console.log(event.target.value)
  }


  return (
    
    <div id="sideSet">
      <button
        className="CollapseBtn"
        data-toggle="collapse"
        data-target="#sideSelect"
        onClick={ShowSymList}
      >
        Stock List
      </button>


      <div className="collapse" id="sideSelect">
        {list}
        <div className="optionsBTN">
        
          <div id="btnCmp" onClick={() => document.getElementById("sideSet").style.display = "none"} value="cmp">
            <Link to={"/compare/"+ checkList }>Compare</Link>
          </div>
          
          <div id="btnRm"  value="rm">
            Remove
          </div>
        </div>
      </div>
      <button
        className="CollapseBtn"
        data-toggle="collapse"
        data-target="#status"
      >
        Status
      </button>
      <div id="status" className="collapse">
        <p>Rendimento diario: {props.rendimento}</p>
      </div>
    </div>
  );
};

export default Settings;
