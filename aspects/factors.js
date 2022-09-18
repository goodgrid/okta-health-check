import { oktaInternal } from "../oktaApi.js";


const factorTypes = {
    oktaOtp: "Okta Verify with OTP",
    oktaPush: "Okta Verify with Push",
    showPushUpgradeNotification: "showPushUpgradeNotification",
    googleOtp: "Google Authenticator",
    oktaSms: "Okta SMS Message",
    oktaCall: "Okta Phone Call",
    symantecVip: "symantecVip",
    rsaToken: "RSA Token (Hardware)",
    duo: "Duo Token (Hardware)",
    yubikey: "Yubi Key (Hardware)",
    onPremMFA: "On Premise MFA Implementation",
    oktaQuestion: "Okta Security Question",
    fidoWebauthn: "FIDO Web Authentication",
    fidoU2f: "FIDO U2F",
    oktaEmail: "Okta E-mail Message",
    customSAML: "Custom SAML Challenge",
    customOIDC: "Custom OIDC Challenge",
    claimsProvider: "Claims provider",
    customHOTP: "Custom HOTP",
    hasVipCert: "factor has VIP Certificate",
    hasDuoConfig: "factor has Duo Config",
    hasRsaConfig: "factor has RSA Config",
    hasYubikeyConfig: "factor has YUBI Config",
    hasOnPremMFAConfig: "factor has On Premise MFA Config",
    hasCustomSAMLConfig: "factor has Custom SAML Config",
    hasCustomOIDCConfig: "factor has Custom OIDC Config",
    hasClaimsProviderConfig: "factor has Claims Provider Config",
    touchIDEnabledForOktaVerify: "Touch ID enabled (Okta Verify)",
    hardwareKeyStorageRequiredForOktaVerifyAndroid: "Hardware Key storage required (Okta Verify)",
    oktaVerifyNumberMatchingChallengeSupport: "Matching number challenger support (Okta Verify)",
    fipsRequiredForOktaVerify: "FIPS Required (Okta Verify)",


}


export const factorData = async () => {

    const { data: factors } = await oktaInternal.get(`v1/admin/access/mfa_policies/factors`)

    return Object.getOwnPropertyNames(factors).map(factor => {

        return {
            name: factorTypes[factor],
            enabled: factors[factor]
        }

    })
    .filter(factor => factor.enabled === true)

}


