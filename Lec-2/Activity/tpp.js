//Libraries require
let viewFile = require("./cmds/view")
let untreefyFile = require("./cmds/untreefy")
let treefyFile = require("./cmds/treefy")
let monitorFile = require("./cmds/monitor")
let helpFile = require("./cmds/help")

let input = process.argv;
let command = input.slice(2)[0];


if (command == 'view') {
    viewFile.view(process.argv[3], process.argv[4])

} else if (command == 'treefy') {
    treefyFile.treefy(process.argv[3], process.argv[4])

} else if (command == 'untreefy') {
    untreefyFile.untreefy(process.argv[3], process.argv[4])

} else if (command == 'help') {
    helpFile.help();

} else if (command == 'monitor') {
    monitorFile.monitor()


} else {
    console.log(`Wrong Command
 Use Help command to view commands`);

}

