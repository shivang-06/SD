const input = process.argv
let { view } = require("./cmds/view")  //{} this gives function from the file which is being imported
let { treefy } = require("./cmds/treefy")
let { untreefy } = require("./cmds/untreefy")
let { help } = require("./cmds/help")

let cmd = process.argv[2];

switch (cmd) {
    case "view":
        view(process.argv[3], process.argv[4]);
        break;
    case "treefy":
        treefy(process.argv[3], process.argv[4]);
        break;
    case "untreefy":
        untreefy(process.argv[3], process.argv[4]);
        break;
    case "help":
        help();
        break;
    default:
        console.log("Wrong Command");
}