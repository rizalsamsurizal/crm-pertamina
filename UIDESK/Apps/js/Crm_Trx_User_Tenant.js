$(document).ready(function () {
    DataUserTenant();
    DropdwonDataTenant();
    DropdwonDataLevelUser();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            DataSearchingUserTenant($(this).val());
        } else if (jumlahString == 0) {
            DataSearchingUserTenant($(this).val(""));
        }
    });
});
function DataUserTenant() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_User_Tenant.asmx/PTM_SP_UserTenant",
        data: "{ID:'0', UserName: '" + $("#hd_sessionLogin").val() + "', UserID:'0', TenantID: '0', Action: 'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].LevelUser == "Layer 1") {
                    var color = "success"
                } else if (json[i].LevelUser == "Layer 2") {
                    var color = "warning"
                } else {
                    var color = "danger"
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].UserName + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Name + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-' + color +' font-size-12">' + json[i].LevelUser + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].TenantName + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataSearchingUserTenant(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_User_Tenant.asmx/PTM_SP_UserTenant",
        data: "{ID:'" + KondisiData + "', UserName: '" + $("#hd_sessionLogin").val() + "', UserID:'0', TenantID: '0', Action: 'SEARCH'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].UserName + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Name + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].LevelUser + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].TenantName + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

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
    var cmbTenant = $('#cmbTenant');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_User_Tenant.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK06'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultTenant = "";

            cmbTenant.empty();
            cmbTenant.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultTenant = '<option value="' + json[i].IdGrup + '">' + json[i].NamaGrup + '</option>';
                cmbTenant.append(resultTenant);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdwonDataLevelUser() {
    var cmbLevelUser = $('#cmbLevelUser');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_User_Tenant.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK147'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultLevelUser = "";

            cmbLevelUser.empty();
            cmbLevelUser.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultLevelUser = '<option value="' + json[i].Description + '">' + json[i].Description + '</option>';
                cmbLevelUser.append(resultLevelUser);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Change_DataTable() {
    var selectedText = $("#cmbLevelUser").find("option:selected").text();
    var selectedValue = $("#cmbLevelUser").val();
    DataTableUser();
}
function DataTableUser() {
    var myTable = $('#DataTableUser').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_User_Tenant.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#cmbLevelUser").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK146'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = '<input type = "checkbox" class="checkbox" name="checkbox' + json[i].USERID + '" id = "checkbox' + json[i].USERID + '" >' +
                    '<label class="checkbox" for="checkbox' + json[i].USERID + '"></label>'
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS]).draw(false);


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
    $("#modal-agent").modal('show');
    $("#btnSimpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        //Loop through all checked CheckBoxes in GridView.
        $("#DataTableUser input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        $("#ContentPlaceHolder1_TrxAgentId").val(message)
        if ($("#cmbTenant").val() == "Select" || $("#cmbTenant").val() == "") {
            swal(
                '',
                'Tenant is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#cmbLevelUser").val() == "Select" || $("#cmbLevelUser").val() == "") {
            swal(
                '',
                'Level User is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal(
                '',
                '' + $("#cmbLevelUser").val() + ' is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    $.ajax({
                        type: "POST",
                        url: "asmx/Crm_Trx_User_Tenant.asmx/PTM_SP_UserTenant",
                        data: "{ID:'0', UserName: '" + $("#hd_sessionLogin").val() + "', UserID: '" + encodeData($("#ContentPlaceHolder1_TrxAgentId").val()) + "', TenantID: '" + $("#cmbTenant").val() + "', Action: 'INSERT'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            var json = JSON.parse(data.d);
                            var i = "";
                            for (i = 0; i < json.length; i++) {
                                if (json[i].Result == "True") {
                                    swal(
                                        '',
                                        'Insert Data Has Been Success',
                                        'success'
                                    ).then(function () {
                                        $("#modal-agent").modal('hide');
                                        window.location.href = "Crm_Trx_User_Tenant.aspx?";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed',
                                        'error'
                                    ).then(function () {
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
                        }
                    })

                }
            });

    });
});
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ButtonDelete(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), UserName: $("#hd_sessionLogin").val(), UserID: '0', TenantID: '0', Action: 'DELETE'});
                $.ajax({
                    url: "asmx/Crm_Trx_User_Tenant.asmx/PTM_SP_UserTenant",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_User_Tenant.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
                                    'error'
                                ).then(function () {
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
}