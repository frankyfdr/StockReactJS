
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Button, Tabs, Tab, Modal, Form, FormCheck } from 'react-bootstrap';
import { filterCode } from "../Controllers/utils/const";
import _, { filter } from 'lodash';
import { concatPagination } from "@apollo/client/utilities";


const filterList = filterCode.map(a => _.clone(a));
const Filter = ({ settings, sym,index }) => {

   
    const filterGrouped = _.groupBy(filterList, "periodType")
   
    const filterhandler = (e, item) => {
 
        var { filters, ...rest } = settings.chartSettings
        if (e.target.checked) {

            filters.push(item.code)

        }
        else {
            const index = filters.indexOf(item.code);
            if (index > -1) {
                filters.splice(index, 1);
            }
        }

        settings.setChartSettings({ filters: filters, ...rest })
        console.log(settings)

    }
    return (
        <Accordion bsPrefix='filter-main-container' defaultActiveKey="0">

            <Accordion.Toggle as={Button} bsPrefix='expanded-btn' eventKey="0">
                Filters
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
                <div>
                <Form.Check
                        id={'historicPric'+sym+index}
                        type='switch'
                        label={"Historic Price"}
                        onChange={(e) => filterhandler(e, filterList.find(el => el.code === 'historicPrice'))}
                    />
                    <Tabs bsPrefix='tabs-filters-container' onSelect={(e) => {
                        //     var { activeKey, ...rest } = tabSettings
                        //     setTabSettings({ activeKey: e, ...rest })
                        //     settings.setChartSettings({ })
                        //    filter.forEach((item)=>{ item.checked=false})


                    }}>

                        {/*                          Acordiong   12M                  */}

                        <Tab title='12M' eventKey='12M'  >
                            <div>
                                {
                                    filterGrouped['12M'].map((item, idx) => {
                                        return (<div className='filter-item-container'>
                                            <Form.Check
                                                id={item.code + sym+index}
                                                type='switch'
                                                label={item.label}
                                                onChange={(e) => filterhandler(e, item)}
                                            />
                                            {/* <input className='filter-check' type='checkbox'  className='custom-control-input' onChange={(e) => filterhandler(item)} />
                                            <div className='filter-label'> {item.label}</div> */}

                                        </div>)
                                    })
                                }
                            </div>
                        </Tab>

                        {/*                          Acordiong   3M                  */}

                        <Tab title='3M' eventKey='3M'>
                            <div style={{ height: 300 }}>
                                {
                                    filterGrouped['3M'].map((item, idx) => {
                                        return (<div className='filter-item-container'>
                                            <Form.Check
                                                id={item.code + sym+index}
                                                type='switch'
                                                label={item.label}
                                                onChange={(e) => filterhandler(e, item)}
                                            />
                                        </div>)
                                    })
                                }
                            </div>
                        </Tab>
                      
                    </Tabs>
           
                </div>
            </Accordion.Collapse>

        </Accordion>
    )
}
export default Filter


