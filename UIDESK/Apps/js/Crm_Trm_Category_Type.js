$(document).ready(function () {
    DropdwonDataTenant();
    //DropdwonMainCategory();
    //ComboCategory();
    DataTableSubCategory();
    $("#Update").hide();
    $("#Delete").hide();
});
function ActionSimpan() {
    var TrxName = $("#TxtCategoryTypeName").val();
    var selectedValue = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    if (selectedValue == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxStatus == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxName == '') {
        swal(
            '',
            'Category type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            console.log(TrxName)
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    console.log("action_simpan " + $("#cmbTenant").val() + "-" + $("#CmbMainCategory").val() + "-" + $("#cmbCategory").val() + "-" + TrxName + "-" + TrxStatus + "-" + $("#hd_sessionLogin").val())
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
                    TenantID: $("#cmbTenant").val(), MainCategoryID: $("#CmbMainCategory").val(), TrxCategoryID: $("#cmbCategory").val(),
                    TrxName: TrxName, TrxStatus: TrxStatus, TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/Crm_Trm_Category_Type.asmx/InsertTransactionTrmCategoryType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx?";
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
}
function ActionUpdate() {
    var TenantID = $("#ContentPlaceHolder1_Hd_CmbTenantID").val();
    var MainCategoryID = $("#ContentPlaceHolder1_Hd_MainCategoryID").val();
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    var TrxName = $("#TxtCategoryTypeName").val();
    if (TrxName != '') {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            console.log(TrxName)
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    console.log("action_update " + $("#ContentPlaceHolder1_TrxID").val() + "-" + TenantID + "-" + MainCategoryID + "-" + TrxCmbCategory + "-" + TrxName + "-" + TrxCmbStatus + "-" + $("#hd_sessionLogin").val())
    //return false
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
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TenantID: TenantID, MainCategoryID: MainCategoryID, TrxCategoryID: TrxCmbCategory, TrxName: TrxName,
                    TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/Crm_Trm_Category_Type.asmx/UpdateTransactionTrmCategoryType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    return false
                                });
                                return false
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
function ComboCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategorySource.empty();
            cmbCategorySource.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategorySource.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChangeFilterMainCategory() {
    var selectedText = $("#cmbTenant").find("option:selected").text();
    var selectedValue = $("#cmbTenant").val();
    $("#ContentPlaceHolder1_Hd_CmbTenantID").val(selectedValue)
    var CmbMainCategory = $('#CmbMainCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK151'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultMainCategory = "";

            CmbMainCategory.empty();
            CmbMainCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMainCategory = '<option value="' + json[i].ID + '">' + json[i].MainCategory + '</option>';
                CmbMainCategory.append(resultMainCategory);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChangeFilterCategory() {
    var selectedText = $("#CmbMainCategory").find("option:selected").text();
    var selectedValue = $("#CmbMainCategory").val();
    $("#ContentPlaceHolder1_Hd_MainCategoryID").val(selectedValue)
    var cmbCategory = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK154'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategory = "";

            cmbCategory.empty();
            cmbCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategory.append(resultCategory);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ClearObject() {
    //$("#cmbCategory").val("");
    //$('#cmbCategory').text("");
    $('#TxtCategoryTypeName').val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategory").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("");
}
function checkInput(string) {
    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    if (regex.test(string)) {
        return string;
    } else {
        console.log(string)
        swal(
            '',
            'Data has been block',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
}
function DataTableSubCategory() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/TableTransactionTrmCategoryType",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
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
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].NamaGrup, json[i].MainCategory, json[i].CategoryName, json[i].SubName, Status, urlclick]).draw(false);

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
        url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
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
function DropdwonMainCategory() {
    var CmbMainCategory = $('#CmbMainCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK152'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultMainCategory = "";

            CmbMainCategory.empty();
            CmbMainCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMainCategory = '<option value="' + json[i].ID + '">' + json[i].MainCategory + '</option>';
                CmbMainCategory.append(resultMainCategory);


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
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryType()
}
function getWS_cmbCategory(value) {
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue)
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function TrmSelectCategoryType() {
    var CmbMainCategory = $('#CmbMainCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK152-A'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultMainCategory = "";

            CmbMainCategory.empty();
            CmbMainCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMainCategory = '<option value="' + json[i].ID + '">' + json[i].MainCategory + '</option>';
                CmbMainCategory.append(resultMainCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Type.asmx/SelectedTransactionTrmCategoryType",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            //for (i = 0; i < json.length; i++) {
            //    //alert(json[i].CategoryID)
            //    //$('#cmbCategory option:selected').text(json[i].CategoryName);
            //    $("#cmbCategory").find("option:selected").text();
            //    $("#cmbCategory").val(json[i].CategoryID);
            //    $('#TxtCategoryTypeName').val(json[i].SubName);
            //    $("#cmbStatus").val(json[i].NA);
            //    $("#cmbTenant").find("option:selected").text();
            //    $("#cmbTenant").val(json[i].TenantID);
            //    $("#CmbMainCategory").find("option:selected").text();
            //    $("#CmbMainCategory").val(json[i].MainCategoryID);
            //    $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
            //    $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);                           
            //}

            json.forEach(async (item) => {

                console.log(item)
                let cmbCategorySource = $('#cmbCategory');
                await $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trm_Category_Type.asmx/UIDESK_TrmMasterCombo",
                    data: "{TrxID:'" + item.MainCategoryID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK152-B'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var j = "";


                        cmbCategorySource.empty();
                        cmbCategorySource.append('<option value="">Select</option>');
                        for (j = 0; j < json.length; j++) {

                            resultCategory = '<option value="' + json[j].CategoryID + '">' + json[j].Name + '</option>';
                            cmbCategorySource.append(resultCategory);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
                //alert(json[i].CategoryID)
                //$('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategory").find("option:selected").text();
                $("#cmbCategory").val(item.CategoryID);
                $('#TxtCategoryTypeName').val(item.SubName);
                $("#cmbStatus").val(item.NA);
                $("#cmbTenant").find("option:selected").text();
                $("#cmbTenant").val(item.TenantID);
                $("#CmbMainCategory").find("option:selected").text();
                $("#CmbMainCategory").val(item.MainCategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategory").val(item.CategoryID);
                $("#ContentPlaceHolder1_Hd_Status").val(item.NA);
                $("#ContentPlaceHolder1_Hd_CmbTenantID").val(item.TenantID);
                $("#ContentPlaceHolder1_Hd_MainCategoryID").val(item.MainCategoryID);
            })

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    //ComboCategory();
    ClearObject()
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryType()
}


