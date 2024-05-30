import * as mongodb from '../utils/database/mongo.js';

const f = async () => {
    let c = await mongodb.findOne('collecddtionFail', {'fdeeeffe': 'deeeed'})
    console.log(c)
}

f();