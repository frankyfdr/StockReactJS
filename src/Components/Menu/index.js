import e from "cors"
import React,{useContext, useEffect}from "react"
import "./style.css"
import {Context} from "../API/Context.js"
import {updateSymList} from "../Controllers/Controllers.js"

import { Link} from "react-router-dom";

const Menu = (props) =>{
    const ctx = useContext(Context)
    const menuOff = ()=>{
        document.getElementById("menu_black").style.display ="none"
        document.getElementById("Menu").style.display ="none"
    }
    const menuItem = (name) =>{
       const menu =   document.querySelector(".colapse[name="+name+"]")
       menu.classList.toggle("on")
        
    }
    const menuShow =() =>
{
    const menu = document.querySelector(".menu-container")
    menu.classList.toggle("show")
    const coplase =   document.querySelector(".colapse")
    coplase.classList.remove("on")
  
}

const login =() =>
{
    if(props.nameUser==="default")
    {
    return(
        <div className="Menu-item" onClick={()=>
             {
             document.getElementById("login").style.display = "inline-flex"; menuShow();
            }}
            >
            <button className="BtnMenu" >Login</button>
        </div>
        ) 
    }
    return(<label>{props.nameUser}</label>)
}
const removeSym = (remove)=>{
    let sym = props.symUser.split(",");
    let result ="";
    console.log(sym)
    if(sym.length==1 && sym==[remove])
        props.setSymUser("")
    for(let idx = 0;idx < sym.length;idx++)
    {
        if(sym[idx]!= sym[remove])
       {  
        result+=sym[idx]
        if(idx < sym.length-1 && sym.length != 1)
            result+=","
    }
    }
    console.log(result)
    props.setSymUser(result)
    updateSymList(ctx[6],ctx[4].username,result)
    }

const portfolio =() =>
{     
    
   return props.symInfo.map((item,idx)=>
  { 
  
    return(
        <div className="port-container">
            <label style={{width: "40%",textAlign:"left"}}>{item.sym}</label>
            <label style={{width: "70%",textAlign:"left"}}>{item.name}</label>
            <div id={item.sym} className="listCls" onClick={()=>removeSym(idx)}>x</div>
        </div>    
    )
 })           
}

const signout= ()=>{
    localStorage.removeItem("tkn");
    ctx[2].setNameUser("default")
    ctx[3].setEmailUser("")
    ctx[4].setUsername("")
    
}

    return(
        <div className="menu-container">

            <div className="Menu_black" id="menu_black" onClick={menuShow}> </div>
            
            <div className="Menu"  id="Menu">
            <div onClick={menuShow} style={{width: "100%",textAlign: "right"}} ><label>X</label></div>
            {login()}
            <div className="Menu-item">
            <Link to="/"> 
            <button className="BtnMenu" onClick={menuShow} >Home</button>
            </Link>
            </div>
            <div className="Menu-item">
            <Link to="/financial"> 
            <button className="BtnMenu" onClick={menuShow} >Financial</button>
            </Link>
            </div>
                <div className="Menu-item" >
                     <button onClick={()=>menuItem("menu2")} className="BtnMenu">My Portfolio</button>
                     <div name="menu2" className="colapse" >
                        <div className="menu-content">
                         {portfolio()}
                        </div>
                    </div>
                </div>
            <div className="Menu-item">
            <Link to="/Compare"> 
                <button className="BtnMenu" onClick={menuShow} >Compare</button>
             </Link>
            </div>
            { (ctx[2].nameUser!="default") ? <div className="signOut" ><label onClick={signout} className="signOutlb">Sign Out</label></div> : <div></div>
            }
            </div>
            
        </div>)
}

export default Menu;