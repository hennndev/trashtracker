<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\TrashReportsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route untuk kondisi apapun
Route::get("/", function() {
  $title = "TrashTrack | Homepage";
  return Inertia::render("Home", compact("title"));
})->name("home");

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
  Route::get("/dashboard", [DashboardController::class, "index"])->name("dashboard");
  Route::get("/report", [ReportController::class, "index"])->name("report");
  Route::post("/trash-reports", [ReportController::class, "store"])->name("trash-reports.store");
  Route::put("/trash-reports/{id}", [ReportController::class, "update"])->name("trash-reports.update");
  Route::delete("/trash-reports/{id}", [ReportController::class, "destroy"])->name("trash-reports.destroy");

  Route::get("/history", [HistoryController::class, "index"])->name("history");
});

// Route untuk admin saja
Route::middleware(["auth", "is_admin"])->group(function() {
  Route::prefix("admin")->group(function() {
    Route::get("/dashboard", [AdminDashboardController::class, "index"])->name("admin.dashboard");
    Route::get("/trash-reports", [TrashReportsController::class, "index"])->name("admin.trash-reports");
    Route::get("/map")->name("admin.map");

    Route::patch("/trash-reports/{id}")->name("admin.trash-reports.update");
  });
});