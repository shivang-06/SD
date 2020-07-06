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
                    let cell ={
                        value : "",
                        formula : ""
                    };
                    row.push(cell);
                    //ui
                    $(cRowCells[j]).html("");
                }
                db.push(row);
            }
            console.log(db);
        })

        $("#grid .cell").on("blur", function () {
            //update db
            let{rowId,colId } = getRc(this);
            let cellObject = getCellObject(rowId,colId);
            if($(this).html()==db[rowId][colId].value){
                return
            }
            cellObject.value = $(this).html();
            // updateCell=> update self // childrens(UI changes)
            updateCell(rowId, colId, $(this).html(), cellObject);
        })

        $("#formula-container").on("blur", function () {
            // console.log("Formula fn")
            // console.log(this);
            // console.log(lsc);
            //   cell 
            let address = $("#address-container").val();
            
            // console.log(address);
            let { rowId, colId } = getRcFromAddress(address);
            // set formula
            let cellObject = getCellObject(rowId, colId);
            let formula = $(this).val();
            cellObject.formula = formula;
            let eValuatedVal = evaluate(cellObject);
            updateCell(rowId, colId, eValuatedVal, cellObject);

            // setUpFormula(rowId, colId, formula);
            // evaluate
            // update cell
        })

        function setUpFormula(rowId, colId, formula) {
            // parent  downstream add
            let cellObject = getCellObject(rowId, colId);

            // ( A1 + A2 )
            //    ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [(,A1,+,A2,)]

            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);

                if (code >= 65 && code <= 90) {

                    let parentRc = getRcFromAddress(formulaComponent[i]);
                    let fParent = db[parentRc.rowId][parentRc.colId];

                    // set yourself to your parent's downstream
                    fParent.downstream.push({
                        rowId, colId
                    })
                    // // evaluate 
                    // cellObject.upstream.push({
                    //     rowId: parentRc.rowId,
                    //     colId: parentRc.colId
                    // })

                }

            }
        }

        function getRc(elem){
            let rowId = $(elem).attr("row-id");
            let colId = $(elem).attr("col-id");
            return{
                rowId,
                colId
            }
        }

        function getCellObject(rowId,colId){
            return db[rowId][colId];
        }
        function evaluate(cellObject) {
            let formula = cellObject.formula;
            // ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [( ,A1,+,A2,)]
            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    let parentRc = getRcFromAddress(formulaComponent[i]);

                    let fParent = db[parentRc.rowId][parentRc.colId];
                    let value = fParent.value;
                    formula = formula.replace(formulaComponent[i], value)
                }

            }
            // ( 10 + 20 )
            console.log(formula);
            let ans = eval(formula);
            console.log(ans);
            return ans;
            // console.log(formula)
            // for (let i = 0; i < cellObject.upstream.length; i++) {
            //     let suo = cellObject.upstream[i];
            //     let fParentObject = db[suo.rowId][suo.colId];
            //     let val = fParentObject.value;
            //     // formula => replace A1 => 10
            //     let colAlpha = String.fromCharCode(suo.colId + 65);
            //     let rowNumber = suo.rowId + 1;
            //     let charMeParent = colAlpha + rowNumber;
            //     formula = formula.replace(charMeParent, val);
            // }
            // console.log(formula);
            // let ans = eval(formula);
            // console.log(ans);
            // return ans;
        }
        function updateCell(rowId, colId, val, cellObject) {
            // update yourself
            $(`#grid .cell[ri=${rowId}][ci=${colId}]`).html(val);
            cellObject.value = val;

            // dependent 
            // let cellObject = getCellObject(rowId, colId);
            // for (let i = 0; i < cellObject.downstream.length; i++) {
            //     let schild = cellObject.downstream[i];
            //     let fChildObj = db[schild.rowId][schild.colId];
            //     let eValuatedVal = evaluate(fChildObj);
            //     updateCell(schild.rowId, schild.colId, eValuatedVal)

            // }
        }
        function getRcFromAddress(address) {
            let colId = address.charCodeAt(0) - 65;
            let rowId = Number(address.substring(1)) - 1;
            return { colId, rowId };

        }

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
