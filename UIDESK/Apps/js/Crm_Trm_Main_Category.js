$(document).ready(function () {
    DataTableTransaksi()
    DropdwonDataTenant()
    $("#Update").hide();
    $("#Delete").hide();
});
function ActionSimpan() {
    var TenantID = $("#CmbTenant").val();
    var MainCategory = $("#MainCategory").val();
    if (TenantID == '' || TenantID == 'Select') {
        swal(
            '',
            'Tenant is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (MainCategory == '') {
        swal(
            '',
            'Main Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }  
    if ($("#cmbStatus").val() == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Main_Category.asmx/PTM_SP_MainCategory",
        data: "{ID:'0', UserName: '" + $("#hd_sessionLogin").val() + "', TenantID:'" + TenantID + "', ObjectName:'" + MainCategory + "', Status:'0', Action: 'CHECK'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length == 0) {
                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            $("#LoaderPage").show();

                            var form_data = JSON.stringify({
                                ID: "0", UserName: $("#hd_sessionLogin").val(), TenantID: TenantID, ObjectName: MainCategory,
                                Status: $("#cmbStatus").val(), Action: "INSERT"
                            });
                            $.ajax({
                                url: "asmx/Crm_Trm_Main_Category.asmx/PTM_SP_MainCategory",
                                method: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: form_data,
                                success: function (data) {
                                    console.log(form_data)

                                    var json = JSON.parse(data.d);
                                    var i = "";
                                    for (i = 0; i < json.length; i++) {
                                        if (json[i].Result == "True") {
                                            swal(
                                                '',
                                                'Insert Data Has Been Success',
                                                'success'
                                            ).then(function () {
                                                $("#CmbTenant").val("");
                                                $("#MainCategory").val("");
                                                $("#cmbStatus").val("");
                                                $("#addContactModal").modal('hide');
                                                window.location.href = "Crm_Trm_Main_Category.aspx?";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Insert Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                $("#addContactModal").modal('hide');
                                                return false;
                                            });
                                            return false;
                                        }
                                    }

                                },
                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                    console.log(xmlHttpRequest.responseText);
                                    console.log(textStatus);
                                    console.log(errorThrown);
                                },
                                complete: function () {

                                }
                            });

                        }
                    });
            } else {
                swal(
                    '',
                    '' + MainCategory + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Main_Category.aspx?";
                });
                return false;
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableTransaksi() {
    var myTable = $('#DataTableMain').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Main_Category.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK149'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    //'<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].NamaGrup, json[i].MainCategory, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdwonDataTenant() {
    var CmbTenant = $('#CmbTenant');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Main_Category.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK06'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultTenant = "";

            CmbTenant.empty();
            CmbTenant.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultTenant = '<option value="' + json[i].IdGrup + '">' + json[i].NamaGrup + '</option>';
                CmbTenant.append(resultTenant);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function NewUser() {
    $("#addContactModal").modal('show');
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected()
}
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Main_Category.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK153'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#MainCategory").val(json[i].MainCategory)
                $("#cmbStatus").val(json[i].NA)
                $("#CmbTenant").find("option:selected").text();
                $("#CmbTenant").val(json[i].TenantID);
                $("#CmbMainCategory").find("option:selected").text();
                $("#CmbMainCategory").val(json[i].MainCategoryID);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}