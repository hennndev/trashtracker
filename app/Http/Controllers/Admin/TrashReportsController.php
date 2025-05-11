<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TrashReportsController extends Controller
{
    public function index(Request $request) {
        $page = $request->query("page");
        $data = TrashReport::with("user")->latest()->paginate(10);
        if($page > $data->lastPage() || $page < 0) {
            return redirect()->route('admin.trash_report');
        }
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
