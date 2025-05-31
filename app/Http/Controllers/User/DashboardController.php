<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\TrashReport;
use Carbon\Carbon;
use Cloudinary\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function beranda()
    {
        $data = TrashReport::with("user")
            ->where("user_id", Auth::user()->id)
            ->latest()
            ->get();
        $data_today = TrashReport::with("user", "proof")->whereDate('created_at', Carbon::today())->latest()->get();
        $title = "TrashTrack | Beranda";
        return Inertia::render("Beranda", compact("title", "data", "data_today"));
    }

    public function report_finding()
    {
        $title = "TrashTrack | Laporkan Temuan";
        return Inertia::render("ReportFinding", compact("title"));
    }

    public function history()
    {
        $data = TrashReport::with("user", "proof")
            ->where("user_id", Auth::user()->id)
            ->latest()
            ->get();
        $title = "TrashTrack | History";
        return Inertia::render("History", compact("title", "data"));
    }

    public function panduan()
    {
        $title = "TrashTrack | Panduan";
        return Inertia::render("Panduan", compact("title"));
    }


    public function store(Request $request)
    {
        $validated_data = $request->validate([
            "description" => "string|required",
            "full_address" => "string|required",
            "latitude" => "numeric|required|between:-90,90",
            "longitude" => "numeric|required|between:-180,180",
            "photo" => "required|image|max:2048",
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

        // Menyimpan data ke database
        TrashReport::create([
            'user_id' => Auth::user()->id,
            'photo' => $secureUrl,
            "description" => $validated_data["description"],
            "full_address" => $validated_data["full_address"],
            "latitude" => $validated_data["latitude"],
            "longitude" => $validated_data["longitude"]
        ]);
        return back()->with("success", "Berhasil membuat data laporan sampah");
    }

    public function update(Request $request, $id)
    {
        $validated_data = $request->validate([
            "status" => "string|required"
        ]);
        TrashReport::where("id", $id)->update($validated_data);
        return back()->with("succes", "Berhasil mengedit laporan sampah");
    }

    public function destroy($id)
    {
        TrashReport::where("id", $id)->delete();
        return back()->with("success", "Laporan sampah berhasil dihapus");
    }
}
