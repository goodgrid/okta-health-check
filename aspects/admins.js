import { oktaInternal } from "../oktaApi.js";


export const adminData = async () => {

    console.log(`Getting Admin Data`)

    const { data: admins } = await oktaInternal.get(`privileges/admins`)

    return Promise.all(admins.map(async admin => {
        return {
            name: admin.displayName,
            email: admin.email,
            role: (await oktaInternal.get(`privileges/stats/users/${admin.userId}`)).data[0].roleName

        }
    }))
}


