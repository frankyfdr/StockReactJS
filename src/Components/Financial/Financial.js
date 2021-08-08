import React, { useEffect, useState } from "react"
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import MyTabs from "./MyTabs";



const Financial = () => {
    const [tabs, setTabs] = useState(['RMV.L'])

    const handleKey = (e) => {
        if (e.key === "Enter") {
            console.log(e.target.value)
            if (tabs.length > 0)
                setTabs(old => [...old, e.target.value.trim().toUpperCase()])
            else
                setTabs([e.target.value.trim().toUpperCase()])
        }
    }

    return (<div>


        <MyTabs tabs={tabs} setTabs={setTabs} />

        <input onKeyDown={handleKey} style={{ position: 'absolute', right: '30px', top: "18%" }} />
    </div>)
}

export default Financial




