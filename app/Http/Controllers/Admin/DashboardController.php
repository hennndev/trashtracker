<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $data = TrashReport::with("user")->get();
        $data_today = TrashReport::with("user")->whereDate('created_at', Carbon::today())->latest()->get();
        $users = User::where("role", "user")->count();
        $title = "TrashTracker | Admin Dashboard";
        return Inertia::render("admin/Dashboard", compact("title", "data", "users", "data_today"));
    }
}
