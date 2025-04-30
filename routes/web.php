<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function() {
  $title = "TrashTrack | Homepage";
  return Inertia::render("Home", compact("title"));
})->name("home");

Route::middleware("guest")->controller(AuthController::class)->group(function() {
  Route::get("/login", "login")->name("login");
  Route::get("/register", "register")->name("register");

  Route::post("/login", "auth")->name("login.auth");
  Route::post("/register", "store")->name("register.store");
});

Route::middleware("auth")->group(function() {
  Route::post("/logout", [AuthController::class, "logout"])->name("auth.logout");

  Route::get("/dashboard", [DashboardController::class, "index"])->name("dashboard");
  Route::get("/report", [ReportController::class, "index"])->name("report");
});