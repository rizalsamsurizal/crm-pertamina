<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Thread.aspx.vb" Inherits="UIDESK.Crm_Trx_Thread" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Thread.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxUnitKerja" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxType" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <center>
                        <div class="spinner-border text-primary m-1" role="status" id="Loading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                    <table class="table align-middle table-nowrap table-check" id="TicketThread">
                        <thead>
                            <tr>
                                <%--<th style="width: 50px;">ID</th>--%>
                                <th style="width: 150px;">Incoming ID</th>
                                <th style="width: 150px;">Channel</th>
                                <th style="width: 150px;">Customer Name</th>
                                <th style="width: 150px;">Account</th>
                                <%--<th style="width: 300px;">Subject</th>--%>
                                <%--<th style="width: 150px;">Agent</th>--%>
                                <%--<th style="width: 180px;">Email Date</th>--%>
                                <th style="width: 150px;">Date Thread</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Reason Thread</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="mb-3">
                            <textarea rows="6" class="form-control" name="ReasonThread" id="ReasonThread" placeholder="Reason Thread"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSubmit()" id="Submit">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('ReasonThread');
        CKEDITOR.config.height = 250;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                '/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];
    </script>
</asp:Content>
