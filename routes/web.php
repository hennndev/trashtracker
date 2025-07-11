<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\TrashReportProofControll;
use App\Http\Controllers\Admin\TrashReportsController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



//Route bisa diakses kalo belum login, tapi kalo udah login sebagai user otomatis bakal pindah sendiri ke halaman beranda
// Semisal login sebagai admin bakal pindah sendiri ke halaman /admin/dashboard
Route::get("/", function() {
  $title = "TrashTrack | Homepage";
  return Inertia::render("Home", compact("title"));
})->middleware("is_home")->name("home");


// Route yang bisa diakses kalo belum login, tapi kalo udah login ga bisa diakses
Route::middleware("guest")->controller(AuthController::class)->group(function() {
  Route::get("/login", "login")->name("login");
  Route::get("/register", "register")->name("register");
  Route::post("/login", "auth")->name("login.auth");
  Route::post("/register", "store")->name("register.store");
});



// Route untuk siapa saja yang udah login entah itu user/admin
Route::middleware("auth")->group(function() {
  Route::post("/logout", [AuthController::class, "logout"])->name("auth.logout");
});


// Route yang bisa diakses hanya ketika sudah login dan rolenya adalah user
Route::middleware(["auth", "is_user"])->group(function() {
  Route::get("/beranda", [UserDashboardController::class, "beranda"])->name("beranda");
  Route::get("/laporkan-temuan", [UserDashboardController::class, "report_finding"])->name("report_finding");  
  Route::get("/history", [UserDashboardController::class, "history"])->name("history");
  Route::post("/laporkan-temuan", [UserDashboardController::class, "store"])->name("report_finding.store");
  Route::put("/laporkan-temuan/{id}", [UserDashboardController::class, "update"])->name("report_finding.update");
});


// Route yang bisa diakses hanya ketika sudah login dan rolenya adalah admin
Route::middleware(["auth", "is_admin"])->group(function() {
  Route::prefix("admin")->group(function() {
    Route::get("/dashboard", [AdminDashboardController::class, "index"])->name("admin.dashboard");
    Route::get("/laporan-temuan", [TrashReportsController::class, "index"])->name("admin.trash_report");
    Route::get("/laporan-temuan/lokasi", [TrashReportsController::class, "location"])->name("admin.trash_report.location");
    Route::get("/pengguna", [UsersController::class, "index"])->name("admin.users.index");
    Route::get("/bukti-laporan-selesai", [TrashReportProofControll::class, "index"])->name("admin.trash_report_proof.index");
    

    Route::put("/laporan-temuan/{id}", [TrashReportsController::class, "update"])->name("admin.trash_report.update");

    Route::post("/bukti-laporan-selesai", [TrashReportProofControll::class, "store"])->name("admin.trash_report_proof.store");
    Route::get("/export-pdf/laporan-temuan", [PDFController::class, "export"])->name("admin.pdf-export");
  });
});