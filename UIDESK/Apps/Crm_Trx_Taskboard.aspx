<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Taskboard.aspx.vb" Inherits="UIDESK.Crm_Trx_Taskboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Taskboard.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row" id="divCountingDataCall"></div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <%--<h5 class="card-title">Taskboard Ticket</h5>--%>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table align-middle table-nowrap table-check" id="TaskboardTicket">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                            <th style="width: 150px; min-width: 150px;">Tenant</th>
                                            <th style="width: 150px; min-width: 150px;">Name</th>
                                            <th style="width: 150px; min-width: 150px;">Main Category</th>
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
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-note"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Internal Note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <%--<label for="addcontact-designation-input" class="form-label">Note</label>--%>
                                    <textarea class="form-control" placeholder="Leave a comment here" id="Note" name="Note" style="height: 250px"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
