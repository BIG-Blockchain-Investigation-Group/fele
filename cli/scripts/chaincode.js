const fs = require('fs');
const path = require("path");

function createChaincode(networkName, channelName, chaincodeName, userLocalPath) {
  const chaincodePath = "../../chaincode/"+networkName+"/"+channelName+"/"+chaincodeName
  const dir = path.join(__dirname, chaincodePath);
  try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        console.log('Directory created.')
      } else {
        console.log('Directory already exists.')
      }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createChaincode
}
 
