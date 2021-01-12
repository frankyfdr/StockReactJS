import React from 'react'; 
import "./style.css"
const Stock = () => {

    return(
        <div className="stock-view-container">
            <div className="stock-name-container">
                <label className="stk-name">
                    Netflix, inc.
                </label>
                <label className="stk-price">
                899.30 |
                <label className="stk-change">
                -21% (-0.3%)
                </label>
                </label>
            </div>
    <div className="stk-graf"> 

    </div>
    <div className="stk-btn-container">
        <div className="stk-btn">Compare</div>
        <div className="stk-btn">Analise</div>
        <div className="stk-btn">Add to list</div>
    </div>
    <div className="stk-info-container"></div>
    </div>
    )
}
export default Stock;