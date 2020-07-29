const $ = require("jquery");
const path = require("path");
const fs = require("fs");
const { editor } = require("monaco-editor");
let myEditor;
$(document).ready(async function () {
    myEditor = await createEditor();

    // ---------------File explorer Logic ------------------
    let src = process.cwd(); //current working directory => cwd
    let name = path.basename(src);
    let pObj = {
        id: src,
        parent: "#",
        text: name
    }
    let chArr = createChildNode(src);

    chArr.unshift(pObj);
    $("#tree").jstree({
        "core": {
            "check_callback": true,
            "data": chArr
        },
    }).on("open_node.jstree", function (e, data) {
        let children = data.node.children;

        for (let i = 0; i < children.length; i++) {
            let gcNodes = createChildNode(children[i]);

            for (let j = 0; j < gcNodes.length; j++) {
                // data array 

                console.log(children[i])
                let isGcPresent = $('#tree').jstree(true).get_node(gcNodes[j].id);
                if (isGcPresent) {
                    return;
                }
                $("#tree").jstree().create_node(children[i], gcNodes[j], "first");
            }
        }
    }).on("select_node.jstree", function (e, data) { //event for select on file explorer.
        console.log("select event occured");
        let src = data.node.id;
        let isFile = fs.lstatSync(src).isFile(); //to check if the event clicked in file explorer is a file or a directory
        if (!isFile) { //if it is not a file then don't open in code editor
            return;
        }
        let content = fs.readFileSync(src) + ""; //if a file, can be opened in 

        myEditor.getModel().setValue(content);
        // how to set language in monaco editor
        let ext = src.split(".").pop();
        if (ext == "js") {
            ext = "javascript"
        }
        myMonaco.editor.setModelLanguage(myEditor.getModel(), ext);
    });
})

function createChildNode(src) {
    let isDir = fs.lstatSync(src).isDirectory();
    if (isDir == false) {
        return [];
    }
    let children = fs.readdirSync(src);
    let chArr = [];
    for (let i = 0; i < children.length; i++) {
        let cPath = path.join(src, children[i]);
        let chObj = {
            id: cPath,
            parent: src,
            text: children[i]
        }
        chArr.push(chObj);
    }
    return chArr;
}

//npm install monaco-editor
function createEditor() {
    const path = require('path');
    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
    amdRequire.config({
        baseUrl: './node_modules/monaco-editor/min'
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    return new Promise(function (resolve, reject) {
        amdRequire(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript'
            });
            console.log("line number 100")
            myMonaco = monaco;
            resolve(editor);
        });
    })
}