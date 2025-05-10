<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TrashReportsController extends Controller
{
    public function index() {
        $data = TrashReport::with("user")->get();
        $title = "TrashTracker | Admin Trash Reports";
        return Inertia::render("admin/TrashReports", compact("title", "data"));
    }

    public function update(Request $request, $id) {
        TrashReport::where("id", $id)->update([
            "status" => $request->status
        ]);
        return back()->with("success", "Berhasil mengedit status data laporan sampah");
    }
}
