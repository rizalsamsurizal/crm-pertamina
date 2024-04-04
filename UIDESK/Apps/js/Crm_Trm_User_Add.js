$(document).ready(function () {
    $("#TxtSearchingUserName").val("")
    LoadingUser()
    //TrmTambahUser()
    cmbLevelUser()
    //cmbDepartment()
    //cmbGroupAgent()
    cmbSite()
    $("#Update").hide();
    $("#Delete").hide();
    $("#divChannel").hide();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
        }
    });
});
function LoadingUser() {
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK07'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {

                //if (json[i].LEVELUSER == "Layer 1" || json[i].LEVELUSER == "Layer 2") {
                //    var DataBorder = json[i].NamaGrup
                //    var color = "warning"
                //} else if (json[i].LEVELUSER == "Layer 3") {
                //    var DataBorder = json[i].ORGANIZATION_NAME
                //    var color = "primary"
                //} else {
                //    var DataBorder = json[i].EMAIL_ADDRESS
                //    var color = "success"
                //}
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].USERNAME + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + json[i].NAME + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].USERID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteKlik("' + json[i].USERID + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewKlik("' + json[i].USERID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + json[i].LEVELUSER + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].EMAIL_ADDRESS + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingUser(ParameterID) {
    if (ParameterID == '') {
        var jsonText = "UideskIndonesia";
    } else {
        var jsonText = ParameterID
    }
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK122'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {

                //if (json[i].LEVELUSER == "Layer 1" || json[i].LEVELUSER == "Layer 2") {
                //    var DataBorder = json[i].NamaGrup
                //    var color = "warning"
                //} else if (json[i].LEVELUSER == "Layer 3") {
                //    var DataBorder = json[i].ORGANIZATION_NAME
                //    var color = "primary"
                //} else {
                //    var DataBorder = json[i].EMAIL_ADDRESS
                //    var color = "success"
                //}
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].USERNAME + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + json[i].NAME + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].USERID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteKlik("' + json[i].USERID + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewKlik("' + json[i].USERID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + json[i].LEVELUSER+ '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].EMAIL_ADDRESS + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTambahUser() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK07'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>Aktif</span>"
                } else {
                    var Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Non Aktif</span>"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].USERID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-primary'><i class='fas fa-file-image' onclick=FormFoto('" + json[i].USERNAME + "') style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].LEVELUSER, json[i].EMAIL_ADDRESS, json[i].NamaGrup, json[i].ORGANIZATION_NAME, Status, urlclick]).draw(false);

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
function AddUser() {
    ClearObject()
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#modal-agent").modal('show');
}
function UpdateKlik(TrxID) {
    $("#modal-agent").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TrxUserName").attr("disabled", true);
    $("#TrxPassword").attr("disabled", true);
    TrmUserApplication($("#ContentPlaceHolder1_TrxID").val())
}
function DeleteKlik(TrxID) {
    $("#modal-agent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TrxUserName").attr("disabled", true);
    $("#TrxPassword").attr("disabled", true);
    TrmUserApplication($("#ContentPlaceHolder1_TrxID").val())
}
function PreviewKlik(TrxID) {
    $("#modal-agent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TrxUserName").attr("disabled", true);
    $("#TrxPassword").attr("disabled", true);
    TrmUserApplication($("#ContentPlaceHolder1_TrxID").val())
}
function cmbLevelUser() {
    var cmbLevelUser = $('#cmbLevelUser');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK01'}",
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
function cmbDepartment() {
    var cmbDepartment = $('#cmbDepartment');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK05'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultDepartment = "";

            cmbDepartment.empty();
            cmbDepartment.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultDepartment = '<option value="' + json[i].ORGANIZATION_ID + '">' + json[i].ORGANIZATION_NAME + '</option>';
                cmbDepartment.append(resultDepartment);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbGroupAgent() {
    var cmbGroupAgent = $('#cmbGroupAgent');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK06'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultGroupAgent = "";

            cmbGroupAgent.empty();
            cmbGroupAgent.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultGroupAgent = '<option value="' + json[i].IdGrup + '">' + json[i].NamaGrup + '</option>';
                cmbGroupAgent.append(resultGroupAgent);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbSite() {
    var ComboSite = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK108'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSite = "";

            ComboSite.empty();
            ComboSite.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultSite = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';
                ComboSite.append(resultSite);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function OnchangeCmbLevelUser() {
    var selectedText = $("#cmbLevelUser").find("option:selected").text();
    var selectedValue = $("#cmbLevelUser").val();
    if (selectedValue == 'Layer 1') {
        //$('#cmbDepartment').val("");
        $('#cmbDepartment').attr("disabled", true);
        $('#cmbGroupAgent').attr("disabled", false);
        $('#divChannel').css("display", "block");
    } else if (selectedValue == 'Layer 2') {
        //$("#cmbDepartment").find("option:selected").text("");
        //$("#cmbDepartment").val("");
        $('#cmbDepartment').attr("disabled", true);
        $('#cmbGroupAgent').attr("disabled", false);
        $('#divChannel').css("display", "none");
    } else if (selectedValue == 'Layer 3') {
        //alert(selectedValue)
        //alert($("#cmbGroupAgent").val())
        //$("#cmbGroupAgent").find("option:selected").text("");
        //$("#cmbGroupAgent").val("");
        $('#cmbGroupAgent').attr("disabled", true);
        $('#cmbDepartment').attr("disabled", false);
        $('#divChannel').css("display", "none");
    } else if (selectedValue == 'Supervisor') {
        $('#cmbDepartment').attr("disabled", false);
        $('#cmbGroupAgent').attr("disabled", true);
        $('#divChannel').css("display", "none");
    }
    else {
        $('#cmbGroupAgent').attr("disabled", true);
        $('#cmbDepartment').attr("disabled", true);
        $('#divChannel').css("display", "none");
    }
}
function EmailCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDEmail").val("1")
    } else {
        $("#ContentPlaceHolder1_HDEmail").val("0")
    }
};
function WhatsAppCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDWA").val("1")
    } else {
        $("#ContentPlaceHolder1_HDWA").val("0")
    }
};
function InboundCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDInbound").val("1")
    } else {
        $("#ContentPlaceHolder1_HDInbound").val("0")
    }
};
function OutboundCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDOutbound").val("1")
    } else {
        $("#ContentPlaceHolder1_HDOutbound").val("0")
    }
};
function InstagramCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDInstagram").val("1")
    } else {
        $("#ContentPlaceHolder1_HDInstagram").val("0")
    }
};
function FacebookCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDFacebook").val("1")
    } else {
        $("#ContentPlaceHolder1_HDFacebook").val("0")
    }
};
function TwitterCheck(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HDTwitter").val("1")
    } else {
        $("#ContentPlaceHolder1_HDTwitter").val("0")
    }
};
function TrmUserApplication(TrxUserID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxUserID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK08'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultGroupAgent = "";

            for (i = 0; i < json.length; i++) {
                $("#TrxUserName").val(json[i].USERNAME);
                $("#TrxName").val(json[i].NAME);
                $("#TrxEmail").val(json[i].EMAIL_ADDRESS);
                $("#TrxPassword").val(json[i].PASSWORD);
                //$("#cmbLevelUser option:selected").text(json[i].LEVELUSER);
                $("#cmbLevelUser").find("option:selected").text();
                $("#cmbLevelUser").val(json[i].LEVELUSER);
                //$('#cmbLevelUser').attr('disabled', false);
                $("#cmbStatus").find("option:selected").text();
                $("#cmbStatus").val(json[i].NA);
                $("#cmbDepartment option:selected").text(json[i].ORGANIZATION_NAME);
                $('#cmbDepartment').attr('disabled', true);
                $("#cmbGroupAgent option:selected").text(json[i].NamaGrup);
                $('#cmbGroupAgent').attr('disabled', true);
                $("#cmbGroupAgent").val(json[i].UNITKERJA);
                $("#ComboSite option:selected").text(json[i].Site);
                CKEDITOR.instances.TrxDescription.setData(json[i].Description)

                if (json[i].EMAIL == '1') {
                    $("#checkboxEmail").prop('checked', true);
                    $("#ContentPlaceHolder1_HDEmail").val("1");
                } else {
                    $("#checkboxEmail").prop('checked', false);
                    $("#ContentPlaceHolder1_HDEmail").val("0");
                }
                if (json[i].WHATSAPP == '1') {
                    $("#checkboxWA").prop('checked', true);
                    $("#ContentPlaceHolder1_HDWA").val("1");
                } else {
                    $("#checkboxWA").prop('checked', false);
                    $("#ContentPlaceHolder1_HDWA").val("0");
                }
                if (json[i].INBOUND == '1') {
                    $("#checkboxInbound").prop('checked', true);
                    $("#ContentPlaceHolder1_HDInbound").val("1");
                } else {
                    $("#checkboxInbound").prop('checked', false);
                    $("#ContentPlaceHolder1_HDInbound").val("0");
                }
                if (json[i].OUTBOUND == '1') {
                    $("#checkboxOutbound").prop('checked', true);
                    $("#ContentPlaceHolder1_HDOutbound").val("1");
                } else {
                    $("#checkboxOutbound").prop('checked', false);
                    $("#ContentPlaceHolder1_HDOutbound").val("0");
                }
                if (json[i].INSTAGRAM == '1') {
                    $("#checkboxInstagram").prop('checked', true);
                    $("#ContentPlaceHolder1_HDInstagram").val("1");
                } else {
                    $("#checkboxInstagram").prop('checked', false);
                    $("#ContentPlaceHolder1_HDInstagram").val("0");
                }
                if (json[i].FACEBOOK == '1') {
                    $("#checkboxFacebook").prop('checked', true);
                    $("#ContentPlaceHolder1_HDFacebook").val("1");
                } else {
                    $("#checkboxFacebook").prop('checked', false);
                    $("#ContentPlaceHolder1_HDFacebook").val("0");
                }
                if (json[i].TWITTER == '1') {
                    $("#checkboxTwitter").prop('checked', true);
                    $("#ContentPlaceHolder1_HDTwitter").val("1");
                } else {
                    $("#checkboxTwitter").prop('checked', false);
                    $("#ContentPlaceHolder1_HDTwitter").val("0");
                }
                if (json[i].LEVELUSER == "Layer 1") {
                    $("#divChannel").show();
                    $('#cmbGroupAgent').attr('disabled', false);
                    $('#cmbDepartment').attr('disabled', true);
                }
                else if (json[i].LEVELUSER == "Layer 2") {
                    $('#cmbGroupAgent').attr('disabled', false);
                    $('#cmbDepartment').attr('disabled', true);
                    $("#divChannel").hide();
                }
                else if (json[i].LEVELUSER == "Layer 3") {
                    $('#cmbGroupAgent').attr('disabled', true);
                    $('#cmbDepartment').attr('disabled', false);
                    $("#divChannel").hide();
                }
                else if (json[i].LEVELUSER == "Supervisor") {
                    $('#cmbGroupAgent').attr('disabled', true);
                    $('#cmbDepartment').attr('disabled', false);
                    $("#divChannel").hide();
                }
                else if (json[i].LEVELUSER == "Administrator") {
                    $('#cmbGroupAgent').attr('disabled', true);
                    $('#cmbDepartment').attr('disabled', true);
                    $("#divChannel").hide();
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
function ActionSimpan() {
    var CmbLevelUserText = $("#cmbLevelUser").find("option:selected").text();
    var CmbLevelUserValue = $("#cmbLevelUser").val();
    //var cmbDepartmentText = $("#cmbDepartment").find("option:selected").text();
    //var cmbDepartmentValue = $("#cmbDepartment").val();
    //var cmbGroupAgentText = $("#cmbGroupAgent").find("option:selected").text();
    //var cmbGroupAgentValue = $("#cmbGroupAgent").val();
    var cmbComboSiteText = $("#ComboSite").find("option:selected").text();
    var cmbComboSiteValue = $("#ComboSite").val();
    var cmbStatusText = $("#cmbStatus").find("option:selected").text();
    var cmbStatusValue = $("#cmbStatus").val();
    var TrxDescription = $("#TrxDescription").val();

    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test($("#TrxUserName").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}  
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test($("#TrxName").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    if ($("#TrxName").val() == '') {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxUserName").val() == '') {
        swal(
            '',
            'User Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxEmail").val() != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ($("#TrxEmail").val().match(mailformat)) {
        }else {
            swal(
                '',
                'Format email address not valid',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    } else {
        swal(
            '',
            'Email is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxPassword").val() != '') {
        var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if ($("#TrxPassword").val().match(passwordformat)) {

        } else {
            swal(
                '',
                'Format password is not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    } else {
        swal(
            '',
            'password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    if (CmbLevelUserValue == '') {
        swal(
            '',
            'Level User is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxDescription == '') {
        swal(
            '',
            'Description is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //else {
    //    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    //    if (regex.test(TrxDescription)) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    if (cmbComboSiteValue == '') {
        swal(
            '',
            'Site is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (cmbStatus == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxChannelEmail = $("#ContentPlaceHolder1_HDEmail").val();
    //var TrxChannelWA = $("#ContentPlaceHolder1_HDWA").val();
    //var TrxChannelInbound = $("#ContentPlaceHolder1_HDInbound").val();
    //var TrxChannelOutbound = $("#ContentPlaceHolder1_HDOutbound").val();
    //var TrxChannelInstagram = $("#ContentPlaceHolder1_HDInstagram").val();
    //var TrxChannelFacebook = $("#ContentPlaceHolder1_HDFacebook").val();
    //var TrxChannelTwitter = $("#ContentPlaceHolder1_HDTwitter").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxUserName: $("#TrxUserName").val(), TrxName: $("#TrxName").val(), TrxEmail: $("#TrxEmail").val(), TrxPassword: $("#TrxPassword").val(), TrxLevelUser: CmbLevelUserText,
                    TrxSite: cmbComboSiteValue, TrxDescription: TrxDescription, TrxStatus: cmbStatusValue, TrxUserCreate: $("#hd_sessionLogin").val()
                    //TrxChannelEmail: TrxChannelEmail, TrxChannelWA: TrxChannelWA, TrxChannelInbound: TrxChannelInbound, TrxChannelOutbound: TrxChannelOutbound, TrxChannelInstagram: TrxChannelInstagram,
                    //TrxChannelFacebook: TrxChannelFacebook, TrxChannelTwitter: TrxChannelTwitter
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionUserApplication",
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
                                    $("#modal-agent").modal('hide');
                                    window.location = "Crm_Trm_User_Add.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#modal-agent").modal('hide');
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
function ActionUpdate() {
    var CmbLevelUserText = $("#cmbLevelUser").find("option:selected").text();
    var CmbLevelUserValue = $("#cmbLevelUser").val();
    //var cmbDepartmentText = $("#cmbDepartment").find("option:selected").text();
    //var cmbDepartmentValue = $("#cmbDepartment").val();
    //var cmbGroupAgentText = $("#cmbGroupAgent").find("option:selected").text();
    //var cmbGroupAgentValue = $("#cmbGroupAgent").val();
    var cmbStatusText = $("#cmbStatus").find("option:selected").text();
    var cmbStatusValue = $("#cmbStatus").val();
    if ($("#TrxEmail").val() != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ($("#TrxEmail").val().match(mailformat)) {

        }
        else {
            swal(
                '',
                'Format email address not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if (CmbLevelUserValue == '') {
        swal(
            '',
            'Level User is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //else {
    //    if ($("#cmbLevelUser").val() == 'layer1') {
    //        if (cmbGroupAgentValue == '') {
    //            swal("Group Agent is empty")
    //            return false;
    //        }
    //    } else if ($("#cmbLevelUser").val() == 'layer2') {
    //        if (cmbGroupAgentValue == '') {
    //            swal("Group Agent is empty")
    //            return false;
    //        } else {
    //            var cmbDepartmentValue = "0";
    //        }
    //    } else if ($("#cmbLevelUser").val() == 'layer3') {
    //        if (cmbDepartmentValue == '') {
    //            swal("Department is empty")
    //            return false;
    //        } else {
    //            var cmbGroupAgentValue = "0";
    //        }
    //    } else {

    //    }
    //}

    //var TrxChannelEmail = $("#ContentPlaceHolder1_HDEmail").val();
    //var TrxChannelWA = $("#ContentPlaceHolder1_HDWA").val();
    //var TrxChannelInbound = $("#ContentPlaceHolder1_HDInbound").val();
    //var TrxChannelOutbound = $("#ContentPlaceHolder1_HDOutbound").val();
    //var TrxChannelInstagram = $("#ContentPlaceHolder1_HDInstagram").val();
    //var TrxChannelFacebook = $("#ContentPlaceHolder1_HDFacebook").val();
    //var TrxChannelTwitter = $("#ContentPlaceHolder1_HDTwitter").val();
    //var TrxDescription = CKEDITOR.instances.TrxDescription.getData();

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(),
                    TrxUserName: $("#TrxUserName").val(), TrxName: $("#TrxName").val(), TrxEmail: $("#TrxEmail").val(), TrxPassword: $("#TrxPassword").val(), TrxLevelUser: CmbLevelUserText,
                    TrxDescription: TrxDescription, TrxStatus: cmbStatusValue, TrxUserCreate: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionUserApplication",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-agent").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#modal-agent").modal('hide');
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
function ActionDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionUserApplication",
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
                                    $("#modal-agent").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#modal-agent").modal('hide');
                                });
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
    $("#divChannel").hide();
    $("#TrxUserName").val("");
    $("#TrxUserName").attr("disabled", false);
    $("#TrxName").val("");
    $("#TrxName").attr("disabled", false);
    $("#TrxEmail").val("");
    $("#TrxEmail").attr("disabled", false);
    $("#TrxPassword").val("");
    $("#TrxPassword").attr("disabled", false);
    $("#TrxDescription").val("");
    $("#TrxDescription").attr("disabled", false);
    $("#cmbLevelUser").val("")
    $("#cmbDepartment").val("")
    $("#cmbGroupAgent").val("")
    $("#ComboSite").val("")
    $("#cmbStatus").val("")
}
function FormFoto(USERNAME) {
    $("#ContentPlaceHolder1_TrxID").val(USERNAME);
    $("#addContactModal").modal('show');
    TrmFotoSelected()
}
function TrmFotoSelected() {
    $("#ValueName").empty();
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK69'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                for (i = 0; i < json.length; i++) {
                    $('#ImageFotoNya').attr('src', "../FileFoto/" + json[i].URL + "");
                    //$("#ValueName").append(json[i].Name);
                    //$('#ImageFoto').attr('src', '../images/card/img3.jpg');

                }
            } else {
                $('#ImageFotoNya').attr('src', '../images/card/1.jpg');
                //$("#ValueName").append($("#ContentPlaceHolder1_TrxID").val());
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
$('#filesfoto').change(function () {
    var filename = $('#filesfoto').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesfoto']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 2) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("UserName", $("#ContentPlaceHolder1_TrxID").val());
        data.append("UserCreate", $("#hd_sessionLogin").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmUserManagement.asmx/UploadFoto",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            //$("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

            swal(
                '',
                'Upload Foto Has Beeen Success',
                'success'
            ).then(function () {
                $(this).val('');
                $("#ValueName").append("");
                TrmFotoSelected()
            });

            //var TrxMessage = 'Your file has been upload'
            //AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
            //PreviewAttachmentInteraction(getParameterByName("headerid"));

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
