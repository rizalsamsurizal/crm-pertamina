$(document).ready(function () {
    //TrmCustomer()
    $("#Loading").css("display", "none");
    $("#Update").hide();
    $("#Delete").hide();
    LoadingCustomer()
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            CustomerSearching($(this).val());
        } else if (jumlahString == 0) {
            CustomerSearching($(this).val(""));
        }
    });
    DropdwonDataTenant();
});
function ActionSimpan() {
    if ($("#Name").val() == "") {
        swal(
            '',
            'Nama is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#HP").val() == "") {
        swal(
            '',
            'Nomor Telepon is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Email").val() == "") {
        swal(
            '',
            'Email is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbTenant").val() == "") {
        swal(
            '',
            'Tenant is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }  
    if ($("#Alamat").val() == '') {
        swal(
            '',
            'Address Empty',
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

                var form_data = JSON.stringify({
                    TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#Name").val(), TrxCusTomerEmail: $("#Email").val(),
                    TrxCusTomerPhone: $("#HP").val(), TrxCusTomerGender: $("#ComboGender").val(), TrxCusTomerDate: $("#Birth").val(),
                    TrxCusTomerNIK: $("#NIK").val(), TrxCusTomerAlamat: $("#Alamat").val(), TrxNumberID: "0", TrxCustomerPolisNumber: "0",
                    TrxFacebook: $("#Facebook").val(), TrxInstagram: $("#Instagram").val(), TrxTwitter: $("#Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/InsertTransactionCustomer",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location = "Crm_Trm_Customer.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Customer Has Been Failed !',
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
        })
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Customer Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#hd_sessionLogin").val() == '') {
        swal(
            '',
            'Session Empty, Please Re-Login',
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

                var form_data = JSON.stringify({
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxID").val(), TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#Name").val(), TrxCusTomerEmail: $("#Email").val(),
                    TrxCusTomerPhone: $("#HP").val(), TrxCusTomerGender: $("#ComboGender").val(), TrxCusTomerDate: $("#Birth").val(),
                    TrxCusTomerNIK: $("#NIK").val(), TrxCusTomerAlamat: $("#Alamat").val(), TrxStatus: "Y", TrxFacebook: $("#Facebook").val(),
                    TrxInstagram: $("#Instagram").val(), TrxTwitter: $("#Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/UpdateTransactionCustomer",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location = "Crm_Trm_Customer.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Customer Has Been Failed !',
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
        })
}
function ActionDelete() {

}
function CustomerSearching(ParameterID) {
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ParameterID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK121'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivCustomerSystem').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                if (json[i].NA == "Y") {
                    var Status = "Active"
                    var color = "success"
                } else {
                    var Status = "Non Active"
                    var color = "danger"
                }
                if (json[i].Cabang == "" || json[i].Cabang == null) {
                    var Tenant = "-"
                } else {
                    var Tenant = json[i].Cabang
                }
                //var d = new Date(json[i].Birth);
                //var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                //var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                resultUserNotification = '<div class="card border shadow-none">' +
                    '<div class="card-body">' +
                    '<div class="d-flex">' +
                    '<div class="flex-grow-1 me-2 flex-wrap">' +
                    '<h5 class="font-size-15 mb-1"><a href="#" class="text-dark">' + json[i].Name + '</a></h5>' +
                    '<p class="text-muted mb-0">' + json[i].Alamat + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '<div class="d-flex gap-2">' +
                    '<div class="dropdown">' +
                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
                    '<i class="fa fas fa-ellipsis-h"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-end">' +
                    '<li><a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].CustomerID + ')>Edit</a></li>' +
                    '<li><a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].CustomerID + ')>Delete</a></li>' +
                    '<li>' +
                    '<hr class="dropdown-divider">' +
                    '</li>' +
                    '<li><a class="dropdown-item" href="#" onclick=PreviewKlik(' + json[i].CustomerID + ')>Preview</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="">' +
                    '<div class="row g-0">' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Nomor Handphone</p>' +
                    '<div class="badge badge-soft-primary font-size-12">' + NomorHP + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Email</p>' +
                    '<div class="badge badge-soft-primary font-size-12">' + EmailAddress + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Tenant</p>' +
                    '<h5 class="font-size-14 mb-0">' + Tenant + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Status</p>' +
                    '<div class="badge bg-' + color + ' font-size-12">' + Status + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div >'
                $('#DivCustomerSystem').append(resultUserNotification)

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
    var cmbTenant = $('#CmbTenant');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
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
function DeleteKlik(TrxID) {
    $("#modalagent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function LoadingCustomer() {
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivCustomerSystem').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                if (json[i].NA == "Y") {
                    var Status = "Active"
                    var color = "success"
                } else {
                    var Status = "Non Active"
                    var color = "danger"
                }
                if (json[i].Cabang == "" || json[i].Cabang == null) {
                    var Tenant = "-"
                } else {
                    var Tenant = json[i].Cabang
                }
                //var d = new Date(json[i].Birth);
                //var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                //var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                resultUserNotification = '<div class="card border shadow-none">' +
                    '<div class="card-body">' +
                    '<div class="d-flex">' +
                    '<div class="flex-grow-1 me-2 flex-wrap">' +
                    '<h5 class="font-size-15 mb-1"><a href="#" class="text-dark">' + json[i].Name + '</a></h5>' +
                    '<p class="text-muted mb-0">' + json[i].Alamat + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '<div class="d-flex gap-2">' +
                    '<div class="dropdown">' +
                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
                    '<i class="fa fas fa-ellipsis-h"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-end">' +
                    '<li><a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].CustomerID + ')>Edit</a></li>' +
                    '<li><a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].CustomerID + ')>Delete</a></li>' +
                    '<li>' +
                    '<hr class="dropdown-divider">' +
                    '</li>' +
                    '<li><a class="dropdown-item" href="#" onclick=PreviewKlik(' + json[i].CustomerID + ')>Preview</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="">' +
                    '<div class="row g-0">' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Nomor Handphone</p>' +
                    '<div class="badge badge-soft-primary font-size-12">' + NomorHP + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Email</p>' +
                    '<div class="badge badge-soft-primary font-size-12">' + EmailAddress + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Tenant</p>' +
                    '<h5 class="font-size-14 mb-0">' + Tenant + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xl-3 col-sm-6">' +
                    '<div class="border p-3 h-100">' +
                    '<div>' +
                    '<p class="text-muted font-size-13 mb-2">Status</p>' +
                    '<div class="badge bg-' + color + ' font-size-12">' + Status + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<p></p>' +
                    '</div >'
                $('#DivCustomerSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewKlik(TrxID) {
    $("#modalagent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function TambahUser() {
    $("#modalagent").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#Name").val("")
    $("#ComboGender").val("")
    $("#Birth").val("")
    $("#NIK").val("")
    $("#HP").val("")
    $("#Email").val("")
    CKEDITOR.instances.Alamat.setData("")
}
function TrmCustomer() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Birth);
                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].NA == "Y") {
                    var Status = "Aktif"
                } else {
                    var Status = "Non Aktif"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].CustomerID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].CustomerID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].CustomerID, json[i].Name, json[i].JenisKelamin, newDate + ' ' + newTime, json[i].HP, json[i].Email, urlclick]).draw(false);

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
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                //var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                //var getDateBirth = newDate.split('/');
                //$("#Birth").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                //$("#ComboGender").val(json[i].JenisKelamin)             
                //$("#Facebook").val(json[i].Facebook)
                //$("#Instagram").val(json[i].Instagram)
                //$("#Twitter").val(json[i].Twitter)

                $("#Name").val(json[i].Name)
                $("#NIK").val(json[i].NIK)
                $("#HP").val(json[i].HP)
                $("#Email").val(json[i].Email)
                $("#Alamat").val(json[i].Alamat)
                $("#CmbTenant").find("option:selected").text();
                $("#CmbTenant").val(json[i].CompID);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateKlik(TrxID) {
    $("#modalagent").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
