import { oktaPublic } from "../oktaApi.js";
import { getEvents } from "../utils.js";

const objectLimit = 200 

const appTypes = {
    AUTO_LOGIN: "Secure Web Access/1",
    SAML_2_0: "SAML 2.0",
    SAML_1_1: "WS Federation",
    OPENID_CONNECT: "OIDC",
    BOOKMARK: "Bookmark",
    SECURE_PASSWORD_STORE: "Secure Web Access/2",
    BROWSER_PLUGIN: "Shared credentials"
}

const appData = async () => {

    console.log(`Getting App Data`)

    const logins = await getEvents(`eventType eq "user.authentication.sso"`) 

    const { data : apps } = await oktaPublic.get(`apps?filter=status eq "ACTIVE"&limit=${objectLimit}`)

    return (await Promise.all(apps.map(async app => {

        return {
            id: app.id,
            name: app.label,
            status: app.status,
            type: (appTypes[app.signOnMode])? appTypes[app.signOnMode] : app.signOnMode,
            features: app.features.join(", ").toLowerCase().replace(/_/g, " "),
            numAssignments: await getAppAssignmentCount(app.id),
            numLogins: getAppLoginCount(logins, app.id)
        }
    }))).sort((a, b) => b.numLogins - a.numLogins)

}

export { appData }

const compare = ( a, b ) => {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }

const getAppAssignmentCount = async (appId) => {
    const { data : users } = await oktaPublic.get(`apps/${appId}/users?limit=${objectLimit}`)  
    
    return users.length
}

const getAppLoginCount = (logins,appId) => {
    return logins.filter(event => {
        return (event.target.findIndex(target => (target.type=='AppInstance' && target.id==appId)) > -1)        
    }).length
}