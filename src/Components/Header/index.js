import React from "react";
import "../Search";
import "./style.css";
import logo from "../../img/logoico.svg"
import Login from "../LoginForm/Login.js"

const Header = () => 
{
const loginForm =() => <Login />

return(
<div className="headerContain">
    <header id="main-header">
    
        
           <img id="logo" src={logo} />
            <label id="logotxt">STOCKEY</label>
 
      
        </header>
</div>
)
}
export default Header;
