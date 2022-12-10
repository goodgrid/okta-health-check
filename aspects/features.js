import { oktaPublic } from "../oktaApi.js";




const featureData = async () => {
    const response = await oktaPublic.get("features")

        console.log(`Getting Feature Data`)

       return response.data.map(feature => {

        return {
            id: feature.id,
            name: feature.name,
            stage: feature.stage.value,
            status: feature.status
        }
    })
    .filter(feature => feature.status == 'ENABLED')

    

}


export { featureData }