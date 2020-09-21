import React from "react";
import axios from "axios";
import ViewShare from "../ViewShare";

export const GetSymInfo = (sym, logo, logoList) => {
  return axios.get("/info/v7/finance/quote?symbols=" + sym).then((data) => {
    try {
      data = data.data.quoteResponse.result;
      var rendimentoPerc = 0;
      var list = data.map((item) => {
        var color = "Cgreen";
        var status = "winner";
        if (item.regularMarketChange < 0) {
          color = "Cred";
          status = "loser";
        }
        rendimentoPerc = rendimentoPerc + item.regularMarketChangePercent;
        let imgSrc = ""; //logoList[sym];
        if (logo !== "") {
          imgSrc = logo;
        }
        return (
          <ViewShare
            imgSrc={imgSrc}
            logoList={logoList}
            key={item.symbol}
            status={status}
            name={item.longName + " (" + item.symbol + ")"}
            price={item.regularMarketPrice.toFixed(2)}
            change={
              item.regularMarketChange.toFixed(2) +
              " (" +
              item.regularMarketChangePercent.toFixed(2) +
              "%)"
            }
            changePerc={item.regularMarketChangePercent.toFixed(2)}
            color={color}
            sym={item.symbol}
          ></ViewShare>
        );
      });

      var listas = OrderByAsc(list);
      if (data != null) {
        var inputList = sym.split(",");

        inputList.map((item) => {
          if (isRepeated(item) === false) {
            var ckie = document.cookie;
            document.cookie =
              "" +
              ckie +
              "," +
              item +
              ";expires=" +
              30 * 24 * 60 * 60 * 1000 +
              ";path=/";
          }
        });
        rendimentoPerc = (rendimentoPerc / list.length).toFixed(2);
        rendimentoPerc = "(" + rendimentoPerc + "%)";
        return [rendimentoPerc, listas];
      }
      return list;
    } catch (e) {
      console.log("error: ", e);
    }
  });
};

//----------------------funcao ordernar----------------------------------------
function OrderByAsc(list) {
  var loser = [];
  var winner = [];

  list.map((item) => {
    if (item.props.changePerc <= 0) loser.push(item);
    else if (item.props.changePerc > 0) winner.push(item);
  });

  loser.sort((a, b) =>
    a.props.changePerc < b.props.changePerc
      ? 1
      : b.props.changePerc < a.props.changePerc
      ? -1
      : 0
  );

  winner.sort((a, b) =>
    a.props.changePerc < b.props.changePerc
      ? 1
      : b.props.changePerc < a.props.changePerc
      ? -1
      : 0
  );
  return { loser: loser, winner: winner };
}

//---------------end of function---------------
function isRepeated(sym) {
  try {
    var bool = false;
    var ckie = document.cookie;
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
