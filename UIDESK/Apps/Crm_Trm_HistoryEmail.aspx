<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_HistoryEmail.aspx.vb" Inherits="UIDESK.Crm_Trm_HistoryEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_HistoryEmail.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <center>
                        <div class="spinner-border text-primary m-1" role="status" id="Loading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                    <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                        <thead>
                            <tr>
                                <th style="width: 30px; min-width: 30px;">ID</th>
                                <th style="width: 250px; min-width: 250px;">From</th>
                                <th style="width: 450px; min-width: 450px;">Subject</th>
                                <th style="width: 150px; min-width: 150px;">Type</th>
                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Add Department</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Department</label>
                                        <input type="text" class="form-control" id="TxtDepartment" placeholder="Department">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Email Address</label>
                                        <input type="text" class="form-control" id="TxtEmail" placeholder="Email Address">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Status</label>
                                        <select class="form-select" id="cmbStatus">
                                            <option>Select</option>
                                            <option value="Y">Aktif</option>
                                            <option value="N">No Aktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
