import { oktaPublic } from "../oktaApi.js";

const labels = {
    password: {
        complexity: {
            minLength: "Minimum length",
            minLowerCase: "Minimum number of lower case characters",
            minUpperCase: "Minimum number of upper case characters",
            minNumber: "Minimum number of numbers",
            minSymbol: "Minimum number of symbols",
            excludeUsername: "May not contain username",
            dictionary: "Dictionary with too common passwords applied",
            excludeAttributes: "May not contain account attributes"
        },
        age: {
            maxAgeDays: "Days after which the password needs to be changed",          
            expireWarnDays: "Number of days in advance to warn for expiring password",
            minAgeMinutes: "Number of minutes password needs to be old before it can be changed again",
            historyCount: "Number of passwords that may not be reused"
        },
        lockout: {
            maxAttempts: "Maximum failed attempts before account is locked",
            autoUnlockMinutes: "Account automatically unlocks after (minutes)",
            userLockoutNotificationChannels: "Channel to notify user over about locked account",
            showLockoutFailures: "Show failures leading to account lock"
        }
    }
}



const policyData = async (type) => {

    const { data : policies } = await oktaPublic.get("policies",{
        params: {
            type: type
        }
    })

    return Promise.all(policies.map(async policy => {

        return {
            id: policy.id,    
            name: policy.name,
            status: policy.status,
            appliesTo: await getGroupInfo(policy.conditions.people.groups.include),
            settings: (type == "PASSWORD") ? makePasswordSettingsReadable(policy.settings) : {},

            "rules": (await oktaPublic(`policies/${policy.id}/rules`)).data.map(async rule => {

                return {
                    name: "test",
                    sortOrder: rule.priority
                }
    
            }),
            sortOrder: policy.priority
        }

    })
    .sort())

}

const makePasswordSettingsReadable = (settings) => {
    return {
        password: {
            complexity: Object.getOwnPropertyNames(settings.password.complexity).map(setting => {
                return `${labels.password.complexity[setting]}: ${settings.password.complexity[setting]}`
                
            }),
            
            age: Object.getOwnPropertyNames(settings.password.age).map(setting => {
                return `${labels.password.age[setting]}: ${settings.password.age[setting]}`
                
            }),
            lockout: Object.getOwnPropertyNames(settings.password.lockout).map(setting => {
                return `${labels.password.lockout[setting]}: ${settings.password.lockout[setting]}`
                
            }),
            
        }
    }
}

const getGroupInfo = (groups) => {
    return Promise.all(groups.map(async group => {
        const { data : { profile : { name : groupName }}} = await oktaPublic.get(`groups/${group}`)
        return groupName
    }))
}

const getConnectionInfo = async (network) => {
    switch (network.connection) {
        case "ZONE":
            return `Zone XX`
        default:
            return "Unknown"
    }
}

export { policyData }