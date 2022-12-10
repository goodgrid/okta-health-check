import { oktaPublic } from "../oktaApi.js";
import config from "../config.js";




const userData = async () => {

    console.log(`Getting User Data`)

    const response = await oktaPublic.get("users")

    return response.data.map(user => {
        
        return {
            id: user.id,
            name: `${user.profile.firstName} ${user.profile.lastName}`,
            status: user.status,
            lastActive: Math.floor(((new Date()).getTime() - new Date(user.lastLogin).getTime()) / (1000*60*60*24))
            //events: await numEvents(`actor.id eq "${user.id}"`)
        }
    })
    .filter(user => (user.status != 'ACTIVE' || user.lastActive >= config.alerts.usersInactiveDays))
    .sort(({lastActive:a}, {lastActive:b}) => b-a)

    

    

}


export { userData }