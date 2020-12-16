import React from "react";
import axios from "axios";

export const GetSymInfo = (symList, nodejs) => 
{
    return axios.get(nodejs + "/info/" + symList).then((data) =>
    {
      data = data.data.quoteResponse.result;
      var list =  data.map((item) => 
      {
        let name = item.displayName;
        if (name === undefined)  name = item.longName;      
        let str = JSON.parse('{"name":"'+name+'","price":'+item.regularMarketPrice.toFixed(2)+
        ',"percent":"'+item.regularMarketChangePercent.toFixed(2)+
        '","sym":"'+item.symbol+
        '","change":"'+item.regularMarketChange.toFixed(2)
        +'"}');
        
        return str;
      })
      return list;
    })
}

/*
//----------------------funcao ordernar----------------------------------------

//---------------end of function---------------
const  isRepeated = (sym) => {
  try {
    var bool = false;
    var ckie = document.cook  return ({

  })ie;
    ckie = ckie.split(",");
    ckie.map((item) => {
      if (item === sym) {
        bool = true;
      }
    });

    return bool;
  } catch (e) {
    console.log("(IsReapeated)(" + sym + ")Error:", e);
    return false;
  }
}
*/