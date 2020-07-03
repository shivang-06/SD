const $ = require("jquery")
const electron = require("electron");
const fs = require("fs");
const dialog = require("electron").remote.dialog;

$(document).ready(
    function () {
        let db = []
        $("#grid .cell").on("click", function () {
            let rowid = Number($(this).attr("row-id"));
            let colid = Number($(this).attr("col-id"));
            let colAddress = String.fromCharCode(colid + 65);
            $("#address-container").val(colAddress + rowid);
        })
        $(".menu-items").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })

        $("#new").on("click", function () {
            db = [];
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    //db
                    let cell = "";
                    row.push(cell);
                    //ui
                    $(cRowCells[j]).html("false");
                }
                db.push(row);
            }
            console.log(db);
        })
        $("#grid .cell").on("keyup", function () {
            //update db
            let rowId = $(this).attr("row-id");
            let colId = $(this).attr("col-id");
            db[rowId][colId] = $(this).html();
            console.log(db);
        })

        $("#save").on("click", async function () {
            let sdb = await dialog.showOpenDialog();
            let JsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], JsonData);
        })

        $("#open").on("click",async function () {
            let odb = await dialog.showOpenDialog();
            let fpath = odb.filePaths[0];
            let content = fs.readFileSync(fpath);
            db = JSON.parse(content);
            //loop
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    //DB
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })
        function init() {
            $("#file").trigger("click");
            $("#new").click();
        }
        init();
    }
);
