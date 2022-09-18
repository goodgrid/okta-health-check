import fs from 'fs'
import { createReport } from 'docx-templates';
import axios from 'axios';
import config from './config.js';

const { data: template } = await axios.get(config.reportTemplateUrl, {
    responseType: 'arraybuffer',
})


const generateReport = async (data) => {

    if (config.debug) console.log(data)

    const buffer = await createReport({
        template,
        data: data
    });
    
    fs.writeFileSync(`Okta Healthcheck ${data.org.companyName} ${data.metadata.date}.docx`, buffer)

}

export default generateReport