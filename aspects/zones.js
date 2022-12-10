import { oktaPublic } from "../oktaApi.js";

export const zoneData = async () => {

    console.log(`Getting Zone Data`)

    const { data: zones } = await oktaPublic.get(`zones`)

    return zones.map(zone => {

        
        return {
            name: zone.name,
            status: zone.status,
            gateways: ((zone.gateways!==null) ? zone.gateways.map(gateway => gateway.value) : [])
            

        }
    })
}


