import React,{useState} from "react";
import axios from "axios";
import "./style.css";



const Seach = (props) => {
const [opt,setOpt] = useState("");




const optclick = (sym) =>{

   
    if(!props.symUser.includes(sym))
    {
        let newList = props.symUser+","+sym;
        props.setSymList(newList);
        clearInterval(props.refresh);

        if(props.nameUser != "default")
            updateSymList(props,newList);
    }
    else
    alert("Stock already in portfolio!")

    document.getElementById("search-opt").style.display = "none"
}

const viewOpt = (e) =>
{
   
    if(document.getElementById("inputT").value === "")
        document.getElementById("search-opt").style.display = "none"
    else
    {
    mySubmitHandler(e);
    document.getElementById("search-opt").style.display = "block";
    }
    e.preventDefault();
}
const focusout = (e) =>
{
    
    document.getElementById("inputT").value = ""
    //document.getElementById("search-opt").style.display = "none"
    
}

const mySubmitHandler = (e) => 
{
   
        let search = document.getElementById("inputT");
        if(search.value != "")
        axios.get(props.nodejs+"/lookup/"+search.value).then((response) =>{
            response = response.data.finance.result[0].documents
            let opt = response.map((item) =>{
                return(
                    <div className="opt-stock"   onClick={()=>optclick(item.symbol)} key={item.symbol} name={item.symbol} >
                        <label name="sym" className="opt-text">{item.symbol}</label>
                        <label name="name" className="opt-text">{item.shortName}</label>
                    </div>
                )
            })
            setOpt(opt);
        })

        e.preventDefault();
}
const updateSymList = (props,newList) =>
{
    axios.put(props.nodejs+"/api/update",{
        "username": props.username,
        "sym": newList
    })

}

return ( 
    <div>
<div className="searchBox">
    <form id="formSearch" autoComplete="off" >
        <div id="serchDiv">
        <input id="inputT" onChange={viewOpt}  onBlur={focusout}  type="text"/>
        <div id="search-opt">{opt} </div>
        </div>
        
    </form>
</div>

</div>
)
}
export default Seach;