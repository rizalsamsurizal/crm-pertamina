$(document).ready(function () {
   /*alert("11")*/
});
function ModalChangePassword() {
    $("#ContactModalPassword").modal('show');
}
function ActionSubmit() {
    if ($("#hd_sessionLogin").val() == '') {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangePassword").val() == '') {
        swal(
            '',
            'Password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangeNewPassword").val() == '') {
        swal(
            '',
            'New password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if ($("#ChangeNewPassword").val().match(passwordformat)) {
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
    }
    if ($("#ChangeNewPassword").val() != $("#ChangeConfirmPassword").val()) {
        swal(
            '',
            'New password is not match',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangeConfirmPassword").val() == '') {
        swal(
            '',
            'Confirm password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if ($("#ChangeConfirmPassword").val().match(passwordformat)) {
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
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxPassword: $("#ChangePassword").val(), TrxNewPassword: $("#ChangeNewPassword").val(), TrxUserCreated: $("#hd_sessionLogin").val() });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_ChangePassword.asmx/ChangePassword",
                    data: form_data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result === 'True') {
                                swal(
                                    '',
                                    'Change Password Success',
                                    'success'
                                ).then(function () {
                                    $("#ChangePassword").val("");
                                    $("#ChangeNewPassword").val("")
                                    $("#ChangeConfirmPassword").val("")
                                    location.href = "../auth_login.aspx";
                                });

                            } else {
                                swal(
                                    '',
                                    'Change Password Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ContactModalPassword").modal('hide')
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
                });

            }
        });
}
function EyePassword() {
    var temp = document.getElementById("ChangePassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
function EyeNewPassword() {
    var temp = document.getElementById("ChangeNewPassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
function EyeConfirmPassword() {
    var temp = document.getElementById("ChangeConfirmPassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
