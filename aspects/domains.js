import { oktaPublic } from "../oktaApi.js";




const domainData = async () => {

    console.log(`Getting Domain Data`)

    const response = await oktaPublic.get("domains")

       const domains = response.data.domains.map(async domain => {
        return {
            id: domain.id,
            name: domain.name,
        }
    })

    return domains

}


export { domainData }