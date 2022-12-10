import { oktaInternal } from "../oktaApi.js";
import { friendlyDate } from "../utils.js";

// TODO: Tokens are bound to users, i dotn think i will have a complete list of all tokens in the instance.


export const tokenData = async () => {

    console.log(`Getting Token Data`)

    const { data: tokens } = await oktaInternal.get(`tokens`)

    return tokens.map(token => {

        return {
            name: token.name,
            status: token.status,
            lastUsed: friendlyDate(token.lastUpdated),
            created: token.created,
            expires: token.expiresAt
            

        }
    })
}


