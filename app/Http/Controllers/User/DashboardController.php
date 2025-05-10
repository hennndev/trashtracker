<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function beranda() {
        $data = TrashReport::with("user")
            ->where("user_id", auth()->user()->id)
            ->latest()
            ->get();
        $title = "TrashTrack | Beranda";
        return Inertia::render("Beranda", compact("title", "data"));
    }

    public function report_finding() {
        $title = "TrashTrack | Laporkan Temuan";
        return Inertia::render("ReportFinding", compact("title"));
    }

    public function history() {
        $data = TrashReport::with("user")
            ->where("user_id", auth()->user()->id)
            ->latest()
            ->get();
        $title = "TrashTrack | History";
        return Inertia::render("History", compact("title", "data"));
    }

    public function panduan() {
        $title = "TrashTrack | Panduan";
        return Inertia::render("Panduan", compact("title"));
    }

    
    public function store(Request $request) {
        $validated_data = $request->validate([
            "photo" => "string|required",
            "description" => "string|required",
            "full_address" => "string|required",
            "latitude" => "numeric|required|between:-90,90",
            "longitude" => "numeric|required|between:-180,180",
        ]);
        TrashReport::create([
            "user_id" => auth()->user()->id,
            ...$validated_data
        ]);
        return back()->with("success", "Berhasil membuat data laporan sampah");
    }

    public function update(Request $request, $id) {
        $validated_data = $request->validate([
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
