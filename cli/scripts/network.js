const NodeCouchDb = require('node-couchdb');
const { couchdb } = require('../../conf/feleConf.json')
const path = require("path");
const fs = require('fs');

const couch = new NodeCouchDb({
    auth: {
        user: couchdb.username,
        pass: couchdb.password
    }
});

const createDatabase = async(databaseName) => {
    console.log(databaseName)
    return couch.createDatabase(databaseName).then(() => {
        return true
    }, err => {
        console.log(err)
        return false
    });
}

async function createNetwork(networkConfigfile, networkName) {
    const database = "fele__"+networkName
    const fileName = "./"+networkConfigfile;
    var file = require(fileName);
    const databaseCreated = await createDatabase(database)
    if(databaseCreated) couch.insert(database, file);
    
    //To create network folder under chaincode
    var dir = "../../chaincode/"+networkName
    dir = path.join(__dirname, dir);
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    } catch (err) {
        console.log(err)
    }
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
