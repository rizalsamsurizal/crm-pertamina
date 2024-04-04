<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_Taskboard_Penilaian.aspx.vb" Inherits="UIDESK.QA_Taskboard_Penilaian" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_Taskboard_Penilaian.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row" id="Div_HeaderCounting"></div>
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
                                <table class="table align-middle table-nowrap table-check" id="TrmTransaction">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px;">ID</th>
                                            <th>ID Penilaian</th>
                                            <th style="width: 150px;">Nama Nasabah</th>
                                            <th style="width: 150px;">Jenis Permasalahan</th>
                                            <th style="width: 150px;">Agent</th>
                                            <th style="width: 100px;">Skill</th>
                                            <th style="width: 100px;">Type</th>
                                            <th style="width: 100px;">Status</th>
                                            <th style="width: 100px;">Performance</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 30px;">Action</th>
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
