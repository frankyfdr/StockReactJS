import React from "react";
import "../Search";
import "./style.css";

import Login from "../LoginForm/Login.js"

const Header = () => 
{
const loginForm =() => <Login />

return(
<div className="headerContain">
    <header id="main-header">Stock Analysis</header>
</div>
)
}
export default Header;
