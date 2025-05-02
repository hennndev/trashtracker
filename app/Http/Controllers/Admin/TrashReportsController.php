<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrashReportsController extends Controller
{
    public function index() {
        $title = "TrashTracker | Admin Trash Reports";
        return Inertia::render("admin/TrashReports", compact("title"));
    }
}
