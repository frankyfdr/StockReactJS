/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import "./style.css";
import Header from "./Components/Header";
import Search from "./Components/Search/index.js";
import Show from "./Components/Show/Show.js";
import { GetSymInfo } from "./Components/API/GetSym";
import Settings from "./Components/Settings";
import { GetLogo } from "./Components/API/GetLogo";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/LoginForm/Login.js"
import Rightinfo from "./Components/RightInfo/Rightinfo.js";

const App = () => {
  const [rendimento, setRendimento] = useState(0);

  const [symInfo, setSymInfo] = useState([]);
  //const [nodejs] = useState("http://localhost:3001");
  const [nodejs] = useState("https://api.frankyfdr.tk");
  const [nameUser, setNameUser] = useState("default");
  const [username, setUsername] = useState([]);
  const [emailUser, setEmailUser] = useState([]);
  const [symUser, setSymUser] = useState("NFLX,AMZN,AAPL,GOOGL,KO,MCD,ADS.DE,MSFT,TSLA,SNE");
  //const [symUser, setSymUser] = useState("NFLX");
  const [refresh,setRefresh] = useState();
  useEffect(() => {

   //setRefresh(setInterval(() => load(refresh), 2000));
   load();  
      
  }, [symUser]);

   const  load = async (refresh) => 
  {
    if (symUser !== "") 
    {
       await GetSymInfo(symUser, nodejs).then((list) =>
      {
        setSymInfo(list);
        //setRendimento(list[0]) + setSymList(list[1]);
      });
    } 
  }
  

  return (
    <div>
      <Login refresh={refresh} nodejs={nodejs} setName={setNameUser} setEmail={setEmailUser} setSymUser={setSymUser} setUsername={setUsername} />
      <Header />
     
      <BrowserRouter>
      <Search
        refresh={refresh}
        nameUser={nameUser}
        nodejs={nodejs}  
        username={username}
        setSymList={setSymUser}
        symUser={symUser}
        setRendimento={setRendimento}
        rendimento={rendimento}
          list={symInfo}
      />

        <Rightinfo setSymList={setSymUser}
          rendimento={rendimento}
          list={symInfo} name={nameUser} />
        <Routes symInfo={symInfo} nodejs={nodejs} list={symUser} />
      </BrowserRouter>






    </div>
  );
};

export default App;
