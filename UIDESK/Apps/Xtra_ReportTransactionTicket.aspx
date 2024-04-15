<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportTransactionTicket.aspx.vb" Inherits="UIDESK.Xtra_ReportTransactionTicket" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Xtra_ReportTransactionTicket.js"></script>
    <script src="js/sweetalert.min.js"></script>--%>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <%--<input type="date" class="form-control" id="dt_strdate" placeholder="Start Date" required>--%>
                        <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                            <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                <RequiredField IsRequired="true" ErrorText="Must be filled" />
                            </ValidationSettings>
                        </dx:ASPxDateEdit>
                    </div>
                    <div class="col-md-2">
                        <%--<input type="date" class="form-control" id="dt_endate" placeholder="End Date" required>--%>
                        <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                            <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                <RequiredField IsRequired="true" ErrorText="Must be filled" />
                            </ValidationSettings>
                        </dx:ASPxDateEdit>
                    </div>
                    <div class="col-md-2">
                        <%--<a class="btn btn-primary w-sm" onclick="ActionSubmitReport()">Submit</a>--%>
                        <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                            Height="35px" Width="100%">
                        </dx:ASPxButton>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <%-- <table class="table align-middle table-nowrap table-check" id="DataTableReportTransaction" style="overflow-x:scroll;">
                                <thead>
                                    <tr>
                                        <th>Interaction ID</th>
                                        <th>Thread ID</th>
                                        <th>Customer ID</th>
                                        <th>Customer Name</th>
                                        <th>Ticket Number</th>
                                        <th>Account</th>
                                        <th>Category</th>
                                        <th>Enquiry Type</th>
                                        <th>Enquiry Detail</th>
                                        <th>Reason</th>
                                        <th>Priority Scale</th>
                                        <th>SLA</th>
                                        <th>Status</th>
                                        <th>Created Date</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>--%>
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="Small" Visible="true"
                            DataSourceID="TempBaseTrx" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue"
                            Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowFilterBar="Hidden" EnableFilterControlPopupMenuScrolling="true"
                                ShowVerticalScrollBar="false" ShowFooter="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <%--<dx:GridViewDataTextColumn Caption="No" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>--%>
                                <%--<dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysID" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="200px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Channel" FieldName="TicketSourceName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Tenant" FieldName="AgentGroupName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer ID" FieldName="NIK" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="CustomerName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account" FieldName="AccountInbound" Width="200px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="200px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Main Category" FieldName="MainCategoryName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Category" FieldName="CategoryName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Sub Category" FieldName="Level1" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Detail Sub Category" FieldName="Level2" Width="300px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Detail Sub Category 2" FieldName="Level3" Width="300px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Description" FieldName="DescriptionNonHtml" PropertiesTextEdit-EncodeHtml="false" Width="650px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Bank Product Type" FieldName="StrPenyebab" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Product Name" FieldName="ProductName" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Priority Scale" FieldName="SkalaPrioritas" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="User Status" FieldName="JenisNasabah" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="SLA" FieldName="SLA" Width="150px"></dx:GridViewDataTextColumn>

                                <%-- <dx:GridViewDataTextColumn Caption="Email Address" FieldName="Email" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Phone Number" FieldName="HP" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="VIP User" FieldName="CusStatus" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account Number" FieldName="NomorRekening" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Address" FieldName="AlamatNonHtml" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Divisi" FieldName="DivisiLayer3" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Channel" FieldName="TicketSourceName" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Ticket Status" FieldName="NewStatus" Width="150px"></dx:GridViewDataTextColumn>
                                <%-- <dx:GridViewDataTextColumn Caption="Position Ticket" FieldName="TicketPosition" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Created By" FieldName="CreatedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataDateColumn Caption="Created Date" FieldName="CreatedDate" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>--%>
                                <%--   <dx:GridViewDataTextColumn Caption="Solved By" FieldName="NewSolvedBy" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Solved Date" FieldName="NewDateSolved" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <%-- <dx:GridViewDataTextColumn Caption="Closed By" FieldName="ClosedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Closed Date" FieldName="NewDateClosed" Width="150px"></dx:GridViewDataTextColumn>--%>
                            </Columns>
                        </dx:ASPxGridView>
                    </div>
                </div>
                <br />
                <div class="row" id="ActionExport">
                    <div class="col-md-2">
                        <asp:DropDownList runat="server" ID="ddList" CssClass="form-control input-sm" Height="33px">
                            <asp:ListItem Value="xlsx" Text="Excel" />
                            <asp:ListItem Value="xls" Text="Excel 97-2003" />
                            <%--<asp:ListItem Value="pdf" Text="PDF" />
                            <asp:ListItem Value="rtf" Text="RTF" />--%>
                            <asp:ListItem Value="csv" Text="CSV" />
                        </asp:DropDownList>
                    </div>
                    <div class="col-md-2">
                        <%--<a class="btn btn-primary w-sm" onclick="ActionExport()" id="ExportReport" runat="server" onserverclick="ExportReport_ServerClick">Export</a>--%>
                        <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                            Height="33px" Width="100%">
                        </dx:ASPxButton>
                    </div>
                </div>
                <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server"></dx:ASPxGridViewExporter>
                <asp:SqlDataSource ID="TempBaseTrx" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
            </div>
        </div>
    </div>
</asp:Content>
