import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

import { options, colors } from "../../Controllers/utils/const"
import { dateFormat } from "../../Controllers/utils/utils.js"

import _ from 'lodash';
const ReturnChart = ({ data }) => {
    const [chartData, setChartData] = useState()
    const [percentValues, setPercentValues] = useState(['4'])

    

    useEffect(() => {

        try{
        let datasets = []
        if (data && percentValues.length > 0) {
            const clone = _.groupBy(data.shareFinancial, 'code')

            datasets.push({
                label: "Historic Price",
                pointStyle: 'circle',
                data: data.historicPrice.map((e) => {

                    return { x: e.date, y: e.close.toFixed(2) }

                }),
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',

                pointRadius: 0,
                yAxisID: 'priceY',

            })

            let ret = percentValues.map((value, idx) => {
                let key = clone.quarterlyDilutedEPS ? 'quarterlyDilutedEPS' : 'annualDilutedEPS'

                return ({
                    label: 'Return ' + value + '%',
                    pointStyle: 'circle',
                    data: clone[key].map((e) => {

                        return { x: dateFormat(e.timestamp), y: (e.raw * (100 / parseFloat(value))).toFixed(2) }
                    }),
                    backgroundColor: colors[idx],
                    borderColor: colors[idx],
                    pointBorderColor: 'rgb(255, 255, 255,0.5)',
                    yAxisID: 'priceY'
                }
                )
            })


            datasets = [...datasets, ...ret]

            setChartData({ datasets })
        }
    }catch(err)
    {
        console.error(err)
    }

    }, [data,percentValues])

    const handleKey = (e) => {
        if (e.key === "Enter") {
            let x = e.target.value
            if (percentValues.length > 0) {
             
                setPercentValues(old => [...old,x])
            }
            else {
                setPercentValues([e.target.value])
            }
        }
    }

    return (
        <div>

            <div className='chart-container'>
                <div className='return-container'>

                    <input type='number' placeholder='Return % ' onKeyDown={handleKey} />
                    {
                        percentValues.map(item =><div className='percent-item' onClick={()=>setPercentValues(remove(item,percentValues))}>{item}%</div>)
                    }

                </div>

                <div className='chart-container'>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </div>
    )
}
export default ReturnChart

const remove = (item,array)=>{
    let aux = array
    let index = aux.indexOf(item)
    if (index > -1) {
        
        aux.splice(index, 1);
        return [...aux]
      }
}