//import { stringify } from "csv-stringify/sync";
import config from './config.js';
import { friendlyDate } from './utils.js';
import generateReport from './report.js'
import { appData } from "./aspects/apps.js";
import { userData } from "./aspects/users.js";
import { policyData } from "./aspects/policies.js";
import { orgData } from "./aspects/org.js";
import { domainData } from "./aspects/domains.js";
import { featureData } from "./aspects/features.js";
import { adminData } from "./aspects/admins.js";
import { tokenData } from "./aspects/tokens.js";
import { factorData } from "./aspects/factors.js";
import { healthData } from "./aspects/health.js";
import { eventData } from './aspects/events.js';
import { zoneData } from './aspects/zones.js';



const testData = [{"id":"00puawb23AinyzfWG416","name":"NotarisID Service Account Login","status":"ACTIVE","appliesTo":["Service & API Accounts"],"settings":{"factorEnrollmentStrategies":["Enrollment of factor okta_otp is not alowed.","Enrollment of factor okta_push is not alowed.","Enrollment of factor google_otp is not alowed.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is required."]},"rules":[{"name":"Service Account","if":{"provider":"","origin":"Anywhere 'LegacyIpZone'","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":1} ,{"id":"00puatfh9FyGoJoHN416","name":"NotarisID Default","status":"ACTIVE","appliesTo":["Everyone"],"settings":{"factorEnrollmentStrategies":["Enrollment of factor okta_otp is optional.","Enrollment of factor okta_push is optional.","Enrollment of factor google_otp is optional.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is not alowed."]},"rules":[{"name":"NotarisID Default Rule","if":{"provider":"","origin":"Anywhere ''","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":2},{"id":"00pt4kylcszM3BkLF416","name":"Default Policy","status":"ACTIVE","appliesTo":["Everyone"],"settings":{"factorEnrollmentStrategies":["Enrollment of factor okta_otp is optional.","Enrollment of factor okta_push is optional.","Enrollment of factor google_otp is optional.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is optional."]},"rules":[{"name":"Default Rule","if":{"provider":"","origin":"Anywhere ''","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":3}]
//const testData = [{"id":"00puawb23AinyzfWG416","name":"NotarisID Service Account Login","status":"ACTIVE","appliesTo":["Service & API Accounts"],"settings":{"factorEnrollmentStrategies":["Enrollment of factor okta_otp is not alowed.","Enrollment of factor okta_push is not alowed.","Enrollment of factor google_otp is not alowed.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is required."]},"rules":[{"name":"Service Account","if":{"provider":"","origin":"Anywhere 'LegacyIpZone'","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":1}] //,{"id":"00puatfh9FyGoJoHN416","name":"NotarisID Default","status":"ACTIVE","appliesTo":["Everyone"],"settings":{"factorsEnrollmentStrategies":["Enrollment of factor okta_otp is optional.","Enrollment of factor okta_push is optional.","Enrollment of factor google_otp is optional.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is not alowed."]},"rules":[{"name":"NotarisID Default Rule","if":{"provider":"","origin":"Anywhere ''","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":2},{"id":"00pt4kylcszM3BkLF416","name":"Default Policy","status":"ACTIVE","appliesTo":["Everyone"],"settings":{"factorsEnrollmentStrategies":["Enrollment of factor okta_otp is optional.","Enrollment of factor okta_push is optional.","Enrollment of factor google_otp is optional.","Enrollment of factor okta_password is optional.","Enrollment of factor okta_email is optional."]},"rules":[{"name":"Default Rule","if":{"provider":"","origin":"Anywhere ''","context":"","risk":"","except":[]},"then":{"enrollment":"Self-enroll right before challenge"},"sortOrder":1}],"sortOrder":3}]


generateReport({
    metadata: {
        version: "0.9",
        versionLabel: "Initial version",
        author: config.reportAuthor,
        date: friendlyDate(new Date()),
        daysHistory: config.daysHistory
    },
    org: await orgData(),
    apps: await appData(),
    users: await userData(),
    passwordPolicies: await policyData("PASSWORD"),
    signonPolicies: await policyData("OKTA_SIGN_ON"),
    mfaPolicies: await policyData("MFA_ENROLL"),
    zones: await zoneData(),
    factors: await factorData(),
    health: await healthData(),
    tokens: await tokenData(),
    admins: [], //await adminData(), // SUPERADMIN ONLY
    features: [], //await featureData(), // SUPERADMIN ONLY
    domains: await domainData(),
    events: await eventData(),
    config: config.alerts


})




