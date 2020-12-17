import React, {useState}from "react";
import axios from "axios";
import "./style.css";



const Login = (props) => 
{
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

   const signup= (event) =>
   {
       let root = document.documentElement;
       root.style.setProperty('--signup', 'block');
       document.getElementById("loginbtn").style.display = "none";

       if(email != "" && pass != "" && user != "" &&name != "")
       {
       axios.post(props.nodejs+"/api/users",
       {
           "username": user,
           "password": pass,
           "email": email,
           "name": name,
           "sym": "NFLX,AMZN,AAPL,GOOGL,KO,MCD,MSFT,TSLA,SNE",
           
       })
         .then((data) => {
            getUserInfo(data);
         }, (error) => {
           console.log(error);
         });
         event.preventDefault();
        }
      
   }

   const closeHandle = (e) =>
   {
    document.getElementById("login").style.display = "none";
    let root = document.documentElement;
    root.style.setProperty('--signup', 'none');
    document.getElementById("loginbtn").style.display = "block";
    e.preventDefault();
   }

    const  loginHandler = (event) =>
    {
        axios.post(props.nodejs +"/api/login",
        {
            "username": user,
            "password": pass,
            
        })
          .then((data) => {
              if(data.data != false)
              {
                getUserInfo(data.data[0]);
                  
              }
          }, (error) => {
            console.log(error);
          });
          event.preventDefault();
    }

    const getUserInfo =(data) => 
    { 
      console.log(data);
      props.setName(data.name);
      props.setEmail(data.email);
      props.setUsername(data.username);
      props.setSymUser(data.sym);
      clearInterval(props.refresh);
    }

    return(<div className="Contain" id="login">
        <div className="effectMode"></div>
    <div className="loginContain">
        <div className="close" onClick={closeHandle}>x</div>
    <form className="lform" onSubmit={loginHandler}>
        <label className="inputfield" >Username</label>
        <input className="inputfield" onChange={(e) => setUser(e.target.value)} type="text" />
        <label className="signUpfield" >Full Name</label>
        <input className="signUpfield" onChange={(e) => setName(e.target.value)} type="text" />
        <label className="signUpfield" >Email</label>
        <input className="signUpfield" onChange={(e) => setEmail(e.target.value)} type="text" />
        <label className="inputfield" >Password</label>
        <input className="inputfield" onChange={(e) => setPass(e.target.value)} type="password" />
       <div className="btns">
            <button id="loginbtn" className="inputfield" type="submit">Login</button>
            <button id="signbtn" className="inputfield" type="button"
            onClick={signup}>Sign up</button>
        </div>
    </form>
        
    </div>
</div>
)}


export default Login;
