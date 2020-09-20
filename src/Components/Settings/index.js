/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";
import { GetSymInfo } from "../API/GetSym";

const Settings = (props) => {
  const [list, setList] = useState();

  useEffect(() => {
    if (props.list != null) {
      ShowSymList();
    }
  }, [props.list]);

  const ShowSymList = () => {
    try {
      var getList = [];
      getList.push(props.list.winner.concat(props.list.loser));
      getList = getList[0].map((item) => {
        return (
          <label className="ListSym" key={item.key} id="" value={item.key}>
            <input className="inputCk" value={item.key} type="checkbox" />
            {item.props.name}
          </label>
        );
      });
      setList(getList);
    } catch (e) {
      console.log("Get List Error ", e);
    }
  };

  const removeHandle = () => {
    var checkedList = [];
    checkedList = document.getElementsByClassName("ListSym");
    checkedList = Array.prototype.slice.call(checkedList);
    var toRm = [];
    try {
      checkedList.map((item, ckdIndex) => {
        if (item.childNodes[0].checked === true) {
          toRm.push(item.childNodes[0].value);
          delete item[ckdIndex];
        }
      });

      var ckie = document.cookie;
      ckie = ckie.split(",");

      ckie.map((ckieItem, ckieIndex) => {
        toRm.map((toRmItem) => {
          if (ckieItem === toRmItem) {
            delete ckie[ckieIndex];
          }
        });
      });

      ckie = ckie.filter(function (el) {
        return el !== "";
      });
      if (ckie.length !== 0) {
        console.log(ckie);
        document.cookie =
          "" + ckie + ";expires=" + 30 * 24 * 60 * 60 * 1000 + ";path=/";
        console.log(document.cookie);
        setList(list);
        GetSymInfo(document.cookie).then((symList) => {
          return props.setSymList(symList[1]);
        });
      } else {
        console.log("ckkie vazia");
        document.cookie =
          "" + "," + ";expires=" + 30 * 24 * 60 * 60 * 1000 + ";path=/";
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
          <div id="btnCmp">Compare</div>
          <div id="btnRm" onClick={removeHandle}>
            Remove
          </div>
          <div id="btnAlz">Analize</div>
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
