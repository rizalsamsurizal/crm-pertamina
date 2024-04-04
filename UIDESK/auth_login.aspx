<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_login.aspx.vb" Inherits="UIDESK.auth_login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <meta charset="utf-8" />
    <title>Sign In</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Pichforest" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="Apps/assets/images/favicon.ico">
    <!-- Bootstrap Css -->
    <%--<link href="Apps/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />--%>
    <link href="Apps/assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="Apps/assets/css/app.min.css" rel="stylesheet" />
    <link href="Apps/assets/css/icons.min.css" rel="stylesheet" />
    <%--  <!-- Icons Css -->
    <link href="Apps/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="Apps/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />--%>
    <script>
        function loginApplikasi() {
            //window.location.open('Apps/dashonic/layouts/ant_01.html');
            //window.open('Apps/dashonic/layouts/ant_01.html');
            window.location.assign('Apps/dashonic/layouts/Uidesk001.aspx');
        }
    </script>
</head>
<body style="background-color: black;">
    <div class="authentication-bg min-vh-100">
        <div class="bg-overlay bg-white"></div>
        <div class="container">
            <div class="d-flex flex-column min-vh-100 px-3 pt-4">
                <div class="row justify-content-center my-auto">
                    <div class="col-lg-10">
                        <div class="py-5">
                            <div class="card auth-cover-card overflow-hidden">
                                <div class="row g-0">
                                    <div class="col-lg-6">
                                        <%-- <div class="auth-img">
                                            <img src="assets/images/logo-light.png" alt="">
                                        </div>--%>
                                        <div class="auth-img1">
                                            <center>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <img src="apps/assets/images/Pertamina.jpeg" alt="" width="300" />
                                            </center>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col-lg-6">
                                        <div class="p-4 p-lg-5 bg-primary h-100 d-flex align-items-center justify-content-center">
                                            <div class="w-100">
                                                <div class="mb-4 mb-md-5">
                                                    <a href="index.html" class="d-block auth-logo">
                                                        <img src="assets/images/logo-light.png" alt="" />
                                                    </a>
                                                </div>

                                                <div class="text-white-50 mb-4">
                                                    <%-- <h5 class="text-white">Welcome Back !</h5>
                                                    <p>Sign in to continue to Dashonic.</p>--%>
                                                    <img src="assets/images/pertamina.png" alt="" width="40" />
                                                </div>
                                                <form runat="server">
                                                    <div class="form-floating form-floating-custom mb-3">
                                                        <input type="text" class="form-control" id="Login_Username" placeholder="Enter User name" runat="server">
                                                        <label for="input-username">Username</label>
                                                        <div class="form-floating-icon">
                                                            <i class="uil uil-users-alt"></i>
                                                        </div>
                                                    </div>
                                                    <div class="form-floating form-floating-custom mb-3">
                                                        <input type="password" class="form-control" id="Login_Password" placeholder="Enter Password" runat="server">
                                                        <label for="input-password">Password</label>
                                                        <div class="form-floating-icon">
                                                            <i class="uil uil-padlock"></i>
                                                        </div>
                                                    </div>

                                                    <div class="form-check form-check-info text-white-50 font-size-16">
                                                        <input class="form-check-input bg-soft-primary" type="checkbox" id="remember-check">
                                                        <label class="form-check-label font-size-14" for="remember-check">
                                                            Remember me
                                                       
                                                        </label>
                                                    </div>

                                                    <div class="mt-3">
                                                        <a class="btn btn-info w-100" onclick="loginApplikasi()" id="Login_ButtonSubmit" runat="server">Log In</a>
                                                    </div>

                                                    <div class="mt-4 text-center">
                                                        <%--<a href="auth-resetpassword-cover.html" class="text-white-50 text-decoration-underline">Forgot your password?</a>--%>
                                                        <a href="#" class="text-white-50 text-decoration-underline">Forgot your password?</a>
                                                    </div>
                                                </form>
                                                <!-- end form -->
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
                            </div>
                            <!-- end card -->
                            <%--<div class="mt-5 text-center text-muted">
                                <p>Don't have an account ? <a href="auth-signup-cover.html" class="fw-medium text-decoration-underline">Signup </a></p>
                            </div>--%>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->

                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center text-muted p-4">
                            <p class="mb-0">
                                &copy;
                           
                                <script>document.write(new Date().getFullYear())</script>
                                Ticketing System Crafted with <i class="mdi mdi-heart text-danger"></i>by Uidesk
                            </p>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
        </div>
        <!-- end container -->
    </div>
    <script src="Apps/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Apps/assets/libs/metismenujs/metismenujs.min.js"></script>
    <script src="Apps/assets/libs/simplebar/simplebar.min.js"></script>
    <script src="Apps/assets/libs/feather-icons/feather.min.js"></script>
</body>
</html>
