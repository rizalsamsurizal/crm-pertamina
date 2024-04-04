$(document).ready(function () {
    DataTableHistory();
});
function DataTableHistory() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmHistory').DataTable(
        {
            "order": [[4, "desc"]]
        },
    );
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK120'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].DIRECTION == "Archive") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].DIRECTION + "</span>"
                } else if (json[i].DIRECTION == "IN") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].DIRECTION + "</span>"
                } else if (json[i].DIRECTION == "Spam") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].DIRECTION + "</span>"
                } else {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].DIRECTION + "</span>"
                }

                myTable.row.add([json[i].IVC_ID, json[i].EFROM, json[i].ESUBJECT, TrxParam, newDate + ' ' + newTime]).draw(false);

            }
            $("#Loading").css("display", "none");

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}