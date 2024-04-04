<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_License.aspx.vb" Inherits="UIDESK.Crm_Trm_License" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Taskboard.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <table class="table align-middle table-nowrap table-check" id="TableLicense">
                        <thead>
                            <tr>
                                <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                <th style="width: 150px; min-width: 150px;">Name</th>
                                <th style="width: 150px; min-width: 150px;">Kategori</th>
                                <th style="width: 150px; min-width: 150px;">SLA</th>
                                <th style="width: 150px; min-width: 150px;">Note SLA</th>
                                <th style="width: 150px; min-width: 150px;">Position</th>
                                <th style="width: 50px; min-width: 50px;">Status</th>
                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                                <th style="width: 30px; min-width: 30px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
