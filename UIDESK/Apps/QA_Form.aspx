<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_Form.aspx.vb" Inherits="UIDESK.QA_Form" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_Form.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="QM_HeaderID" runat="server" />
    <asp:HiddenField ID="QM_AcraID" runat="server" />
    <asp:HiddenField ID="QM_ResultPenilaianID" runat="server" />
    <asp:HiddenField ID="QM_AudioName" runat="server" />
    <asp:HiddenField ID="QM_Persen" runat="server" />
    <div class="row">
        <div class="col-xxl-3 col-lg-4">
            <div class="card" id="Q1_Internal_Call">
                <div class="card-header">
                    <h5 class="card-title">Data Profile Penilaian</h5>
                </div>
                <div class="card-body">
                </div>
            </div>
            <div class="card" id="Q1_Internal_NonCall">
                <div class="card-header">
                    <h5 class="card-title">Form Penilaian</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="contact-info-name" class="form-label">Nama</label>
                        <input type="text" class="form-control" id="QA_Name">
                    </div>
                    <div class="mb-3">
                        <label for="contact-info-name" class="form-label">Nama Agent</label>
                        <select id="QA_Agent" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Channel</label>
                        <select id="QA_Channel" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Jenis Permasalahan</label>
                        <select id="QA_JenisPermasalahan" class="form-select" onclick="GetNomorTicketAgent('1')">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Nomor Ticket</label>
                        <select id="QA_NomorTicket" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Type</label>
                        <input type="text" class="form-control" id="QA_Type">
                    </div>
                    <div class="mb-3">
                        <label>Nama Nasabah</label>
                        <input type="text" class="form-control" id="QA_NamaNasabah">
                    </div>
                    <div class="mb-3">
                        <label>Nama User / Account</label>
                        <input type="text" class="form-control" id="QA_NamaUser">
                    </div>
                    <div class="mb-3">
                        <label>Nomor Kartu</label>
                        <input type="text" class="form-control" id="QA_NomorKartu">
                    </div>
                    <div class="mb-3">
                        <label>Waktu Interaksi</label>
                        <input type="date" class="form-control" id="QA_WaktuInteraksi">
                    </div>
                    <div class="mb-3">
                        <label>Nomor Telepon</label>
                        <input type="text" class="form-control" id="QA_NomorTelepon">
                    </div>
                    <div class="mb-3">
                        <label>Periode Penilaian</label>
                        <input type="text" class="form-control" id="QA_PeriodePenilaian">
                    </div>
                </div>
                <%--  <div class="card-footer">
                    <div class="text-end">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" onclick="Hide()" id="HideProfile">Hide</button>
                        <button type="button" class="btn btn-primary w-sm" data-bs-dismiss="modal" onclick="Hide()" id="UnHideProfile">UnHide</button>
                    </div>
                </div>--%>
            </div>
        </div>
        <div class="col-xxl-9 col-lg-8" id="divpenilaian">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Form Aspek Penilaian</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap table-check" id="tableForm1">
                            <tbody>
                                <tr>
                                    <th>No.</th>
                                    <th style="width: 1000px; text-align: left;">Aspek Penilaian</th>
                                    <th>Comment</th>
                                    <th>Bobot</th>
                                    <th style="text-align: left;">Rentang Nilai</th>
                                    <th style="text-align: center;">Skor</th>
                                </tr>
                            </tbody>
                            <%--<tfoot>
                                <tr>
                                    <th style="width: 100px; text-align: left;" colspan="6" id="THInteraction_Header">
                                        <textarea name="Interaction_Header" id="Interaction_Header" class="form-control" required="" placeholder="Textarea text" aria-invalid="false"></textarea>
                                        <div class="row" id="Attachment_Header" style="width: 100%; margin-top: 10px; margin-left: 5px;"></div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>                                        
                                          <div class="col-md-6">
                                            <div class="pull-left">
                                                <div class="btn btn-rounded btn-default btn-file" id="ButtonHeaderAttachment">
                                                    <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                                                <input type="file" name="filesHeader">
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th style="text-align: center;">
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-outline btn-rounded dropdown-toggle" type="button" data-toggle="dropdown" id="ButtonAction"><i class="fa fa-plus"></i>&nbsp;Action</button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#" onclick="ButtonActionSimpan('Pending Approved')"><i class="fa fa-check-circle"></i>Submit</a>
                                                <a class="dropdown-item" href="#" onclick="ButtonActionSimpan('Draft')"><i class="fa fa-file-text"></i>Draft</a>
                                                <a class="dropdown-item" href="#" onclick="ButtonActionCancel()"><i class="fa fa-times-circle"></i>Cancel</a>
                                            </div>
                                        </div>
                                        <a href="#" type="submit" class="btn btn-rounded btn-primary pull-right" onclick="ButtonActionUpdate()" id="ButtonActionUpdate" style="display: none;">Submit</a>
                                    </th>
                                </tr>
                            </tfoot>--%>
                        </table>
                    </div>
                    <div class="row" id="Div_Interaction_Header">
                        <div class="col-lg-12">
                            <textarea name="Interaction_Header" id="Interaction_Header" class="form-control" required="" placeholder="Textarea text" aria-invalid="false"></textarea>
                        </div>
                    </div>
                    <div class="row" id="Div_File_Interaction_Header">
                        <div class="mt-3">
                            <label></label>
                            <input type="file" name="filesHeader" class="form-control">
                        </div>
                        <div class="mt-3">
                            <div id="HeaderAttachment" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
                <div class="card-footer" id="Div_Button_Interaction_Header">
                    <div class="text-end">
                        <div>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <%--<button type="button" class="btn btn-primary">1</button>--%>
                                <button type="button" class="btn btn-soft-danger w-sm" onclick="ButtonActionCancel()"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
                                <button type="button" class="btn btn-soft-primary w-sm" onclick="ButtonActionSimpan('Approved')"><i class="fa fa-save"></i>&nbsp;Submit</button>
                                <%-- <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-soft-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action <i class="mdi mdi-chevron-down"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">
                                        <li><a class="dropdown-item" href="#" onclick="ButtonActionSimpan('Draft')" id="Draft">Draft</a></li>
                                        <li><a class="dropdown-item" href="#" onclick="ButtonActionSimpan('Approved')" id="Simpan">Submit</a></li>
                                    </ul>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" id="DivTotalSkor">
                <div class="card-header">
                    <h5 class="card-title">Total Skor Penilaian</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="table align-middle table-nowrap table-check" id="TrxTotalSkor">
                                <tbody>
                                    <tr class="table-light" style="background-color: gray">
                                        <th scope="col" style="width: 1000px;">Total Skor</th>
                                        <th scope="col" style="width: 50px;"></th>
                                    </tr>
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" id="DivInteraction">
                <div class="card-header">
                    <h5 class="card-title">Data Interaction Penilaian</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label>Status Transaksi</label>
                            <select id="Interaction_ComboStatus" class="form-select" onchange="onChangeStatusTransaksi(1);">
                                <option>Select</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Status Return</label>
                            <select id="Interaction_StatusReturn" class="form-select" onchange="onChangeStatus(1);">
                                <option>Select</option>
                                <option value="Approved">Approved</option>
                                <option value="Reject">Reject</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <textarea name="Interaction_Description" id="Interaction_Description" class="form-control" required="" placeholder="Textarea text" aria-invalid="false"></textarea>
                        </div>
                    </div>
                    <br />
                    <div class="row" id="ButtonInteractionAttachment">
                        <div class="col-md-12">
                            <input type="file" name="filesInteraction" class="form-control">
                        </div>
                    </div>
                    <%--  <br />
                    <div class="row" id="divRatingPenilaian">
                        <div class="col-md-12">
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s1" onclick="click1()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s2" onclick="click2()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s3" onclick="click3()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s4" onclick="click4()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s5" onclick="click5()"></i>
                            <input id="RatingPenilaian" name="RatingPenilaian" type="hidden">
                        </div>
                    </div>
                    <br />
                    <div class="row" id="divKesimpulanSaran">
                        <div class="col-md-12">
                            <label>Kesimpulan dan Saran</label>
                            <textarea name="Interaction_KesimpulanSaran" id="Interaction_KesimpulanSaran" class="form-control" aria-invalid="false" title="Kesimpulan Dan Saran"></textarea>
                        </div>
                    </div>--%>
                </div>
                <div class="card-footer">
                    <div class="text-end">
                        <a href="#" class="btn btn-primary w-sm" onclick="ButtonActionInteractionSubmit()" id="ButtonActionInteractionSubmit">Submit</a>
                    </div>
                </div>
            </div>
            <div class="card" id="DivHistoryPenilaian">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#HistoryInteraction" role="tab" aria-selected="true" onclick="JourNeyInteraction('')">
                                <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                <span class="d-none d-sm-block">History Interaction</span>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#HistoryKomentar" role="tab" aria-selected="false" tabindex="-1" onclick="JourNeyHistoryComments()">
                                <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                <span class="d-none d-sm-block">History Komentar</span>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#KesimpulanSaran" role="tab" aria-selected="false" tabindex="-1" onclick="JourNeyKesimpulanSaran()">
                                <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                <span class="d-none d-sm-block">Kesimpulan Dan Saran</span>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#HistoryPenilaian" role="tab" aria-selected="false" tabindex="-1" onclick="JourNeyHistoryPenilaian()">
                                <span class="d-block d-sm-none"><i class="fas fa-cog"></i></span>
                                <span class="d-none d-sm-block">History Penilaian</span>
                            </a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content p-3 text-muted">
                        <div class="tab-pane active" id="HistoryInteraction" role="tabpanel">
                            <div id="JourneyHistoryInteraction" class="verti-timeline left-timeline"></div>
                        </div>
                        <div class="tab-pane" id="HistoryKomentar" role="tabpanel">
                            <div id="JourneyHistoryKomentar" class="verti-timeline left-timeline"></div>
                        </div>
                        <div class="tab-pane" id="KesimpulanSaran" role="tabpanel">
                            <div id="JourneyKesimpulanSaran" class="verti-timeline left-timeline"></div>
                        </div>
                        <div class="tab-pane" id="HistoryPenilaian" role="tabpanel">
                            <div class="row" id="JourNeyHistoryPenilaian"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-comments" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Komentar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="mb-3">
                            <textarea rows="2" id="textcomments" name="textcomments" style="width: 100%;"></textarea>
                        </div>
                        <div class="mb-3">
                            <input type="file" name="filesComment" class="form-control">
                        </div>
                        <div class="mt-3">
                            <div id="CommentAttachment" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" type="text" class="btn btn-primary w-sm float-right" onclick="ButtonActionComment()" id="ButtonActionComment">Submit</a>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-skor" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalSkor">Form Skor Penilaian</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <table class="table" id="TrmGrupingPenilaian">
                                <thead>
                                    <tr class="table-light">
                                        <th scope="col" style="width: 1000px;">Aspek Callmoon</th>
                                        <th scope="col" style="width: 100px;">Skor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <hr />
                            <table class="table" id="TrmModalSkorPenilaian">
                                <thead>
                                    <tr class="table-light">
                                        <th scope="col" style="width: 1000px;">Total Skor</th>
                                        <th scope="col" style="width: 100px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger w-sm float-left" onclick="CloseTotalSkorPenilaian()">Close</button>
                    <button type="button" class="btn btn-primary w-sm float-right" onclick="CloseTotalSkorPenilaian()">Done</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-skorpreview" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalSkorPreview">Form Skor Penilaian</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <table class="table" id="TrmModalPreviewSkorPenilaian">
                                <thead>
                                    <tr class="table-light">
                                        <th scope="col" style="width: 1000px;">Total Skor</th>
                                        <th scope="col" style="width: 100px;"></th>
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
    <div class="modal fade" id="modal-kesimpulan" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalkesimpulan">Form Kesimpulan & Saran</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="mb-3">
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s1" onclick="click1()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s2" onclick="click2()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s3" onclick="click3()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s4" onclick="click4()"></i>
                            <i class="fa fa-star font-size-24" aria-hidden="true" id="s5" onclick="click5()"></i>
                            <input id="RatingPenilaian" name="RatingPenilaian" type="hidden">
                        </div>
                        <div class="mb-3">
                            <textarea rows="2" id="Interaction_KesimpulanSaran" name="Interaction_KesimpulanSaran" style="width: 100%;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" type="text" class="btn btn-light w-sm float-right" onclick="ButtonCancelkesimpulan()" id="ButtonCancelkesimpulan">Submit</a>
                    <a href="#" type="text" class="btn btn-primary w-sm float-right" onclick="ButtonActionComment()" id="ButtonActionkesimpulan">Submit</a>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var Interaction_Header = CKEDITOR.replace('Interaction_Header');
        Interaction_Header.config.height = 200;
        Interaction_Header.config.toolbar = 'Basic';
        Interaction_Header.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-',]
            ];
        var textcomments = CKEDITOR.replace('textcomments');
        textcomments.config.height = 170;
        textcomments.config.toolbar = 'Basic';
        textcomments.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-',]
            ];
        var Interaction_Description = CKEDITOR.replace('Interaction_Description');
        Interaction_Description.config.height = 200;
        Interaction_Description.config.toolbar = 'Basic';
        Interaction_Description.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-',]
            ];
        var Interaction_KesimpulanSaran = CKEDITOR.replace('Interaction_KesimpulanSaran');
        Interaction_KesimpulanSaran.config.height = 200;
        Interaction_KesimpulanSaran.config.toolbar = 'Basic';
        Interaction_KesimpulanSaran.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-',]
            ];
    </script>
</asp:Content>
