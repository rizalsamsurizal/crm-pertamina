﻿Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Imports System.Net.WebRequest
Imports System.Text.Encoding
Imports System.IO
Imports System.Net.ServicePointManager
Imports System.Net.Security
Imports System.Security.Cryptography.X509Certificates
Imports System.Net.SecurityProtocolType
Imports System.Net.FileWebRequest
Imports System.Runtime.Serialization
Imports System.Net
Imports System.Text
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Imports System.Web.Script.Serialization
Public Class auth_login
    Inherits System.Web.UI.Page

    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")

    Dim Proses As New ClsConn
    Dim sqldr, readLDAP, _reading As SqlDataReader
    Dim sql As String
    Dim valuesatu As Integer = 1
    Dim valuedua As Integer = 2
    Dim valuetiga As Integer = 3
    Dim ValueEmpat As Integer = 4
    Dim valueLima As Integer = 5
    Dim valueTest As Integer = 10

    Dim valueDispatchLayer2 As Integer = 2
    Dim valueDispatchLayer3 As Integer = 3
    Dim valueReassignLayer1 As Integer = 1

    Dim leveluser As String
    Dim value As String
    Dim CountLDAP As String = String.Empty
    Dim Con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconaux As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim com, sqlcom, sqlcomaux As SqlCommand

    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction

    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    'Dim _ClassAux As New TrmAux
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim strcounting As String = String.Empty
        'Dim username As String = Request.QueryString("username")
        'If username = "" Then
        '    Response.Redirect("auth_login.aspx")
        'Else
        '    Try
        '        Using conn As New SqlConnection(connString)
        '            conn.Open()
        '            strcounting = "select count (userid) as userid from msuser where username=@uservalue"
        '            Dim cmd As SqlCommand = New SqlCommand(strcounting, conn)
        '            Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
        '            uservalue.Value = username
        '            cmd.Parameters.Add(uservalue)
        '            recLDAP = cmd.ExecuteScalar()
        '            If recLDAP = 1 Then
        '                '_classfunction.logsuccess(strlogtime, strcounting)
        '                LoginTTF(username)
        '            Else
        '                '_classfunction.logsuccess(strlogtime, strcounting)
        '                Response.Redirect("auth_login.aspx")
        '            End If
        '        End Using
        '    Catch ex As Exception
        '        '_classfunction.logerror(strlogtime, ex, strcounting)
        '        Response.Write(ex.Message)
        '    End Try
        'End If
    End Sub
    Private Sub Login_ButtonSubmit_ServerClick(sender As Object, e As EventArgs) Handles Login_ButtonSubmit.ServerClick
        Dim strRecCount As String = "Select COUNT (ID) as LDAPCount from ICC_LDAP_Setting WHERE NA='Y'"
        Try
            Using conn As New SqlConnection(connString)
                conn.Open()
                Dim cmd As SqlCommand = New SqlCommand(strRecCount, conn)
                recCount = cmd.ExecuteScalar()
                _ClassFunction.LogSuccess(strLogTime, strRecCount)
            End Using
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, strRecCount)
            Response.Write(ex.Message)
        End Try
        If recCount <> 0 Then
            Dim strCounting As String = String.Empty
            Dim LDAPServer As String = ConfigurationManager.AppSettings("LDAP")
            Dim _LDAPServerDB As String = String.Empty
            Dim _strLDAP As String = "Select LDAPServer from ICC_LDAP_Setting WHERE NA='Y'"
            readLDAP = Proses.ExecuteReader(_strLDAP)
            Try
                If readLDAP.HasRows Then
                    readLDAP.Read()
                    _LDAPServerDB = readLDAP("LDAPServer")
                Else
                End If
                readLDAP.Close()
            Catch ex As Exception
                Response.Write(ex.Message)
            End Try
            If ValidateActiveDirectoryLogin(_LDAPServerDB, Login_Username.Value, Login_Password.Value) = True Then
                If Login_Username.Value <> "" Then
                    Try
                        Using conn As New SqlConnection(connString)
                            conn.Open()
                            strCounting = "Select COUNT (UserID) as userID from msUser where UserName=@uservalue"
                            Dim cmd As SqlCommand = New SqlCommand(strCounting, conn)
                            Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
                            uservalue.Value = Login_Username.Value
                            cmd.Parameters.Add(uservalue)
                            recLDAP = cmd.ExecuteScalar()
                            If recLDAP = 1 Then
                                _ClassFunction.LogSuccess(strLogTime, strCounting)
                                AccessLogin(Login_Username.Value, Login_Password.Value)
                            Else
                                _ClassFunction.LogSuccess(strLogTime, strCounting)
                            End If
                        End Using
                    Catch ex As Exception
                        _ClassFunction.LogError(strLogTime, ex, strCounting)
                        Response.Write(ex.Message)
                    End Try
                Else
                    _ClassFunction.LogSuccess(strLogTime, "login failed, username is empty")
                End If
            Else

            End If
        Else
            If Login_Username.Value <> "" Then
                Try
                    Using conn As New SqlConnection(connString)
                        conn.Open()
                        Dim strCounting As String = "Select COUNT (UserID) as userID from msUser where UserName=@uservalue and Password=@password"
                        Dim cmd As SqlCommand = New SqlCommand(strCounting, conn)
                        Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
                        Dim password As SqlParameter = New SqlParameter("@password", SqlDbType.VarChar, 150)
                        uservalue.Value = Login_Username.Value
                        password.Value = Login_Password.Value
                        cmd.Parameters.Add(uservalue)
                        cmd.Parameters.Add(password)
                        recLDAP = cmd.ExecuteScalar()
                        Dim _strLoquser As String = "Select COUNT (UserID) as userID from msUser where UserName='" & Login_Username.Value & "' and Password='" & Login_Password.Value & "'"
                        If recLDAP = 1 Then
                            _ClassFunction.LogSuccess(strLogTime, _strLoquser)
                            AccessLogin(Login_Username.Value, Login_Password.Value)
                        Else
                            _ClassFunction.LogSuccess(strLogTime, _strLoquser)
                            Exit Sub
                        End If

                    End Using
                Catch ex As Exception
                    Response.Write(ex.Message)
                End Try
            Else
                _ClassFunction.LogSuccess(strLogTime, "LDAP empty")
            End If
        End If
    End Sub
    Function AccessLogin(ByVal UserName As String, ByVal Password As String)
        Dim Login_True As String = ""
        sql = "EXEC SP_LOGIN_APPLIKASI  '" & UserName & "', '" & Password & "'"
        'sql = "EXEC SP_LOGIN_APPLIKASI  '" & username & "','" & _ClassFunction.Encrypt(password) & "'"
        Try
            sqldr = Proses.ExecuteReader(sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
                Session("EscalationIdentity") = sqldr("EscalationIdentity").ToString
                Session("EscalationTo") = sqldr("EscalationTo").ToString
                Session("LevelUserID") = sqldr("LevelUserID").ToString
                Session("EmailAddress") = sqldr("EMAIL_ADDRESS").ToString
                Session("Foto") = sqldr("URL").ToString
                Session("authority") = sqldr("authority").ToString
                Session("SIPuser") = sqldr("authority").ToString
                Session("MultiChatToken") = sqldr("TokenMeta").ToString
                Session("UrlDatakelola") = sqldr("UrlDatakelola").ToString
                Session("CompanyToken") = sqldr("CompanyToken").ToString

                VariabelCookiesUsername.Values("CookiesUserName") = sqldr("UserName").ToString
                VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
                Response.Cookies.Add(VariabelCookiesUsername)
                Login_True = "YesExist"
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(strLogTime, sql)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, sql)
            Response.Write(ex.Message)
        End Try

        Dim UpdateLogin As String = String.Empty
        Try
            UpdateLogin = "UPDATE MSUSER SET LOGIN='1', IdAUX='9', DescAUX='READY', AUTHORITY='" & RandomString(UserName) & "' WHERE USERNAME ='" & UserName & "'"
            Proses.ExecuteNonQuery(UpdateLogin)
            _ClassFunction.LogSuccess(strLogTime, UpdateLogin)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, UpdateLogin)
            Response.Write(ex.Message)
        End Try

        Dim strAux As String = "SELECT TOP 1 * FROM UIDESK_TrxAux WHERE AuxUserName='" & Session("username") & "' ORDER BY ID DESC"
        Try
            sqldr = Proses.ExecuteReader(strAux)
            If sqldr.HasRows Then
                sqldr.Read()
                If sqldr("AuxID").ToString <> "9" Then
                    '_ClassAux.InsertAgentAux("9", Session("UserName"))
                    '_ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                Else
                    '_ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                End If
            Else
                '_ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(strLogTime, strAux)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, strAux)
            Response.Write(ex.Message)
        End Try

        If Request.QueryString("") <> "" Then
            '_ClassAux.InsertLoginActivity("9", Session("UserName"), "Update")
        Else
        End If
        If Login_True = "YesExist" Then
            Response.Redirect("Apps/Crm_Trx_Taskboard.aspx?status=Open")
        Else
            'Login_NotifErr.Visible = True
        End If
    End Function
    Private Function ValidateActiveDirectoryLogin(ByVal Domain As String, ByVal Username As String, ByVal Password As String) As Boolean
        Dim Success As Boolean = False
        Try
            Dim Entry As New System.DirectoryServices.DirectoryEntry("LDAP://" & Domain & ":389", Username, Password)
            Dim Searcher As New System.DirectoryServices.DirectorySearcher(Entry)
            Searcher.SearchScope = DirectoryServices.SearchScope.OneLevel
            Dim Results As System.DirectoryServices.SearchResult = Searcher.FindOne
            Success = Not (Results Is Nothing)
        Catch ex As Exception
            Success = False
        End Try
        Return Success
        'Try
        '    'Dim Entry As New System.DirectoryServices.DirectoryEntry("LDAP://" & Domain & ":389", Username, Password)
        '    Dim Entry As New System.DirectoryServices.DirectoryEntry("LDAP://10.28.2.34:389", "avaya", "4vaya!2345")
        '    Dim Searcher As New System.DirectoryServices.DirectorySearcher(Entry)
        '    Searcher.SearchScope = DirectoryServices.SearchScope.OneLevel
        '    Dim Results As System.DirectoryServices.SearchResult = Searcher.FindOne
        '    Success = Not (Results Is Nothing)
        '    Response.Redirect("LogSuccess.aspx")
        'Catch ex As Exception
        '    Success = False
        '    Response.Redirect("LogError.aspx")
        'End Try
    End Function
    Function IsValidPasswordFormat(ByVal s As String) As Boolean
        Try
            Return Regex.IsMatch(s, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}")
        Catch
            Return False
        End Try
        Return True
    End Function
    Function LoginTTF(ByVal UserName As String)
        Dim Login_True As String = String.Empty
        sql = "exec PTM_TTF_LoginAplikasi  '" & UserName & "'"
        Try
            sqldr = Proses.ExecuteReader(sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
                Session("EscalationIdentity") = sqldr("EscalationIdentity").ToString
                Session("EscalationTo") = sqldr("EscalationTo").ToString
                Session("LevelUserID") = sqldr("LevelUserID").ToString
                Session("EmailAddress") = sqldr("EMAIL_ADDRESS").ToString
                Session("Ext") = sqldr("PBXUSER").ToString
                Session("MultiChatToken") = sqldr("TokenMeta").ToString

                VariabelCookiesUsername.Values("CookiesUserName") = sqldr("UserName").ToString
                VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
                Response.Cookies.Add(VariabelCookiesUsername)
                Login_True = "YesExist"
                'Response.Redirect("apps/Crm_Trx_Ticket.aspx?val=" & Request.QueryString("val") & "&tenantid=" & Request.QueryString("tenantid") & "")
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(strLogTime, sql)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, sql)
            Response.Write(ex.Message)
        End Try

        Dim UpdateLogin As String = String.Empty
        Try
            UpdateLogin = "UPDATE MSUSER SET LOGIN='1', IdAUX='9', DescAUX='READY', AUTHORITY='" & RandomString(UserName) & "' WHERE USERNAME ='" & UserName & "'"
            Proses.ExecuteNonQuery(UpdateLogin)
            _ClassFunction.LogSuccess(strLogTime, UpdateLogin)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, UpdateLogin)
            Response.Write(ex.Message)
        End Try

        If Login_True = "YesExist" Then
            Response.Redirect("apps/Crm_Trx_Ticket.aspx?val=" & Request.QueryString("val") & "&tenantid=" & Request.QueryString("tenantid") & "")
        Else
            'Login_NotifErr.Visible = True
            'ErrorLabel.Visible = True
            'ErrorLabel.Text = "Your username or password is incorrect, Try again"
            Response.Redirect("auth_login.aspx")
        End If
        'Dim strAux As String = "SELECT TOP 1 * FROM UIDESK_TrxAux WHERE AuxUserName='" & Session("username") & "' ORDER BY ID DESC"
        'Try
        '    sqldr = Proses.ExecuteReader(strAux)
        '    If sqldr.HasRows Then
        '        sqldr.Read()
        '        If sqldr("AuxID").ToString <> "9" Then
        '            _ClassAux.InsertAgentAux("9", Session("UserName"))
        '            _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
        '        Else
        '            _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
        '        End If
        '    Else
        '        _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
        '    End If
        '    sqldr.Close()
        '    _ClassFunction.LogSuccess(strLogTime, strAux)
        'Catch ex As Exception
        '    _ClassFunction.LogError(strLogTime, ex, strAux)
        '    Response.Write(ex.Message)
        'End Try

        'If Login_True = "YesExist" Then
        '    Response.Redirect("apps/Crm_Trx_Ticket.aspx?val=" & Request.QueryString("val") & "&tenantid=" & Request.QueryString("tenantid") & "")
        'Else
        '    Login_NotifErr.Visible = True
        '    ErrorLabel.Visible = True
        '    ErrorLabel.Text = "Your username or password is incorrect, Try again"
        'End If
    End Function
     Function RandomString(ByVal ValueLogin As String)
        Dim s As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        Dim r As New Random
        Dim sb As New StringBuilder
        For i As Integer = 1 To 50
            Dim idx As Integer = r.Next(0, 35)
            sb.Append(s.Substring(idx, 1))
        Next
        Return sb.ToString()
    End Function
End Class