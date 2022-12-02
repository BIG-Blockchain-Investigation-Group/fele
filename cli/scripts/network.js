const NodeCouchDb = require('node-couchdb');
const { username, password } = require('../../conf/dbConfig.json')

const couch = new NodeCouchDb({
    auth: {
        user: username,
        pass: password
    }
});

const createDatabase = async(databaseName) => {
    console.log(databaseName)
    couch.createDatabase(databaseName).then(() => {return true}, err => {
        return false
    });
}

async function createNetwork(networkConfigfile, networkName) {
    console.log(networkName)
    const database = "fele__"+networkName
    const fileName = "./"+networkConfigfile;
    var file = require(fileName);
    console.log(file)
    await createDatabase(networkName).then(() => {
        couch.insert(networkName, file);
    }) 
}

async function deleteNetwork(networkName) {
    const database = "fele__"+networkName
    couch.dropDatabase(database).then(() => {console.log("successfully deleted database")}, err => {
        console.log("error")
    });
}

module.exports = {
    createNetwork,
    deleteNetwork
}
