import { getEvents } from "../utils.js"
import config from "../config.js"


export const eventData = async () => {

    const entries = Promise.all(config.events.map(async event => {
        return {
            title: event.title,
            description: event.description,
            numEvents: (await getEvents(event.filter)).length,
            threshold: event.threshold
        }
    }))
    
    
    
    return (await entries).filter(event => event.numEvents > event.threshold)

}

