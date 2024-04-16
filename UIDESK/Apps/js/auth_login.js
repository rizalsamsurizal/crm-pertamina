$(document).ready(function () {
    var ParameterLogin = getParameterByName("username")
    if (ParameterLogin != "") {
        ValidasiLogin(ParameterLogin)
    }
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function ValidasiLogin(ParameterLogin) {
    if (ParameterLogin == null || ParameterLogin == "") {
        swal(
            '',
            'User is empty',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        $.ajax({
            url: "apps/WebServiceGetDataMaster.asmx/LoginApplikasi",
            data: "{UserName:'" + ParameterLogin +"'}",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x = "";
                if (json.length == 0) {                   
                    swal(
                        '',
                        'User Not Found',
                        'error'
                    ).then(function () {
                        return false;
                    });
                    return false;
                } else {
                    //alert("0")
                    window.location.href = "apps/Crm_Trx_Ticket.aspx?val=" + getParameterByName("val") + "&tenantid=" + getParameterByName("tenantid") + "";
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
}