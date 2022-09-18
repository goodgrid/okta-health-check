import { oktaPublic } from "./oktaApi.js";
import config from "./config.js";

export const getEvents = async (filter) => {
    const response = await oktaPublic.get("logs",{
        params: {
            filter: filter,
            since: new Date(new Date().setDate(new Date().getDate() - config.daysHistory)).toISOString(),
            until: new Date().toISOString(), // The until parameter is required for 'bounded requests': https://developer.okta.com/docs/reference/api/system-log/#bounded-requests
            limit: 500
        }
    })
    
    

    return response.data
}


export const friendlyDate = (dt, rough) => {
    if (typeof dt != 'object') {
        dt = new Date(dt)
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    if (rough == true) {
        return `${months[dt.getMonth()]} ${dt.getFullYear()}`    
    }
    return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`

}