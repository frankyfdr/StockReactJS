/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState} from 'react'; 
import "./style.css"

const Stock = (props) => {
    const [div,setDiv] = useState("");
    const Sym = props.symInfo[props.stk]

    const close =()=>{
        document.querySelector("#stock-view-container").classList.toggle("on")
        document.querySelector("#blank").style.display = "none"
       }
   
    useEffect(() => {
        /*
        const Plotly = window.Plotly;
        var trace1 = 
       {
        type: "scatter",
        mode: "lines",
        name: 'AAPL High',
        x: ['2013-10-04 22:23:00', '2013-10-05 22:23:00','2013-10-06 22:23:00','2013-10-07 22:23:00','2013-10-08 22:23:00','2013-10-09 22:23:00',],
        y: [1, 3,5,10,33,32],
        line: {color: '#17BECF'}
        }
    var graph = document.getElementById('stk-graf');
    var data = [trace1];

var layout = {
  title: 'Basic Time Series',
};
    
    Plotly.newPlot("stk-graf", data);
        */
        setDiv(()=>{
            if(Sym != null)
            return(
                
                <div >
                    <div name="stockInfo" onClick={close} className="close">X</div>
                    <div className="stock-name-container">
                        <label className="stk-name">
                            {Sym.name.toUpperCase()}
                        </label>
                        <label className="stk-price">
                            {Sym.price} 
                        <label className="stk-change">
                         {Sym.change} ({Sym.percent})
                         </label>   
                    </label>
                    </div>

                    <div id="stk-graf" className="stk-graf"> 
                  
                    </div>
                    {/*}
                      <div className="stk-btn-container"> 
                        <div className="stk-btn">Compare</div>
                        <div className="stk-btn">Analise</div>
                        <div className="stk-btn">Add to list</div>
                    </div>
                     {*/}
                    <div className="stk-info-container">
                    <div className="stk-statics">
                       <p name="info"> <label>Open: </label> <label name="info">{Sym.open}</label></p>
                       <p name="info"> <label>prev. Close: </label> <label name="info"> {Sym.prevClose}</label></p>
                       <p name="info"> <label>Current Eps: </label> <label name="info">{Sym.eps}</label></p>
                       <p name="info"> <label>shares Outstanding: </label> <label name="info">{Sym.sharesOutstanding}</label></p>
                       <p name="info"> <label>Earnings Date: </label> <label name="info">{Sym.earningsTimestamp}</label>
                       </p>
                    </div>

                    </div>
                </div>
            )})
    }, [Sym])

    return(
        <div>
            <div id="blank" >
            <div id="stock-view-container" className="stock-view-container">
                {div}
            </div>
            </div>
        </div>
    )

}
export default Stock;