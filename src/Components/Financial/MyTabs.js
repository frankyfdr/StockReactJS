
import React, { useEffect, useState } from "react"
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';

import _, { findIndex } from 'lodash';
import { filter } from "../Controllers/utils/const.js"

import ChartPage from "./ChartPage"
const MyTabs = ({tabs,setTabs}) => {

    

    const Title = ({item}) => {
        return (
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%' }}>{item}</div>
                <div className='closeTab' onClick={()=>{
                    let aux = tabs
                    let index = aux.indexOf(item)
                    if (index > -1) {
                        
                        aux.splice(index, 1);
                        setTabs([...aux])
                      }
                    


                }}> x</div>
            </div>
        )
    }

    return (

        <Tabs defaultActiveKey={0}
            bsPrefix='tabs-container'>
                    
            {
                tabs.map((item,idx) =>
                    <Tab tabClassName='tab-item' eventKey={idx} title={<Title item={item} />}>
                        <ChartPage sym={item}  />
                    </Tab>)

            }

          
        </Tabs>
    )

}
export default MyTabs



