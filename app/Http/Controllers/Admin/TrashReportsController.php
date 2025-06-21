<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use App\Models\TrashReportProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TrashReportsController extends Controller
{
  public function index(Request $request)
  {
    $page = $request->query('page');
    $sortBy = $request->query('sort', 'status'); // default sort by 'status'
    $direction = $request->query('direction', 'asc'); // default arah sort

    $data = TrashReport::with('user')
      ->orderBy($sortBy, $direction)
      ->paginate(10)
      ->withQueryString();

    if ($page && ($page > $data->lastPage() || $page < 1)) {
      return redirect()->route('admin.trash_report');
    }

    $title = "TrashTracker | Admin Trash Reports";
    return Inertia::render("admin/TrashReports", compact("title", "data"));
  }

  public function location(Request $request) {
    $title = "Location";
    if(!$request->query("longitude") && !$request->query("latitude")) {
      return redirect()->route("admin.trash_report");
    }
    $longitude = $request->query("longitude");
    $latitude = $request->query("latitude");
    return Inertia::render("admin/LocationTrashReport", compact("title", "longitude", "latitude"));
  }


  public function update(Request $request, $id)
  {
    TrashReport::where("id", $id)->update([
      "status" => $request->status,
      "status_description" => $request->status_description
    ]);
    return back()->with("success", "Berhasil mengedit status data laporan sampah");
  }

  
}
