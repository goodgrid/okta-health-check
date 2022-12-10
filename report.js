import fs from 'fs'
import { createReport } from 'docx-templates';
//import axios from 'axios';
import { debug } from "./utils.js";
import config from './config.js';

//const { data: template } = await axios.get(config.reportTemplateUrl, {
//    responseType: 'arraybuffer',
//})


const template = fs.readFileSync('./Health Check Template.docx')

const generateReport = async (data) => {

    debug(JSON.stringify(data))

    const buffer = await createReport({
        template,
        data: data
    });
    
    fs.writeFileSync(`Okta Healthcheck ${data.org.companyName} ${data.metadata.date}.docx`, buffer)

}

export default generateReport