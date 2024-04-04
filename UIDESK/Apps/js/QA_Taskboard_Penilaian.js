$(document).ready(function () {
    TrmHeaderCounting();
    if ($("#QM_LevelUser").val() == "Supervisor_QA") {
        $("#BoxCheck").show()
        TrmTabelTransactionChecked()
        if (getParameterByName("status") == "Finnished") {
            $("#ProcessApproved").hide()
        } else {
            $("#ProcessApproved").show()
        }
    } else {
        $("#BoxCheck").hide()
        $("#ProcessApproved").hide()
        TrmTabelTransaction();
    }
});
function TrmHeaderCounting() {
    var QM_UserName = $("#hd_sessionLogin").val();
    var QM_TypeUser = $("#HD_UserType").val();
    var QM_LevelUser = $("#QM_LevelUser").val();
    var QM_GroupQA = $("#QM_GroupQA").val();
    var QM_GroupAgent = $("#QM_GroupAgent").val();
    var Div_HeaderCounting = $('#Div_HeaderCounting');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderCounting",
        data: "{QM_UserName: '" + QM_UserName + "',QM_TypeUser: '" + QM_TypeUser + "',QM_LevelUser: '" + QM_LevelUser + "',QM_GroupQA: '" + QM_GroupQA + "',QM_GroupAgent: '" + QM_GroupAgent + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            Div_HeaderCounting.empty();

            for (i = 0; i < json.length; i++) {
                //result = '<div class="col-12 col-lg-2">' +
                //    '<a  href ="Qc_List.aspx?status=' + json[i].HeaderName + '" >' +
                //    '<div class="box-body br-1 border-light">' +
                //    '<div class="flexbox mb-1">' +
                //    '<span>' +
                //    '' + json[i].Icon + '' +
                //    '<br>' +
                //    '' + json[i].HeaderName + '' +
                //    '</span>' +
                //    '<span class="text-' + json[i].Color + ' font-size-30">' + json[i].DataHeader + '</span>' +
                //    '</div>' +
                //    '<div class="progress progress-xxs mt-10 mb-0">' +
                //    '<div class="progress-bar bg-' + json[i].Color + '" role="progressbar" style="width: 50%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                //    '</div>' +
                //    '</div>' +
                //    '</a>' +
                //    '</div>'

                result = '<div class="col-xl-3 col-sm-6" style="cursor:pointer;"> ' +
                    '<a class="box box-link-shadow text-left" href="QA_Taskboard_Penilaian.aspx?status=' + json[i].HeaderName + '&mid=' + getParameterByName("mid") + '&smid=' + getParameterByName("smid") + '"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-left">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-soft-' + json[i].Color + ' text-' + json[i].Color + ' rounded-circle font-size-18">' +
                    '<i class="uil uil-list-ul"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + json[i].HeaderName + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].DataHeader + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a> ' +
                    '</div>'

                Div_HeaderCounting.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTabelTransaction() {
    var jsonText = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxLevelUser: $("#QM_LevelUser").val(), TrxStatus: getParameterByName("status") });
    var myTable = $('#TrmTransaction').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderTransaction",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var d = new Date(json[i].OLA);
                //var milisegundos = parseInt(json[i].OLA.replace("/Date(", "").replace(")/", ""));
                //var DateTimeStart_OLA1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_OLA2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].qa_type == "QM1") {
                    //$("#HeaderTableName").html("Nama Nasabah")
                    var RowName = json[i].nama_nasabah
                } else {
                    //$("#HeaderTableName").html("Nama Pekerja");
                    var RowName = json[i].nama_pekerja
                }
                if ($("#QM_LevelUser").val() == "QA") {
                    if (json[i].status_data == "Draft" || json[i].status_data == "Return") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_QA") {
                    if (json[i].status_data == "Pending Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Agent") {
                    if (json[i].status_data == "Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Agent_Leader") {
                    if (json[i].status_data == "Refute") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Admin_Release") {
                    if (json[i].status_data == "Finnished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else {
                    var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&view=0'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                }

                //if (json[i].UsedDaySLA == "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-warning' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA > "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA < "0" ) {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-danger' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //}
                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    "" + UrlFollowup + "" +
                //    "</div>" +
                //    "</div>"

                var urlClick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" ' + Access +'><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '' + UrlFollowup + '' +
                    '</div> ' +
                    '</div> '

                if (json[i].status_data == "Draft") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Pending Approved") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Approved") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Refute") {
                    var Status = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Return") {
                    var Status = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Finnished") {
                    var Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].status_data + "</span>"
                }

                //if (json[i].channel == 'Call') {
                //    var icon = "mdi mdi-phone";
                //    var color = "primary";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Video Banking Assistant') {
                //    var icon = "mdi mdi-camera";
                //    var color = "danger";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Instagram') {
                //    var icon = "mdi mdi-instagram";
                //    var color = "success";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else {
                //    var icon = "mdi mdi-record";
                //    var color = "warning";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //}
                ////if (json[i].OLA == null) {
                ////    var DaysOLA = "0 Days"
                ////} else if (json[i].OLA >= 0) {
                ////    var DaysOLA = json[i].OLA + " Days "
                ////} else {
                ////    var DaysOLA =  json[i].OLA + " Days"
                ////}
                if ($("#QM_LevelUser").val() == "Administrator" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Agent_Leader" || $("#QM_LevelUser").val() == "Supervisor_Agent") {
                    var AgentName = json[i].AgentName
                } else {
                    var AgentName = "********"
                }
                if (json[i].summary_bobot == 0 || json[i].summary_bobot == null || json[i].summary_bobot == "0") {
                    var Performance = "0"
                } else {
                    var Performance = json[i].summary_bobot
                }

                var d = new Date(json[i].created_date);
                //var milisegundos = parseInt(json[i].created_date.replace("/Date(", "").replace(")/", ""));
                var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");
                //console.log("1" + json[i].created_date)
                //console.log("Header ID : " + json[i].header_id + " Date : " + DateTimeStart_1 + ' ' + DateTimeStart_2)

                //if (getParameterByName("checked") == "1") {
                //    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" checked>' +
                //        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                //} else {
                //    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" >' +
                //        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                //}              
                ////myTable.row.add([url, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, ColorSLA, DaysOLA, urlClick]).draw(false);
                myTable.row.add([json[i].ID, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].AgentSkil, json[i].qa_type, Status, Performance, DateTimeStart_1 + ' ' + DateTimeStart_2, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTabelTransactionChecked() {
    var jsonText = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxLevelUser: $("#QM_LevelUser").val(), TrxStatus: getParameterByName("status") });
    var myTable = $('#TrmTransaction').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderTransaction",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;


            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var d = new Date(json[i].OLA);
                //var milisegundos = parseInt(json[i].OLA.replace("/Date(", "").replace(")/", ""));
                //var DateTimeStart_OLA1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_OLA2 = new Date(milisegundos).toLocaleTimeString("en-UE");


                if (json[i].qa_type == "QM1") {
                    $("#HeaderTableName").html("Nama Nasabah")
                    var RowName = json[i].nama_nasabah
                } else {
                    $("#HeaderTableName").html("Nama Pekerja");
                    var RowName = json[i].nama_pekerja
                }
                if ($("#QM_LevelUser").val() == "QA") {
                    if (json[i].status_data == "Draft" || json[i].status_data == "Return") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_QA") {
                    if (json[i].status_data == "Pending Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Agent") {
                    if (json[i].status_data == "Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Agent_Leader") {
                    if (json[i].status_data == "Refute") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Admin_Release") {
                    if (json[i].status_data == "Finnished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else {
                    var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&view=0'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                }

                //if (json[i].UsedDaySLA == "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-warning' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA > "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA < "0" ) {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-danger' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //}
                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "" + UrlFollowup + "" +
                    "</div>" +
                    "</div>"

                if (json[i].status_data == "Draft") {
                    var Status = "<span class='badge badge-pill badge-success' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Pending Approved") {
                    var Status = "<span class='badge badge-pill badge-info ' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Approved") {
                    var Status = "<span class='badge badge-pill badge-primary' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Refute") {
                    var Status = "<span class='badge badge-pill badge-warning' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Return") {
                    var Status = "<span class='badge badge-pill badge-primary' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Finnished") {
                    var Status = "<span class='badge badge-pill badge-danger' style='width: 100%;'>" + json[i].status_data + "</span>"
                }

                //if (json[i].channel == 'Call') {
                //    var icon = "mdi mdi-phone";
                //    var color = "primary";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Video Banking Assistant') {
                //    var icon = "mdi mdi-camera";
                //    var color = "danger";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Instagram') {
                //    var icon = "mdi mdi-instagram";
                //    var color = "success";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else {
                //    var icon = "mdi mdi-record";
                //    var color = "warning";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //}
                ////if (json[i].OLA == null) {
                ////    var DaysOLA = "0 Days"
                ////} else if (json[i].OLA >= 0) {
                ////    var DaysOLA = json[i].OLA + " Days "
                ////} else {
                ////    var DaysOLA =  json[i].OLA + " Days"
                ////}
                if ($("#QM_LevelUser").val() == "Administrator" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Agent_Leader" || $("#QM_LevelUser").val() == "Supervisor_Agent") {
                    var AgentName = json[i].AgentName
                } else {
                    var AgentName = "********"
                }
                if (json[i].summary_bobot == 0 || json[i].summary_bobot == null || json[i].summary_bobot == "0") {
                    var Performance = "0"
                } else {
                    var Performance = json[i].summary_bobot
                }

                var d = new Date(json[i].created_date);
                //var milisegundos = parseInt(json[i].created_date.replace("/Date(", "").replace(")/", ""));
                var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");
                //console.log("1" + json[i].created_date)
                //console.log("Header ID : " + json[i].header_id + " Date : " + DateTimeStart_1 + ' ' + DateTimeStart_2)

                //if (getParameterByName("checked") == "1") {
                if ($("#ContentPlaceHolder1_TrxChecked").val() == "1") {
                    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" checked>' +
                        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                } else {
                    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" >' +
                        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                }
                ////myTable.row.add([url, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, ColorSLA, DaysOLA, urlClick]).draw(false);
                myTable.row.add([TrxParam, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].AgentSkil, json[i].qa_type, Status, Performance, DateTimeStart_1 + ' ' + DateTimeStart_2, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    //return $ESAPI.encoder().encodeForHTML(results[2].replace(/\+/g, " "))
    //alert(results)
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    //return $ESAPI.encoder().encodeForHTML(decodeURIComponent(results[2].replace(/\+/g, ' ')));
}