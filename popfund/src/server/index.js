const express = require('express');
const os = require('os');

const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Current Databases:");
    databasesList.databases.forEach(db => console.log(` ~ ${db.name}`));
}

// remove this when done testing
async function connectDB(){
    const mongo_uri = 'mongodb+srv://genuser:popfund@popfund-cluster-jxrtb.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(mongo_uri);
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

connectDB().catch(console.error);

const app = express();

app.use(express.static('dist'));

// List of APIS
app.get('/', (req, res) => res.send('GET request to the homepage'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getBusinesses', (req, res) => {
    console.log('some changes');
    console.log('here');
    const lat = req.query.lat;
    const long = req.query.long;
    console.log(lat);
    console.log(long);
    res.send(`${lat}, ${long}`);
    // 1. get the latitude and longitude passed in from frontend through url params : DONE ABOVE
    // 2. loop through all the business records in businesses collection // Require looking into MONGO documentation
    // 3.   for each of these businesses euclidean distance
    // 4.   if euclidean distance < threshold: add that business to a list
    // 5. Wrap the list in json format // JSON library + dictionaries/objects in JS
    // 6. res.send(json_formatted_response)
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
