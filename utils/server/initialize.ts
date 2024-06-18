import { initDB } from "../database/postgres"

const initialize = async () => {


    // Initialize DB
    console.log('Initializing database...');
    await initDB();

}

export default initialize