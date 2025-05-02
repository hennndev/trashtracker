<?php

namespace App\Http\Controllers;

use App\Models\TrashReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index() {
        $title = "TrashTracker | Reports";
        return Inertia::render("Report", compact("title"));
    }

    public function store(Request $request) {
        $validated_data = $request->validate([
            "photo" => "string|required",
            "description" => "string|required",
            "latitude" => "numerice|required|between:-90,90",
            "longitude" => "numerice|required|between:-180,180",
            "status" => "string|required"
        ]);
        TrashReport::create($validated_data);
        return back()->with("success", "Berhasil membuat data laporan sampah");
    }

    public function update(Request $request, $id) {
        $validated_data = $request->validate([
            "photo" => "string|required",
            "description" => "string|required",
            "latitude" => "numerice|required|between:-90,90",
            "longitude" => "numerice|required|between:-180,180",
            "status" => "string|required"
        ]);
        TrashReport::where("id", $id)->update($validated_data);
        return back()->with("succes", "Berhasil mengedit laporan sampah");
    }

    public function destroy($id) {
        TrashReport::where("id", $id)->delete();
        return back()->with("success", "Laporan sampah berhasil dihapus");
    }
}
