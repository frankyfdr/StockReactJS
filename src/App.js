/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import "./style.css";
import Header from "./Components/Header";
import Search from "./Components/search";
import Show from "./Components/Show/Show.js";
import { GetSymInfo } from "./Components/API/GetSym";
import Settings from "./Components/Settings";
import { GetLogo } from "./Components/API/GetLogo";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [displaySettings, setDisplaySettings] = useState("none");
  const [symList, setSymList] = useState([]);
  const [rendimento, setRendimento] = useState(0);
  const [listCnt, setListCnt] = useState([0]);
  const [logoList, setLogoList] = useState([]);
  const [fistTimeRun, setFirstTimeRun] = useState(true);
  const [nodejs] = useState("https://frankyfdr-api.herokuapp.com/");
  useEffect(() => {
    setInterval(() => load(), 2000);

   
  }, []);

  const load = () => {
    var ckie = document.cookie;
   
    if (ckie !== "")
    {
      GetSymInfo(ckie, nodejs).then((list) => {
        return setRendimento(list[0]) + setSymList(list[1]);
      });
    } else
    {
      document.cookie = "NFLX,AMZN,AAPL,GOOGL,KO,MCD,MSFT,TSLA,SNE;expires=Thu, 18 Dec 2030 12:00:00 UTC;path=/";
      
    }
  };

  return (
    <div>
       
        <Header />
        <Search
          nodejs={nodejs}
          logoList={logoList}
          setLogoList={setLogoList}
          settings={displaySettings}
          setSettings={setDisplaySettings}
          setList={setSymList}
          symList={symList}
          setRendimento={setRendimento}
        />
        <BrowserRouter>
           <Settings
          setSymList={setSymList}
          rendimento={rendimento}
          settings={displaySettings}
          list={symList}
        />
        <Routes list={symList} listCnt={listCnt} setListCnt={setListCnt}/>
        </BrowserRouter>
       
        
        
     
       
     
    </div>
  );
};

export default App;
