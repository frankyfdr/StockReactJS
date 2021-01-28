import React, {useState}from "react";
import axios from "axios";
import "./style.css";



const Login = (props) => 
{
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setErro] = useState("")
    const [errorSignUp, setErroSignUp] = useState("")




  const signup= (event) =>
   {
       let root = document.documentElement;
       root.style.setProperty('--signup', 'block');
       document.getElementById("loginbtn").style.display = "none";
       if(email != "" && pass != "" && user != "" &&name != "")
       {
       axios.post(props.nodejs+"/api/signup",
       {
           "username": user,
           "password": pass,
           "email": email,
           "name": name,
           "sym": "NFLX,AMZN,AAPL,GOOGL,KO,MCD,MSFT,TSLA,SNE",
           
       })
         .then((data) => {
          
          if(data.data === true) 
          {
            props.setName(name);
            props.setEmail(email);
            props.setUsername(user);
            closeHandle(event);
          }
          else
          if(data.data === 3)
          {
            document.getElementById("user").style.border = "2px solid red";
            setErroSignUp("Username already exists!");
          }
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

    const  loginHandler =  (event) =>
    {
        axios.post(props.nodejs +"/api/login",
        {
            "username": user,
            "password": pass,
            
        })
          .then((data) => {
              if(data.data !== false && data.data !== 3)
              {
                getUserInfo(data.data);
                closeHandle(event);
                setErro("");
              }
              else
                if(data.data === 3)
                  setErro("Username do not exist!");
                  else
                  if(data.data ===false)
                  setErro("Username or password invalid!");

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

    return(
   
    <form className="lform" onSubmit={loginHandler}>
    <label className="errorSignUp">{errorSignUp}</label>
        <label className="inputfield" >Username</label>
        <input id="user" className="inputfield" onChange={(e) => setUser(e.target.value.toLowerCase())} type="text" />
        <label className="signUpfield" >Full Name</label>
        <input className="signUpfield" onChange={(e) => setName(e.target.value)} type="text" />
        <label className="signUpfield" >Email</label>
        <input className="signUpfield" onChange={(e) => setEmail(e.target.value.toLowerCase())} type="text" />
        <label  className="inputfield" >Password</label>
        <input id="pwd" className="inputfield" onChange={(e) => setPass(e.target.value)} type="password" />
        <label className="errorMsg">{error} </label>
       <div className="btns">
            <button id="loginbtn" className="inputfield" type="submit">Login</button>
            <button id="signbtn" className="inputfield" type="button"
            onClick={signup}>Sign up</button>
        </div>
    </form>
 
)}


export default Login;
