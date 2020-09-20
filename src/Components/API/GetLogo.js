import axios from "axios";

export const GetLogo = (sym, props) => {
  var logo = props.logoList;
  var result = axios
    .get("https://finance.yahoo.com/quote/" + sym + "/profile")
    .then((response) => {
      if (response.status === 200) {
        try {
          response = response.request.responseText;
          var n = response.indexOf("D(ib) W(47.727%) Pend(40px)");
          var aux = response.slice(n);
          n = aux.indexOf("http");
          aux = aux.slice(n).split('"')[0];
          var site = "//logo.clearbit.com/";

          n = aux.indexOf("www.");
          if (n === -1) n = aux.indexOf("p://");
          aux = aux.slice(n + 4);

          n = aux.indexOf("/");

          if (n !== -1) aux = aux.split("/")[0];

          if (aux !== "") {
            result = site + aux;
          }
          return result;
        } catch (e) {
          console.log("error:" + sym, e);
        }
      }
    });
  return result;
};
