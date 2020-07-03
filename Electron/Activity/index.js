const $ = require("jquery")

$(document).ready(
    function(){
        let db=[]
        $("#grid .cell").on("click",function(){
            let rowid = Number($(this).attr("row-id"));
            let colid = Number($(this).attr("col-id"));
            let colAddress = String.fromCharCode(colid + 65);
            $("#address-container").val(colAddress + rowid );
        })   
        $(".menu-items").on("click",function(){
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })

        $("#new").on("click",function(){
            db = [];
           let rows = $("#grid").find(".row");
           for(let i= 0 ;i <rows.length ; i++){
               let row = [];
               let cRowCells = $(rows[i]).find(".cell");
               for(let j=0;j< cRowCells.length ; j++){
                   //db
                   let cell = false;
                   row.push(cell);
                   //ui
                   $(cRowCells[j]).html("false");
               }
               db.push(row);
           }
           console.log(db);
        })


        function init(){
            $("#file").trigger("click");
            $("#new").click();
        }
        init();
    }
);
