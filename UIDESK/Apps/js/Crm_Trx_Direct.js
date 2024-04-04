$(document).ready(function () {
    AutoInsertThread();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function AutoInsertThread() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = getParameterByName("phone");
    var TrxCallID = getParameterByName("callid");
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty, please relogin',
            'info'
        ).then(function () {
            window.location.href = "../auth_login.aspx?idpage=3028.aspx"
        });
    }
    if (getParameterByName("phone") == "") {
        swal(
            '',
            'Phone number is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxNumberid = "Call-" + getParameterByName("callid");
    var TrxThreadID = "-";
    var TrxChannel = "Call";
    var TrxAccount = getParameterByName("phone");
    var TrxSubject = "-";
    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxNumberid: TrxNumberid, TrxThreadID: TrxThreadID, TrxChannel: TrxChannel, TrxAccount: TrxAccount, TrxSubject: TrxCustomerID, TrxDescription: TrxSubject, callid: TrxCallID });
    $.ajax({
        url: "WebServiceTransaction.asmx/InsertTransactionThread",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {
                if (json[i].Result == "True") {
                    window.location.href = "Crm_Trx_Ticket.aspx?id=" + json[i].TrxGenerateCustomerID + "&channel=" + TrxChannel + "&n=1&threadid=" + json[i].TrxGenerateThreadID + "&numberid=" + json[i].TrxGenerateNumberID + "&account=" + getParameterByName("phone") + ""
                } else {
                    swal(
                        '',
                        'Caller ID already exits',
                        'info'
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