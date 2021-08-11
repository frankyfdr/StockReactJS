
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


import { dateFormat } from "../../Controllers/utils/utils.js"

import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import Filter from "../Filter"
import { filterCode, options,colors } from "../../Controllers/utils/const.js";
import 'chartjs-adapter-moment';



const ChartPage = ({sym,data,index}) => {
    
    
    var filterLabel = _.groupBy(filterCode, 'code')


    const [chartData, setChartData] = useState()
    const [chartSettings, setChartSettings] = useState({
        filters: [],
        ChartData: {}
    })

   
    useEffect(() => {
        
        if (data) {
            const clone = _.groupBy(data.shareFinancial, 'code')
            
            var { ChartData, ...rest } = chartSettings
            
            let labels = []

            let datasets = chartSettings.filters.map((item, idx) => {

                
            
                if(item==="historicPrice")
                {
                   
                    return {
                        label: "Historic Price",
                        pointStyle:'circle',
                        data: data.historicPrice.map((e) => {
                            console.log("price",{x:e.date,y:e.close.toFixed(2)})
                             return {x:e.date,y:e.close.toFixed(2)}

                        }),
                        backgroundColor: 'rgb(54, 162, 235)',
                        borderColor: 'rgba(54, 162, 235, 0.2)',
                        
                        pointRadius:0,
                        yAxisID:'priceY',
                        
                        
                    }
                }
                else
                if (clone[item]) {
                    return {
                        label: filterLabel[item][0].label,
                        pointStyle:'circle',
                        data: clone[item].map((e,idx )=> {
                       
                            let index = labels.indexOf(dateFormat(e.timestamp))
                            // if (index < 0) {
                            //     labels.push(e.timestamp)
                            // }
                            console.log({x:dateFormat(e.timestamp),y:e.raw.toFixed(2)})
                            return {x:dateFormat(e.timestamp),y:e.raw.toFixed(2)}
                        }),
                        backgroundColor:  colors[idx],
                        borderColor: colors[idx],
                        pointBorderColor:  'rgb(255, 255, 255,0.5)',
                        yAxisID:'indicadorY'
                       
                    }

                }

            })
          
          
            setChartData({ datasets })
        }

      
    }, [JSON.stringify(chartSettings.filters)])


    return (

            <div className='chart-container'>
               
                <Filter settings={{ chartSettings, setChartSettings }} index={index} sym={sym} />
                
                <div className='chart-container'>
                    <Line data={chartData} options={options} />
                </div>
              
            </div>
    )
}
export default ChartPage
