<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\TrashReportsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Models\TrashReport;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route untuk kondisi apapun
Route::get("/", function() {
  $title = "TrashTrack | Homepage";
  return Inertia::render("Home", compact("title"));
})->middleware("is_home")->name("home");

// Route untuk yang belum login
Route::middleware("guest")->controller(AuthController::class)->group(function() {
  Route::get("/login", "login")->name("login");
  Route::get("/register", "register")->name("register");
  Route::post("/login", "auth")->name("login.auth");
  Route::post("/register", "store")->name("register.store");
});

// Route untuk siapa saja yang login
Route::middleware("auth")->group(function() {
  Route::post("/logout", [AuthController::class, "logout"])->name("auth.logout");
});

// Route untuk user biasa
Route::middleware(["auth", "is_user"])->group(function() {
  Route::get("/beranda", [UserDashboardController::class, "beranda"])->name("beranda");
  Route::get("/laporkan-temuan", [UserDashboardController::class, "report_finding"])->name("report_finding");  
  Route::get("/history", [UserDashboardController::class, "history"])->name("history");
  Route::get("/panduan", [UserDashboardController::class, "panduan"])->name("panduan");

  Route::post("/laporkan-temuan", [UserDashboardController::class, "store"])->name("report_finding.store");
  Route::put("/laporkan-temuan/{id}", [UserDashboardController::class, "update"]);
});

// Route untuk admin saja
Route::middleware(["auth", "is_admin"])->group(function() {
  Route::prefix("admin")->group(function() {
    Route::get("/dashboard", [AdminDashboardController::class, "index"])->name("admin.dashboard");
    Route::get("/trash-reports", [TrashReportsController::class, "index"])->name("admin.trash-reports");
    // Route::get("/map")->name("admin.map");

    Route::patch("/laporan-temuan/{id}", [TrashReportsController::class, "update"])->name("admin.laporan-temuan.update");
  });
});