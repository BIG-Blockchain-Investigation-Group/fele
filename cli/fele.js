#! /usr/bin/env node
const commander = require('commander')
const { createNetwork, deleteNetwork } = require('./scripts/network')
const { createChaincode } = require('./scripts/chaincode');
const { createChannel } = require('./scripts/channel');

const program = new commander.Command();

const networkCommand = program.command('network');
const chaincodeCommand = program.command('chaincode');
const channelCommand = program.command('channel');
/************************Network Commands*********************/
networkCommand 
    .command('create')
    .description('Creates a network')
    .option('-nc, --networkConfig <networkConfig>', 'Network config json filename to be passed')
    .action((options) => {
        console.log("Common argument accessible is ",options.networkName);
        console.log("network config name is"+options.networkConfig)
        return createNetwork(options.networkConfig , options.networkName);
    });

networkCommand
    .command('remove')
    .action((networkName) => {
        return deleteNetwork(networkName);
    });

networkCommand 
    .command('update')
    .action((networkName) => {
        console.log('update subcommand');
    });

networkCommand.commands.forEach((cmd) => {
    cmd.option('-nn, --networkName <networkName>', 'Name of the network')
});  
/************************Channel Commands*********************/
channelCommand
    .command('create')
    .option('-nn, --networkName <networkName>', 'Name of the network')
    .option('-cn, --channelName <channelName>', 'Name of the channel')
    .action((options) => {
        return createChannel(options.networkName, options.channelName)
    })
//************************Chaincode Commands******************** */
const registerCommand = chaincodeCommand.command('register')

registerCommand
    .command('create')
    .action(options => {
        return createChaincode(options.networkName, options.channelName, options.chaincodeName, options.path)
    })

registerCommand
    .command('update')

registerCommand
    .command('remove')

registerCommand.commands.forEach((cmd) => {
        cmd.option('-nn, --networkName <networkName>', 'Name of the network')
        cmd.option('-cn, --channelName <channelName>', 'Name of the channel')
        cmd.option('-ccn, --chaincodeName <chaincodeName>', 'Name of the chaincode')
        cmd.option('-p, --path <path>', 'Local path of the chaincode')
    });

chaincodeCommand
    .command('invoke')
    .option('-p, --path [path]', 'Local path of the chaincode')
    .action(() => {
        console.log('invoking chaincode');
    });
program.parse(process.argv);
