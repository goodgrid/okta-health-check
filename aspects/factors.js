import {
    oktaInternal
} from "../oktaApi.js";


const factorTypes = {
    oktaOtp: {
        title: "Okta Verify with OTP",
        description: "This factor requires the user to enter a code generated by Okta Verify. Such a One-Time Password is verified based on a shared secret between the app and the Okta instance and is only valid for a limited amount of time. This factor assures to a reasonable level that the user has possession over a known physical token, the phone. Users need to be aware that the generated code serves as a password and needs to stay secret. OTP Fraud includes social engineering to obtain generated codes.",
    },
    oktaPush: {
        title: "Okta Verify with Push",
        description: "This factor sends a notification to a known device requiring the user to confirm it is him/her attempting to log in. The response returned after confirmation is verified based on a shared secret between the app and the Okta instance and is only valid for a limited amount of time. This factor assures to a reasonable level that the user has possession over a known physical token, the phone. However, only requiring one-touch confirmation of a log-in attempt is vulnerable to so called 'MFA fatigue attacks where the user eventually confirms to stop endless MFA notifications."
    },
    showPushUpgradeNotification: {
        title: "showPushUpgradeNotification",
        description: ""
    },
    googleOtp: {
        title: "Google Authenticator",
        description: "Google Authenticator is a popular authenticator app used to perform MFA based on one-time passwords. Such a One-Time Password is verified based on a shared secret between the app and the Okta instance and is only valid once or for a limited amount of time, depending on usage of the HOTP or TOTP standard. This factor assures to a reasonable level that the user has possession over a known physical token, the phone. Users need to be aware that the generated code serves as a password and needs to stay secret. Google Authenticator allows to export profiles from one phone and import them on another. This is user friendly, but weakens the possession factor it should be. Google Authenticator is sometimes critized for the of the SHA1 algorithm wich is no longer considered secure and for not protecting access to the app with biometric verification like FaceID, TouchID, etc. (https://securethoughts.com/google-authenticator/)"
    },
    oktaSms: {
        title: "Okta SMS Message",
        description: "This factor allows the user to confirm his/her identity by returning a code sent by Okta to the known mobile phone number which was previously verified. This increases assurance to a reasonable level. For higher confidence levens, this factor should be reviewed, since e-SIMs weaken the possession factor of a phone. Also, mobile operators may not have sufficient measures in place to prevent phone number hijacking."
    },

    oktaCall: {
        title: "Okta Phone Call",
        description: "This factor allows the user to confirm his/her identity by returning a code provided in a voice call by Okta to the known mobile phone number which was previously verified. This increases assurance to a reasonable level. For higher confidence levens, this factor should be reviewed, since e-SIMs weaken the possession factor of a phone. Also, mobile operators may not have sufficient measures in place to prevent phone number hijacking."
    },

    symantecVip: {
        title: "Symantec Validation and ID Protection Service",
        description: "Symantec VIP is a Multi Factor Authentication suite with options varying from an authenticator app to the use of hardware tokens. Depending on the choices made, the assurence is reasoable to very high."
    },
    rsaToken: {
        title: "RSA Token",
        description: ""
    },
    duo: {
        title: "Duo Token (Hardware)",
        description: ""
    },
    yubikey: {
        title: "Yubi Key (Hardware)",
        description: ""
    },
    onPremMFA: {
        title: "On Premise MFA Implementation",
        description: ""
    },
    oktaQuestion: {
        title: "Okta Security Question",
        description: "This Okta specific factor requires the correct answer to a previously set question. For example, favorite food as a child. This factor has not high assurence, but can be applied to avoid brute force attacks or to start a password reset procedure."
    },
    fidoWebauthn: {
        title: "FIDO2 Web Authentication",
        description: "WebAuthn is the core deliverable of the FIDO2 Project of the FIDO Alliance. As the successor of FIDO U2F, FIDO2 can be used as a single or second factor. Dependent on the implementation of this standard, the verification is baed on a knowledge factor, like a pin, password or swipe pattern, or a biometric factor, like fingerprint, iris, face or voice."
    },
    fidoU2f: {
        title: "FIDO U2F",
        description: "This is the predecessor of the FIDO2 standards. It is considered legacy."
    },
    oktaEmail: {
        title: "Okta E-mail Message",
        description: "This factor requires the return of a code sent to a previously verified email address. The assurance of this factor is completely dependent of the security of the email infrastructure and access to mailboxes."
    },
    customSAML: {
        title: "Custom SAML Challenge",
        description: "This factor allows for verification of users identities using a trusted identty provider using the SAML2 standard. This allows, for example, to confidently identify users using national eID schemes, as long as they support the SAML2 standard."
    },
    customOIDC: {
        title: "Custom OIDC Challenge",
        description: "This factor allows for verification of users identities using a trusted identty provider using the OpenID Connect standard. This allows, for example, to confidently identify users using national eID schemes, as long as they support the OIDC standard."
    },
    claimsProvider: {
        title: "Claims provider",
        description: ""
    },
    customHOTP: {
        title: "Custom HMAC-based OTP (HOTP) factor",
        description: "Okta is set up to support a custom HOTP authenticator."
    },
    hasVipCert: {
        title: "Extra: factor has VIP Certificate",
        description: ""
    },
    hasDuoConfig: {
        title: "Extra: factor has Duo Config",
        description: ""
    },
    hasRsaConfig: {
        title: "Extra: factor has RSA Config",
        description: ""
    },
    hasYubikeyConfig: {
        title: "Extra: factor has YUBI Config",
        description: ""
    },
    hasOnPremMFAConfig: {
        title: "Extra: factor has On Premise MFA Config",
        description: ""
    },
    hasCustomSAMLConfig: {
        title: "Extra: factor has Custom SAML Config",
        description: ""
    },
    hasCustomOIDCConfig: {
        title: "Extra: factor has Custom OIDC Config",
        description: ""
    },
    hasClaimsProviderConfig: {
        title: "Extra: factor has Claims Provider Config",
        description: ""
    },
    touchIDEnabledForOktaVerify: {
        title: "Extra: touch ID enabled (Okta Verify)",
        description: "The assurance of Okta Verify is strengtened by also requiting biometric based verification to the app, using TouchID/FaceID"
    },
    hardwareKeyStorageRequiredForOktaVerifyAndroid: {
        title: "Hardware Key storage required (Okta Verify)",
        description: ""
    },
    oktaVerifyNumberMatchingChallengeSupport: {
        title: "Matching number challenger support (Okta Verify)",
        description: ""
    },
    fipsRequiredForOktaVerify: {
        title: "FIPS Required (Okta Verify)",
        description: "Okta Verify is set to managed keys in accordance with FIPS 140-2. Federal Information Processing Standard (FIPS) directive 140-2 ensures that the management of cryptographic keys is in accordance with the NIST standards. Applying FIPS standards is a requirement for many US-based, regulated industries and US state and government agencies."
    },


}


export const factorData = async () => {

    console.log(`Getting Factor Data`)

    const {
        data: factors
    } = await oktaInternal.get(`v1/admin/access/mfa_policies/factors`)

    return Object.getOwnPropertyNames(factors).map(factor => {

            return {
                name: factorTypes[factor].title,
                description: factorTypes[factor].description,
                enabled: factors[factor]
            }

        })
        .filter(factor => factor.enabled === true)

}