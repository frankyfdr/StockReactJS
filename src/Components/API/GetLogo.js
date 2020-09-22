import axios from "axios";

export const GetLogo = (sym, props, nodejs) => {
  var logo = props.logoList;
  var result = axios.get(nodejs + "/logo/" + sym).then((response) => {
    try {
      response = response.data.result[0].assetProfile.website;
      var site = "//logo.clearbit.com/";

      var n = response.indexOf("www.");
      if (n === -1) n = response.indexOf("p://");
      var aux = response.slice(n + 4);

      n = aux.indexOf("/");

      if (n !== -1) aux = aux.split("/")[0];

      if (aux !== "") {
        result = site + aux;
      }
      return result;
    } catch (e) {
      console.log("error:" + sym, e);
    }
  });
  return result;
};
