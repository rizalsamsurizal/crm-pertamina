﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_User_Tenant.aspx.vb" Inherits="UIDESK.Crm_Trx_User_Tenant" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_User_Tenant.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxAgentId" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mb-3">
                                <a href="#" class="btn btn-light" onclick="NewUser()">
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

                            </div>
                        </div>
                    </div>
                    <div class="row" id="divUserNotification"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Setting User Data Tenant</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Tenant</label>
                                    <select class="form-select" id="cmbTenant">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Level User</label>
                                    <select class="form-select" id="cmbLevelUser" onchange="Change_DataTable()">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table align-middle table-nowrap table-check" id="DataTableUser">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">#</th>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 250px; min-width: 250px;">UserName</th>
                                            <th style="width: 250px; min-width: 250px;">Name</th>
                                            <th style="width: 250px; min-width: 250px;">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" id="btnSimpan">Add</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>