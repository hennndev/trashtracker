<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $title = "TrashTracker | Dashboard";
        return Inertia::render("Dashboard", compact("title"));
    }
}
