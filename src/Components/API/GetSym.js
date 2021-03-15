import React from "react";
import axios from "axios";
import moment from "moment"

export const GetSymInfo = (symList, nodejs) => 
{
  //axios making the request to the Server API send the stock code
  // it can be request more then on stock code, must be separeted by comma.
    return axios.get(nodejs + "/info/" + symList).then((data) =>
    {
      data = data.data.quoteResponse.result;
      var list =  data.map((item) => 
      {
        
        let earnDate = "N/A";

        //checking if there is a earning date for the specific stoc 
        if(item.earningsTimestamp !== undefined)

        //formating into readeble data 
        earnDate = moment(new Date(item.earningsTimestamp*1000)).format('ll')

        //checking if there is display name, if not display longName
        let name = item.displayName;
        if (name === undefined)  name = item.longName;     
        
        // formating the information in JSON Obejct
        let str = '{"name":"'+name+ // name of the stock
        '","price":'+item.regularMarketPrice.toFixed(2)+ // price of the stock | to fixed is a function to convert to 2 decimal
        ',"percent":"'+item.regularMarketChangePercent.toFixed(2)+ // change percentage
        '","sym":"'+item.symbol+'","change":"'+item.regularMarketChange.toFixed(2)+ // symbol  and price change
        '","open":"'+item.regularMarketOpen+  // stock open price
        '","prevClose":"'+item.regularMarketPreviousClose+ //  stock previous close
        '","exchangeOpen":"'+item.triggerable+
        '","eps":"'+item.epsCurrentYear+ // eps value
        '","sharesOutstanding":"'+item.sharesOutstanding+ // shares outstanding
        '","marketCap":"'+item.marketCap+ // market cap
        '","earningsTimestamp":"'+earnDate+ //earning date
        '","marketState":"'+item.marketState+ //earning date
        '"}';
        str = JSON.parse(str)
        
     
        //returning the json object
        return str;
      })
      //returning the list
      return list;
    })
}

