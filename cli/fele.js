#! /usr/bin/env node
const commander = require('commander')
const { createNetwork, deleteNetwork } = require('./scripts/network')

const program = new commander.Command();

const networkCommand = program.command('network');

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

program.parse(process.argv);
