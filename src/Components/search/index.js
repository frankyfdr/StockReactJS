import React from "react";
import axios from "axios";
import "./style.css";
import settingsIco from "../../img/settings.png";
import { GetSymInfo } from "../API/GetSym";
import { GetLogo } from "../API/GetLogo";
import e from "cors";

export default class SearchBar extends React.Component {
  //--------constructor-------------
  constructor(props) {
    super(props);
    this.state = {
      sym: "",
      searchList: [],
      displaySearchList: "none",
      displaySettings: "none",
    };
  }

  selectHandle = (event) => {
    this.Searching(event.target.id);
  };
  myChangeHandler = (event) => {
    if (event.target.value !== "")
      this.setState({ sym: event.target.value.toUpperCase() });
    else {
      this.setState({ sym: "" });
      this.setState({ displaySearchList: "none" });
    }

    if (event.target.value !== "" && event.target.value.length > 1) {
      this.setState({ displaySearchList: "block" });
      axios
        .get(
          "https://query2.finance.yahoo.com/v1/finance/lookup?formatted=true&lang=en-US&region=US&query=" +
            this.state.sym +
            "&type=all&count=5&start=0"
        )
        .then((response) => {
          if (response.status === 200) {
            response = response.data.finance.result[0].documents;
            var list = response.map((item) => {
              return (
                <option
                  id={item.symbol}
                  onClick={this.selectHandle}
                  key={item.symbol}
                >
                  ( {item.symbol} ) {item.shortName}
                </option>
              );
            });
            this.setState({ searchList: list });
          }
        });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ sym: event.target.value });
    this.Searching(this.state.sym);
    this.setState({ sym: "" });
  };
  //----------------evento keyPress---------
  isEnter = (event) => {
    if (this.state.sym === "") this.setState({ displaySearchList: "none" });
    if (event.key === "Enter") {
      this.Searching(event.target.value);
    }
  };
  Searching = async (sym) => {
    if (sym !== "") {
      try {
        let logo = await GetLogo(sym, this.props);
        let list = this.props.logoList;
        list[sym] = logo;

        GetSymInfo(sym, logo, this.props.logoList).then((info) => {
          this.props.setList(info[1]);
        });
        this.props.setLogoList(list);
      } catch (e) {
        console.log("/search/Searching error: ", e);
      } finally {
      }

      //console.log(this.props.logoList);

      this.setState({ displaySearchList: "none" });
    }
  };
  handleSettingsClick = () => {
    if (this.props.settings === "none") this.props.setSettings("block");
    else this.props.setSettings("none");
  };

  //----------------------------

  render() {
    return (
      <div>
        <div id="searchBar">
          <form autoComplete="off" onSubmit={this.mySubmitHandler}>
            <input
              onChange={this.myChangeHandler}
              onKeyDown={this.isEnter}
              id="inputT"
              type="text"
              value={this.state.sym}
            ></input>

            <input id="searchBtn" type="submit" value="Search" />
          </form>

          <div id="settings">
            <img
              alt=""
              onClick={this.handleSettingsClick}
              id="ico"
              src={settingsIco}
            />
          </div>
          <select
            style={{ display: this.state.displaySearchList }}
            id="searchList"
            size="6"
          >
            {this.state.searchList}
          </select>
        </div>
      </div>
    );
  }
}
