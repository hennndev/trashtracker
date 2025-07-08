<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use App\Models\TrashReportProof;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrashReportProofControll extends Controller
{
  public function index()
  {
    $query = TrashReportProof::with("report.user");
    $data = $query
      ->paginate(10)
      ->withQueryString();

    $title = "TrashTracker | Admin Bukti Laporan Selesai";
    return Inertia::render("admin/TrashReportsProof", compact("title", "data"));
  }

  public function store(Request $request)
  {
    $validated_data = $request->validate([
      "photo" => "required|image|max:2048",
      "description" => "required|string",
      "verified_at" => "required|date"
    ]);
    $uploadedFile = $request->file("photo");
    $cloudinary = new Cloudinary([
      'cloud' => [
        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
        'api_key'    => env('CLOUDINARY_API_KEY'),
        'api_secret' => env('CLOUDINARY_API_SECRET'),
      ],
    ]);
    $uploadedFile = $request->file('photo');
    $response = $cloudinary->uploadApi()->upload($uploadedFile->getRealPath(), [
      'folder' => 'uploads',
    ]);
    $secureUrl = $response["secure_url"];

    TrashReportProof::create([
      'photo' => $secureUrl,
      "description" => $validated_data["description"],
      "verified_at" => $validated_data["verified_at"],
      "trash_report_id" => $request->report_id
    ]);
    TrashReport::where("id", $request->report_id)->update([
      "status" => "done"
    ]);
    return back()->with("success", "Berhasil membuat bukti bahwa laporan sampah sudah ditangani");
  }
}
