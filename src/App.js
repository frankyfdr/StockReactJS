/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "./Components/Header";
import Search from "./Components/search";
import Show from "./Components/Show/Show.js";
import { GetSymInfo } from "./Components/API/GetSym";
import Settings from "./Components/Settings";
import { UserContext } from "./Context";
import { GetLogo } from "./Components/API/GetLogo";

const App = () => {
  const [displaySettings, setDisplaySettings] = useState("none");
  const [symList, setSymList] = useState([]);
  const [rendimento, setRendimento] = useState(0);
  const [listCnt, setListCnt] = useState([]);
  const [logoList, setLogoList] = useState([]);
  const [fistTimeRun, setFirstTimeRun] = useState(true);
  useEffect(() => {
    setInterval(() => load(), 2000);

    if (fistTimeRun === true) {
      let list = logoList;
      let cookie = document.cookie;
      cookie = cookie.split(",");
      cookie.map((item) => {
        if (item !== "") {
          GetLogo(item, logoList).then((logo) => {
            list[item] = logo;
          });
        }
      });
      document.cookie =
        "" + "AXP,MA" + ";expires=" + 30 * 24 * 60 * 60 * 1000 + ";path=/";
      setLogoList(list);
      setFirstTimeRun(false);
    }
    //load();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const load = () => {
    var ckie = document.cookie;
    if (ckie !== "")
      GetSymInfo(ckie, "", logoList).then((list) => {
        return setRendimento(list[0]) + setSymList(list[1]);
      });
  };

  return (
    <div>
      <UserContext.Provider>
        <Header />
        <Search
          logoList={logoList}
          setLogoList={setLogoList}
          settings={displaySettings}
          setSettings={setDisplaySettings}
          setList={setSymList}
          symList={symList}
          setRendimento={setRendimento}
        />
        <Show list={symList} listCnt={listCnt} setListCnt={setListCnt} />
        <Settings
          setSymList={setSymList}
          rendimento={rendimento}
          settings={displaySettings}
          list={symList}
        />
      </UserContext.Provider>
    </div>
  );
};

export default App;
