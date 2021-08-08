
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import 'chartjs-adapter-moment';
import {OverlayTrigger,Popover,Button} from 'react-bootstrap'
import ReturnChart from "./ChartsTypes/ReturnChart"
import CustomChart from "./ChartsTypes/CustomChart"

import {GET_FINANCIAL} from "../API/query"
const ChartPage = ({ sym, }) => {
    var { loading, error, data, refetch } = useQuery(GET_FINANCIAL, { variables: { sym: sym } })
    const [charts,setCharts] = useState(['return'])
    

    return (
        <div>
            <h1>{sym}</h1>
            <OverlayTrigger
                trigger="click"
                key='right'
                placement='right'
                overlay={
                    <Popover id='popover-positioned-right'>
                        <div>
                            {
                                ['custom','return'].map(item=>( <div onClick={()=>{
                                    if(charts.length > 0)
                                    setCharts(old=> [...old,item])
                                    else
                                    setCharts([item])
                                }}>{item}</div>))

                            }
                        </div>                                            
                    </Popover>
                }
            >
                <Button variant="secondary">New chart</Button>
            </OverlayTrigger>
            {
               charts.map(item=>
                {
                    switch(item)
                    {
                      case 'custom':{ return <> <div className='close-chart' onClick={()=>setCharts(remove(item,charts))}>Close</div> <CustomChart sym={sym} data={data}/>  </> }
                      case 'return':{ return <> <div className='close-chart' onClick={()=>setCharts(remove(item,charts))}>Close</div><ReturnChart sym={sym} data={data} /> </> }
                    }
                })
            }
        </div>
    )
}
export default ChartPage

const remove = (item,array)=>{
    let aux = array
    let index = aux.indexOf(item)
    if (index > -1) {
        
        aux.splice(index, 1);
        return [...aux]
      }
}