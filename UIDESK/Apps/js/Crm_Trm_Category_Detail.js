$(document).ready(function () {
    DropdwonDataTenant();
    //ComboCategory();
    DataTableDetailSubCategory();
    $("#Update").hide();
    $("#Delete").hide();
});
function DataTableDetailSubCategory() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/TableTransactionTrmCategoryDetail",
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
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].NamaGrup, json[i].MainCategory, json[i].CategoryName, json[i].CategoryType, json[i].SubName, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryDetail() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/SelectedTransactionTrmCategoryDetail",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#cmbTenant").find("option:selected").text();
                $("#cmbTenant").val(json[i].TenantID);
                $('#CmbMainCategory option:selected').text(json[i].MainCategory);
                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategoryType option:selected").text(json[i].CategoryType);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus option:selected").text(json[i].Status);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/UIDESK_TrmDropdown",
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
function cmbCategoryChange() {
    var JenisKondisi = "AllWhereData";
    var cmbCategoryType = $('#cmbCategoryType');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategoryType(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    ClearObject()
    ComboCategory()
    cmbCategoryChange()
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryDetail()
}
function ActionSimpan() {
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    if ($("#cmbTenant").val() == '') {
        swal(
            '',
            'Tenant is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbMainCategory").val() == '') {
        swal(
            '',
            'Main Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbCategory == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbCategoryType == '') {
        swal(
            '',
            'Sub Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbStatus == '') {
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
            'Detail Sub Category is empty',
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TenantID: $("#cmbTenant").val(), MainCategoryID: $("#CmbMainCategory").val(), TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxName: TrxName,
                    TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/Crm_Trm_Category_Detail.asmx/InsertTransactionTrmCategoryDetail",
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
                                    $("#addContactModalLabel").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Detail.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    return false
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
    var TrxName = $('#TxtCategoryTypeName').val();
    if (TrxName != '') {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
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
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/Crm_Trm_Category_Detail.asmx/UpdateTransactionTrmCategoryDetail",
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
                                    $("#addContactModalLabel").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Detail.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    return false
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
function ClearObject() {
    $("#TxtCategoryTypeName").val("");
    $("#cmbCategory").val("")
    $("#cmbCategoryType").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategory").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("")
    $("#cmbStatus").val("");
}
function DropdwonDataTenant() {
    var cmbTenant = $('#cmbTenant');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/UIDESK_TrmMasterCombo",
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
function ChangeFilterMainCategory() {
    var selectedText = $("#cmbTenant").find("option:selected").text();
    var selectedValue = $("#cmbTenant").val();
    var CmbMainCategory = $('#CmbMainCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/UIDESK_TrmMasterCombo",
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
    var cmbCategory = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/UIDESK_TrmMasterCombo",
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
function ChangeFilterSubCategory() {
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);
    var cmbCategoryType = $('#cmbCategoryType');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Category_Detail.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK155'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}