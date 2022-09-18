import axios from "axios"
import config from "./config.js"

export const oktaPublic = axios.create({
    baseURL: `https://${config.oktaInstanceName}.okta.com/api/v1`,
    headers: {
        "Authorization": `SSWS ${config.oktaApiToken}`
	}
})


oktaPublic.interceptors.response.use(async response => {

    let totalData = response.data

    const next = nextPage(response.headers.link)

    if (next !== undefined) {
        if (config.debug) console.log(`next request needed`, response.request.path, next)

        try {
            const nextResponse = await oktaPublic.get(next)
            totalData = totalData.concat(nextResponse.data)
        } catch(err) {
            console.error(`ERROR: ${err.response.data.errorSummary}. Failed request was ${err.request.path}`)
        }
    }

    response.data = totalData
    return response;
});

export const oktaInternal = axios.create({
    baseURL: `https://${config.oktaInstanceName}-admin.okta.com/api/internal/`,
    headers: {
        "Authorization": `SSWS ${config.oktaApiToken}`
	}
})

export const oktaSage = axios.create({
    baseURL: `https://${config.oktaInstanceName}-admin.okta.com/sage/api/v1/`,
    headers: {
        "Authorization": `SSWS ${config.oktaApiToken}`
	}
})



const nextPage = (linkHeaders) => {

    if (linkHeaders == undefined) return undefined 

    
    const nextLink = linkHeaders.split(",")
    .find(header => {    
        return (header.indexOf(`rel="next"`) > -1)
    })

    if (!nextLink) return undefined

    return nextLink.split(";")[0].trim().replace(/[<>]/g,"")

}