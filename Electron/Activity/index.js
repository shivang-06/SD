const $ = require("jquery")

$(document).ready(
    function(){
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
        function init(){
            $("#file").trigger("click");
        }
        init();
    }
);
