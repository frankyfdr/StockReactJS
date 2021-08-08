import moment from 'moment'

export const dateFormat = (timestamp)=>{
    
    return moment.unix(timestamp).format("MMM-YYYY")
}