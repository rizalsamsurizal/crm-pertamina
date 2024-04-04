$(document).ready(function () {
    DataTableHistory();
});
function DataTableHistory() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmHistory').DataTable(
        {
            "order": [[6, "desc"]]
        },
    );
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK119'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].CreatedDate);
                var milisegundos = parseInt(json[i].CreatedDate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].TicketStatus == "Open") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Pending") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Solved") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Closed") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].TicketStatus + "</span>"
                }
                if (json[i].TicketPosition == "1") {
                    var TrxPosition = "Layer 1"
                } else if (json[i].TicketPosition == "2") {
                    var TrxPosition = "Layer 2"
                } else if (json[i].TicketPosition == "3") {
                    var TrxPosition = "Layer 3"
                } else if (json[i].TicketPosition == "4") {
                    var TrxPosition = "Eksternal/Vendor"
                }
                myTable.row.add([json[i].TicketNumber, json[i].CustomerName, json[i].CategoryName, TrxPosition, TrxParam, json[i].SLA, newDate + ' ' + newTime]).draw(false);

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
function Filter() {
    $("#addContactModal").modal('show');
}
function ActionFilter() {
    if ($("#startdate").val() == '') {
        swal(
            '',
            'Start Date is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#enddate").val() == '') {
        swal(
            '',
            'End Date is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#startdate").val() > $("#enddate").val()) {
        swal(
            '',
            'Start Date greater than End Date',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
}
function FilterComboType() {
    if ($("#ComboType").val() == "1") {
        $("#ParameterCustomer").show()
        $("#ParameterDate").hide()
    } else if ($("#ComboType").val() == "2") {
        $("#ParameterDate").show()
        $("#ParameterCustomer").hide()
    } else if ($("#ComboType").val() == "3") {
        $("#ParameterDate").show()
    }
}