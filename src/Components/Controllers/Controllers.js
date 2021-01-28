import axios from "axios"
import React from "react"

export const updateSymList = (server,username,newList) =>
{
    axios.put(server+"/api/update",{
        "username": username,
        "sym": newList
    })

}