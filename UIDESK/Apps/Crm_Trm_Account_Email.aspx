<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Account_Email.aspx.vb" Inherits="UIDESK.Crm_Trm_Account_Email" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Account_Email.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <%-- <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Email Account Corporate</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>--%>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 300px; min-width: 300px;">Account Email Corporate</th>
                                <th style="width: 300px; min-width: 300px;">Unit Kerja Agent</th>
                                <th style="width: 30px; min-width: 30px;">Action</th>
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
                                <h5 class="modal-title" id="addContactModalLabel">Form Account Email Corporate</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Account Email Corporate</label>
                                        <input type="text" class="form-control" id="Account_Email_Corporate" placeholder="Account Email Corporate" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Unit Kerja Agent</label>
                                        <select id="ComboSite" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
