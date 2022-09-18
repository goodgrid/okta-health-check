import { oktaPublic } from "../oktaApi.js";
import { friendlyDate } from "../utils.js";



const orgData = async () => {
    const { data : org} = await oktaPublic.get("org")


    return {
        companyName: org.companyName,
        created: org.created,
        createdFriendly: friendlyDate(org.created, true)
    }

}


export { orgData }