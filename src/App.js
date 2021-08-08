/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Routes from "./Routes";
import "./style.css";
import Header from "./Components/Header";
import Search from "./Components/Search/index.js";
import Menu from "./Components/Menu";
import { GetSymInfo } from "./Components/API/GetSym";
import { Context } from "./Components/API/Context.js"
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/LoginForm/Login.js"
import Stock from "./Components/Stock/index.js"
import axios from "axios";
import { client } from './gql/server.js'
import { ApolloProvider } from '@apollo/client'
const App = () => {
  const [tkn, setTkn] = useState(localStorage.getItem("tkn"))
  const [rendimento, setRendimento] = useState(0);
  const [stkdetails, setstkdetails] = useState("");
  const [symInfo, setSymInfo] = useState([]);
  //const [nodejs] = useState("http://localhost:3001");
  const [nodejs] = useState("https://api.stockey.tk");
  const [nameUser, setNameUser] = useState("default");
  const [username, setUsername] = useState();
  const [emailUser, setEmailUser] = useState();
  const [symUser, setSymUser] = useState("NFLX,AMZN,AAPL,GOOGL,KO,MCD,ADS.DE,MSFT,TSLA,SNE");
  // const [symUser, setSymUser] = useState("NFLX,MA");
  const [refresh, setRefresh] = useState();

  const auth = () => {
    axios.post(nodejs + "/api/auth", { "tkn": tkn })
      .then((resp) => {
        resp = resp.data
        setUsername(resp.username)
        setNameUser(resp.name)
        setEmailUser(resp.email)
        setSymUser(resp.sym)
      }

      )
  }



  useEffect(() => {

    if (tkn)
      auth();

    clearInterval(refresh)
    // setRefresh(setInterval(() => load(refresh), 2000));
    load(refresh)
  }, [symUser]);

  const load = async (refresh) => {
    if (symUser !== "") {
      await GetSymInfo(symUser, nodejs).then((list) => {
        setSymInfo(list);
      });
    }
  }
  return (
    <ApolloProvider client={client}>
      <Context.Provider value={[
        { symInfo, setSymInfo },
        { symUser, setSymUser },
        { nameUser, setNameUser },
        { emailUser, setEmailUser },
        { username, setUsername },
        { stkdetails, setstkdetails },
        nodejs,
        refresh
      ]}>
        <BrowserRouter>
          <Menu nameUser={nameUser} setSymUser={setSymUser} symUser={symUser} symInfo={symInfo} setSymInfo={setSymInfo} />
          <Login refresh={refresh} nodejs={nodejs} setName={setNameUser} setEmail={setEmailUser} setSymUser={setSymUser} setUsername={setUsername} />
          <Header />
          <Stock symInfo={symInfo} stk={stkdetails} setStk={setstkdetails} />

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
          <Routes symInfo={symInfo} stk={stkdetails} setStk={setstkdetails} nodejs={nodejs} list={symUser} />
        </BrowserRouter>
      </Context.Provider>
    </ApolloProvider>
  );
};

export default App;
