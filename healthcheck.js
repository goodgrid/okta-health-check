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
    factors: await factorData(),
    health: await healthData(),
    tokens: await tokenData(),
    admins: await adminData(),
    features: await featureData(),
    domains: await domainData(),
    events: await eventData(),
    config: config.alerts


})




