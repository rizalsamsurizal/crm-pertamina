<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Signature.aspx.vb" Inherits="UIDESK.Crm_Trm_Signature" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Signature.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
               <%-- <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Data Signature Email</h5>
                        </div>
                    </div>
                     <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal"><i class="uil uil-plus me-1"></i>+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>--%>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 30px; min-width: 30px;">ID</th>
                                <th>Signature</th>
                                <th style="width: 30px; min-width: 30px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
                    aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Form Signature</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <%--<label for="addcontact-designation-input" class="form-label">Signature</label>--%>
                                        <textarea rows="6" class="form-control" name="Signature" id="Signature" placeholder="Data Signature"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionSignature()" id="SaveSignature">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var TrxSignature = CKEDITOR.replace('Signature');
        TrxSignature.config.height = 350;
        TrxSignature.config.toolbar = 'Basic';
        TrxSignature.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
