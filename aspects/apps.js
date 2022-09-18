import { oktaPublic } from "../oktaApi.js";
import { getEvents } from "../utils.js";

const appTypes = {
    AUTO_LOGIN: "Secure Web Access/1",
    SAML_2_0: "SAML 2.0",
    OPENID_CONNECT: "OIDC",
    BOOKMARK: "Bookmark",
    SECURE_PASSWORD_STORE: "Secure Web Access/2"
}

const appData = async () => {

    const logins = await getEvents(`eventType eq "user.authentication.sso"`) 

    const { data : apps } = await oktaPublic.get("apps")

    return apps.map(app => {

        
        return {
            id: app.id,
            name: app.label,
            status: app.status,
            type: appTypes[app.signOnMode],
            features: app.features.join(", ").toLowerCase().replace(/_/g, " "),
            numLogins: getAppLoginCount(logins, app.id)
        }
    }).sort(({numLogins:a}, {numLogins:b}) => b-a)

}


export { appData }


const getAppLoginCount = (logins,appId) => {

    return logins.filter(event => {
        
        //const test = event.target.filter(target => (target.type=='AppInstance' && target.id==appId))

        return (event.target.findIndex(target => (target.type=='AppInstance' && target.id==appId)) > -1)
        
        
    }).length

    
}