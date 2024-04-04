Imports System
Imports System.IO
Imports System.Data
Imports System.Data.SqlClient
Imports System.Security.Cryptography
Public Class Uidesk
    Inherits System.Web.UI.MasterPage

    Dim _ClassFunction As New WebServiceTransaction
    Dim _sqlconn, _sqlconnect, _sqlconnections As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim _read, _reader, _reading, _sqlreader As SqlDataReader
    Dim _sqlcomm, _sqlcommands, _sqlcommander As SqlCommand
    Dim _strsql, _strselect, _strsqlselect As String
    Dim _write As String
    'Dim _ClassAux As New TrmAux
    Dim Proses As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TrxCookiesUserName As String = String.Empty
        Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
        TrxCookiesUserName = If(VariabelCookiesUsername IsNot Nothing, VariabelCookiesUsername.Value.Split("="c)(1), "undefined")
        If TrxCookiesUserName = "undefined" Then
            Response.Redirect("~/auth_login.aspx")
        Else
            _PageSession()
            _PageMastering()
            Dim MidCurrentPage As String = System.IO.Path.GetFileName(Request.Url.AbsolutePath)
            If Request.QueryString("mid") Is Nothing Then
                'Response.Write("currentPage " + MidCurrentPage)
                If Session("lvluser") = "Layer 1" Then
                    Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSqlChannel)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                            Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                            Try
                                _sqlreader = Proses.ExecuteReader(strSql)
                                If _sqlreader.HasRows Then
                                    _sqlreader.Read()
                                Else
                                    _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                    RemoveCookies()
                                    Response.Redirect("error-500-cover.html")
                                End If
                                _sqlreader.Close()
                            Catch ex As Exception
                                Response.Write(ex.Message)
                            End Try
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                Else
                    Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSql)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSql)
                            RemoveCookies()
                            Response.Redirect("auth-lockscreen-cover.html")
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                End If
            Else
                If Session("lvluser") = "Layer 1" Then
                    Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSqlChannel)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                            Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                            Try
                                _sqlreader = Proses.ExecuteReader(strSql)
                                If _sqlreader.HasRows Then
                                    _sqlreader.Read()
                                Else
                                    _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                    RemoveCookies()
                                    Response.Redirect("auth-lockscreen-cover.html")
                                End If
                                _sqlreader.Close()
                            Catch ex As Exception
                                Response.Write(ex.Message)
                            End Try
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                Else
                    Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSql)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSql)
                            RemoveCookies()
                            Response.Redirect("auth-lockscreen-cover.html")
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                End If
            End If
        End If
        'If Session("UserName") = "" Then
        '    Response.Redirect("../auth_login.aspx")
        'Else
        '    _PageSession()
        '    _PageMastering()
        'End If
    End Sub
    Private Sub _PageMastering()
        _strsql = "select user1.Number, user4.MenuID, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity from user4 left outer join User1 " &
            "on user4.MenuID=user1.MenuID " &
            "where user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'" &
            "group by MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity " &
            "order by user1.number asc"
        _sqlcomm = New SqlCommand(_strsql, _sqlconn)
        _sqlconn.Open()
        _read = _sqlcomm.ExecuteReader()
        _write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-dashboards'>Uidesk Application System</li>"
        While _read.Read
            Dim _IclassRead As String = ""
            If _read("Activity") = "N" Then
                _IclassRead = "class='has-arrow'"
            Else
                _IclassRead = ""
            End If
            Dim Parameter As String = String.Empty
            Dim Urlpaging As String = String.Empty
            Dim Onclicking As String = String.Empty
            If _read("DivID") = "1" Then
                Parameter = "&mid=" & _read("MenuID").ToString & ""
            Else
                Parameter = "?mid=" & _read("MenuID").ToString & ""
            End If
            If _read("Url").ToString = "" Then
                Urlpaging = "javascript:void(0);"
                Onclicking = ""
            Else
                Urlpaging = _read("Url").ToString & Parameter
                Onclicking = "onclick=directPage('" & _read("Url").ToString & "')"
            End If
            _write &= "<li><a " & Onclicking & " " & _IclassRead & " style='cursor:pointer;'> " &
                                "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
                                "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
                            "</a>"
            '_write &= "<li><a href='" & _read("Url") & "" & Parameter & "' " & _IclassRead & " style='cursor:pointer;'> " &
            '                    "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
            '                    "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
            '                "</a>"

            If Session("lvluser") = "Layer 1" Then
                If _read("MenuID").ToString = "3026" Then
                    _strselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And DetailMenuName IS NULL"
                Else
                    _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
                        "User2.DivID, USER4.Nomor FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' order by Nomor asc"
                End If
            Else
                _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
                        "User2.DivID, USER4.Nomor FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' order by Nomor asc"
            End If
            _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
            _sqlconnect.Open()
            _reader = _sqlcommands.ExecuteReader()
            _write &= "<ul class='sub-menu'>"
            While _reader.Read

                Dim _Iclass As String = ""
                Dim Onclicking2 As String = String.Empty
                If _reader("Param") = "Y" Then
                    _Iclass = "class='has-arrow' style='cursor:pointer;' data-key='t-font-awesome'"
                    Onclicking2 = ""
                Else
                    _Iclass = ""
                    Onclicking2 = "onclick=directPage('" & _reader("Url").ToString & "')"
                End If
                Dim Parameter2 As String = String.Empty
                If _read("MenuID").ToString <> "3026" Then
                    If _reader("DivID").ToString = "0" Then
                        Parameter2 = "?mid=" & _reader("MenuID").ToString & ""
                    Else
                        Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                    End If
                Else
                    Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                End If
                _write &= "<li><a href " & Onclicking2 & " " & _Iclass & ">" & _reader("SubMenuName") & "</a>"

                If Session("lvluser") = "Layer 1" Then
                    _strsqlselect = "SELECT distinct USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree," &
                                    "user3.MenuTreeName, User3.Url FROM USER_SettingChannel " &
                                    "left outer join " &
                                    "user3 on.user3.SubMenuID=USER_SettingChannel.SubMenuID left outer join user2 on.USER_SettingChannel.SubMenuID = user2.SubMenuID " &
                                    "left outer join User1 on USER_SettingChannel.MenuID = user1.MenuID " &
                                    "where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='" & Session("UserName") & "' "
                    '"where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='Agent1' "
                    '_strsqlselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And SubMenuID='" & _reader("SubMenuID") & "' And DetailMenuName IS NOT NULL"
                Else
                    _strsqlselect = "select distinct user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, " &
                                "user3.MenuTreeName, User3.Url, User3.DivID " &
                                "from user4 left outer join " &
                                "user3 on.user3.SubMenuID=user4.SubMenuID left outer join user2 on.user4.SubMenuID = user2.SubMenuID " &
                                "left outer join User1 on user4.MenuID = user1.MenuID " &
                                "where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'"
                End If

                _sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
                _sqlconnections.Open()
                _reading = _sqlcommander.ExecuteReader()
                _write &= "<ul class='sub-menu'>"
                While _reading.Read
                    _write &= "<li>" &
                                "<a href=" & _reading("Url").ToString & "?mid=" & _reading("MenuID").ToString & "><i class='ti-more'></i>" & _reading("MenuTreeName").ToString & "</a>" &
                              "</li>"
                End While
                _reading.Close()
                _sqlconnections.Close()
                _write &= "</ul>"

            End While
            _reader.Close()
            _sqlconnect.Close()
            _write &= "</li></ul>"

        End While
        _read.Close()
        _sqlconn.Close()
        _write &= "</li></ul>"
        aspxLiteral.Text = _write
    End Sub
    Private Sub _PageSession()
        hd_sessionLogin.Value = Session("UserName")
        TrxLoginTypeAngka.Value = Session("LoginTypeAngka")
        TrxLayerUser.Value = Session("LoginType")
        TrxDivisi.Value = Session("organization")
        hd_OtherSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_ThreadSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_AccountChannelUser.Value = "AccountChannel"
        hd_AccountContactUser.Value = "ContactChannel"
        hd_EscalationIdentity.Value = Session("EscalationIdentity")
        hd_EscalationTo.Value = Session("EscalationTo")
        hd_NameKaryawan.Value = Session("NameKaryawan")
        hd_LevelUser.Value = Session("lvluser")
        hd_EmailUserLogin.Value = Session("EmailAddress")
        SM_AccountID.Value = Session("accountid")
        SM_AccountName.Value = Session("accountname")
        SM_AccountToken.Value = Session("token")
        SM_AccountURL.Value = Session("accounturl")
        SM_Webhook.Value = Session("webhookurl")
        QM_LevelUser.Value = Session("lvluser")
        QM_GroupQA.Value = Session("organization")
        QM_GroupAgent.Value = Session("UnitKerja")
        QM_TypeCall.Value = Session("Org")
        QM_GroupLayanan.Value = Session("NamaGrup")
        HD_CookiesVariabel.Value = Session("authority")
        hd_SIP.Value = Session("SIPuser")
        SM_MultiChatToken.Value = Session("MultiChatToken")
        SM_UrlDatakelola.Value = Session("UrlDatakelola")
        SM_CompanyToken.Value = Session("CompanyToken")
        'QM_TeamLayanan.Value = Session("LayananTeam")
        'If Session("Foto") = "" Then
        '    ImageFoto.Src = "../images/avatar/7.jpg"
        'Else
        '    ImageFoto.Src = "../FileFoto/" & Session("Foto")
        'End If
    End Sub
    Private Sub RemoveCookies()
        Dim nameCookie As HttpCookie = Request.Cookies("CookiesUserName")
        nameCookie.Expires = DateTime.Now.AddDays(-1)
        Response.Cookies.Add(nameCookie)
        Session.RemoveAll()
    End Sub
End Class