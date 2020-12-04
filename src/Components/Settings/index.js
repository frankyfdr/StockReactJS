/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";
import { GetSymInfo } from "../API/GetSym";
import { Link } from "react-router-dom";

const Settings = (props) => {
  
  const [list, setList] = useState();
  const [checkList, setCheckList] = useState("");
  

  useEffect(() => {
    if (props.list != null) {
      ShowSymList();
    }
    
  }, [props.list, checkList]);

  const ShowSymList = () => {
    try {
      var getList = [];
      getList.push(props.list.winner.concat(props.list.loser));
      getList = getList[0].map((item) => {
        return (
          <label className="ListSym" key={item.key} id="" value={item.key}>
            <input className="inputCk" onClick={clicked} value={item.key} type="checkbox" />
            {item.props.name}
          </label>
        );
      });
      setList(getList);
    } catch (e) {
      console.log("Get List Error ", e);
    }
  };


  const clicked = (event) => 
  {
    if(event.target.checked === true)
    {
      if(checkList !== "")
      setCheckList(checkList+","+event.target.value);
      else
      setCheckList(event.target.value);
    }
    else
{
  let rm = checkList;
  if(checkList.includes(event.target.value+","))
     rm = rm.replace(event.target.value+",","")
    else
    if(checkList.includes(event.target.value))
    rm = rm.replace(event.target.value,"")     
     setCheckList(rm);
}   
  }

  const clickedHandle = (event) => {
    var checkedList = [];
    checkedList = document.getElementsByClassName("ListSym");
    checkedList = Array.prototype.slice.call(checkedList);
    var toCkd = [];
    try {
      checkedList.map((item, ckdIndex) => {
        if (item.childNodes[0].checked === true) {
          toCkd.push(item.childNodes[0].value);
          delete item[ckdIndex];
        }
      });

      if(event.target.value !== "cmp")
      {
        setCheckList(toCkd[0]+","+toCkd[1]+","+toCkd[2]);
        console.log(checkList);
        
      }
      else
      if(event.target.value !== "rm")
      {

      

      var ckie = document.cookie;
      ckie = ckie.split(",");

      ckie.map((ckieItem, ckieIndex) => {
        toCkd.map((toRmItem) => {
          if (ckieItem === toRmItem) {
            delete ckie[ckieIndex];
          }
        });
      });

      ckie = ckie.filter(function (el) {
        return el !== "";
      });
      if (ckie.length !== 0) {
        document.cookie =
          "" + ckie + ";expires=" + 30 * 24 * 60 * 60 * 1000 + ";path=/";
        setList(list);
        GetSymInfo(document.cookie).then((symList) => {
          return props.setSymList(symList[1]);
        });
      } else {
        console.log("ckkie vazia");
        document.cookie =
          "" + "," + ";expires=" + 30 * 24 * 60 * 60 * 1000 + ";path=/";
      }
    }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    
    <div style={{ display: props.settings }} id="sideSet">
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
        
           
          <div id="btnCmp" onClick={clickedHandle} value="cmp">
            <Link to={"/compare/"+checkList }>Compare</Link>
          </div>
          
          <div id="btnRm" onClick={clickedHandle} value="rm">
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
