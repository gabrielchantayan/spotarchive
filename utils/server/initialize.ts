import { initDB } from "../database/postgres.js"

const initialize = async () => {


    // Initialize DB
    console.log('Initializing database...');
    await initDB();

}

export default initialize