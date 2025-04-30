<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index() {
        $title = "TrashTracker";

        return Inertia::render("Report", compact("title"));
    }
}
