<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Customer.aspx.vb" Inherits="UIDESK.Crm_Trm_Customer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Customer.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="Hd_Site" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mb-3">
                                <a href="#" class="btn btn-light" onclick="TambahUser()">
                                    <i class="uil uil-plus me-1"></i>+ Add New
                                 </a>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                                <div class="search-box ">
                                    <div class="position-relative">
                                        <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingUserName" placeholder="Search...">
                                        <i class="uil uil-search search-icon"></i>
                                    </div>
                                </div>
                                <div class="btn-group me-2 mb-2 mb-sm-0">
                                    <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-building"></i>&nbsp;Tenant <i class="mdi mdi-dots-vertical ms-2"></i>
                                    </button>
                                    <div id="divTenantDropdownHeader" class="dropdown-menu"></div>
                                </div>
                            </div>
                        </div>
                        <%--<div class="mt-2">
                            <ul class="nav nav-tabs nav-tabs-custom mb-4" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#list-all" role="tab">All Customer <span class="badge rounded-pill bg-info">1980</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#list-active">Shared Service <span class="badge rounded-pill bg-warning">0</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#list-complete">PCC 135 Patra Niaga <span class="badge rounded-pill bg-success">1000</span></a>
                                </li>
                                 <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#list-complete">PCC 135 Abdul Muis <span class="badge rounded-pill bg-danger">980</span></a>
                                </li>
                            </ul>
                        </div>--%>
                    </div>
                    <div>
                        <div class="row" id="DivCustomerSystem"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <%-- <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="TambahUser()">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>--%>
                <div class="table-responsive" style="visibility: hidden;">
                    <center>
                        <div class="spinner-border text-primary m-1" role="status" id="Loading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 50px; min-width: 50px;">CustomerID</th>
                                <th style="width: 200px; min-width: 200px;">Name</th>
                                <th style="width: 150px; min-width: 150px;">Jenis Kelamin</th>
                                <th style="width: 150px; min-width: 150px;">Birth</th>
                                <%--<th>Alamat</th>--%>
                                <th style="width: 150px; min-width: 150px;">Nomor Telepon</th>
                                <th style="width: 200px; min-width: 200px;">Email</th>
                                <%--<th style="width: 150px; min-width: 150px;">NIK</th>--%>
                                <th style="width: 50px; min-width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalagent"
                    aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Form Customer</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="addcontact-name-input" class="form-label">Nama</label>
                                                <input type="text" class="form-control" id="Name" placeholder="Nama">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Nomor Telepon</label>
                                                <input type="text" class="form-control" id="HP" placeholder="Nomor Telepon">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Email</label>
                                                <input type="text" class="form-control" id="Email" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-name-input" class="form-label">Tenant</label>
                                                <select id="CmbTenant" class="form-select">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="display: none;">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">NIK</label>
                                                <input type="text" class="form-control" id="NIK" placeholder="NIK">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-name-input" class="form-label">Gender</label>
                                                <select id="ComboGender" class="form-select">
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Birth</label>
                                                <input type="date" class="form-control" id="Birth" placeholder="Birth">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="display: none;">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Facebook</label>
                                                <input type="text" class="form-control" id="Facebook" placeholder="Facebook">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Instagram</label>
                                                <input type="text" class="form-control" id="Instagram" placeholder="Instagram">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Twitter</label>
                                                <input type="text" class="form-control" id="Twitter" placeholder="Twitter">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Alamat</label>
                                                <textarea class="form-control" placeholder="Alamat" id="Alamat" name="Alamat" rows="8"></textarea>
                                            </div>
                                        </div>
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalHistory"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width:1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Form History Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                        <thead>
                            <tr>
                                <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                <th style="width: 150px; min-width: 150px;">Main Category</th>
                                <th style="width: 150px; min-width: 150px;">Position</th>
                                <th style="width: 50px; min-width: 100px;">Status</th>
                                <th style="width: 150px; min-width: 100px;">SLA</th>
                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <%-- <script>
        var TrxAlamat = CKEDITOR.replace('AlamatX');
        TrxAlamat.config.height = 200;
        TrxAlamat.config.toolbar = 'Basic';
        TrxAlamat.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>--%>
</asp:Content>
