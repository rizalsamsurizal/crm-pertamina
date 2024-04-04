$(document).ready(function () {
    $("#ActionExport").hide()
    $('#DataTableReportTransaction').hide()
});
function ActionSubmitReport() {
    if ($("#dt_strdate").val() == '') {
        swal(
            '',
            'Start Date is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#dt_endate").val() == '') {
        swal(
            '',
            'End Date is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var myTable = $('#DataTableReportTransaction').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Xtra_Report.asmx/UIDESK_Xtra_Reporting",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', XStartDate: '" + $("#dt_strdate").val() + "', XEndDate: '" + $("#dt_endate").val() + "', XReportType: '0', Xtype:'0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            if (json.length == "0") {
            } else {
                for (i = 0; i < json.length; i++) {

                    myTable.row.add([json[i].GenesysID, json[i].ThreadID, json[i].NIK, json[i].CustomerName, json[i].TicketNumber, json[i].AccountInbound, json[i].CategoryName,
                        json[i].Level1, json[i].Level2, json[i].Level3, json[i].SkalaPrioritas, json[i].SLA, json[i].NewStatus, json[i].CreatedByNew
                    ]).draw(false);

                }
                $('#DataTableReportTransaction').show()
                $("#ActionExport").show()
            }
           
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}