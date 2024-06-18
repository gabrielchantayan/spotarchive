import { initDB } from "../database/postgres"
import { log } from "../misc/logger";

const initialize = async () => {


    // Initialize DB
    log('Initializing database...');
    await initDB();

}

export default initialize