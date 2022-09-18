import { oktaInternal } from "../oktaApi.js";


const warnings = {
    PASSWORD_CHANGED_NOTIFICATION: {
        title: "Password Change Notifications are disabled.",
        description: "Password Changed Notifications inform end users via email that the password for their account has changed. Users may report suspicious activity to their admins from this email. Okta recommends enabling this email notification."
    },
    OKTA_VERIFY_MFA_POLICY: {
        title: "Okta Verify is not fully configured for at least 1 policy",
        description: "App-based factors like Okta Verify are considered more secure than factors like SMS, Voice, Email and Security Question. If available for your org, Okta Verify Push is recommended for a better end user experience. "
    },
    STRONG_FACTORS_MFA_POLICY: {
        title: "There are one or more weak MFA factors in use",
        description: "Okta recommends reviewing the enrollment policy and disabling Security Question, SMS, Email and Voice factors. Strong factors like Okta Verify, WebAuthn, or Google Authenticator have better resistance to phishing and man-in-the-middle attacks."
    },
    SESSION_POLICY: {
        title: "Session lifetime is longer than recommended from a security perspective.",
        description: "Session Lifetime determines the duration of an end user's sign-on session to Okta. Lowering this value decreases the risk of malicious third party access to a user's applications from an active session. Okta recommends a session lifetime of no more than 2 hours. "
    },
    NEW_DEVICE_NOTIFICATION: {
        title: "Users are not informed if an unknown device is used to log on with their account.",
        description: "New Sign-On Notifications inform end users via email of any unrecognized activity from a new or unknown device or browser. Users may report suspicious activity to their admins from this email. Okta recommends enabling this email notification."
    },
    FACTOR_ENROLLMENT_NOTIFICATION: {
        title: "Users are not informed if a new  factor is enrolled for their account.",
        description: "Factor Enrollment Notifications inform end users via email of new MFA enrollment activity on their account. Users may report suspicious activity to their admins from this email. Okta recommends enabling this email notification. "
    },
    FACTOR_RESET_NOTIFICATION: {
        title: "Users are not informed if a factor was reset in their name.",
        description: "Factor Reset Notifications inform end users via email that MFA factors for their account have been reset. Okta recommends enabling this email notification."
    },
    SAML_AUTH_FOR_APP_ACCESS: {
        title: "There are one or more apps that support SAML but do not use it.",
        description: "SAML and OIDC are authentication protocols that reduce reliance on password-based authentication. Okta recommends enabling SAML and disabling SWA for applications when possible. "
    },
    PASSWORD_POLICY: {
        title: "There is one weak password policy in use.",
        description: "Okta recommends that all password policies are set to the following: minimum length of 12 characters, minimum history of 24, minimum age, lockout after unsuccessful attempts, and common passwords restricted. "
    },
    BLOCKLISTED_NETWORK_ZONE: {
        title: "IP Block list is unused.",
        description: "Block listed network zones deny access from malicious IP addresses or locations from your Okta tenant. Your org's Network Zone block list does not contain any IP addresses or locations. Okta recommends block listing any known untrusted IPs or locations. "
    },
    REQUIRED_FACTOR_CONFIGURED: {
        title: "There are one or more policies which do not enforce the use of MFA.",
        description: "Setting at least one required factor for your org ensures that end users assigned to a given a policy are enrolled in MFA. Okta recommends requiring at least 1 factor in every MFA enrollment policy"
    },
    ADMIN_COUNT_RATIO: {
        title: "Little use of specific administrator roles",
        description: "Admins should be assigned minimal permissions. Your org contains more super admins than most orgs of your size. Okta recommends reviewing your admin list to identify users that require super admin privileges"
    },
    THREAT_INSIGHTS_SETTING: {
        title: "No use of ThreatInsight",
        description: "Okta ThreatInsight maintains an evolving list of IPs that exhibit suspicious behavior. Okta recommends enabling ThreatInsight to log and block authentication attempts from these suspicious IPs"
    },

}

const healthData = async () => {
    const response = await oktaInternal.get("v1/securityHealthCheck")

       return response.data.map(item => {

        return {
            title: ((warnings[item.category] !== undefined) ? warnings[item.category].title : item.category),
            description: ((warnings[item.category] !== undefined) ? warnings[item.category].description : "There is currently no explanation for this issue"),
            warningLevel: item.warningLevel,
            securityImpactLevel: item.securityImpactLevel,
            sortOrder: item.sortOrder
            
        }
    })
    .filter(item => item.warningLevel != 'OK')
    .sort(({sortOrder:a}, {sortOrder:b}) => a-b)

    

}


export { healthData }