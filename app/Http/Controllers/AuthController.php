<?php

namespace App\Http\Controllers;

use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login() {
        $title = "TrashTrack | Login";
        return Inertia::render("auth/Login", compact("title"));
    }

    public function register() {
        $title = "TrashTrack | Register";
        return Inertia::render("auth/Register", compact("title"));
    }

    public function auth(Request $request) {
        $validated_data = $request->validate([
            "email" => "string|required|email:dns",
            "password" => "string|required|min:6"
        ]);
        $user = User::where("email", $validated_data["email"])->first();

        if(!$user) {
            return back()->withErrors([
                "error" => "Email belum terdaftar"
            ]);
        }
        if(!Hash::check($validated_data["password"], $user["password"])) {
            return back()->withErrors([
                "error" => "Password salah"
            ]);
        }
        if(Auth::attempt($validated_data)) {
            $request->session()->regenerate();
            return redirect()->route("home");
        };
    }

    public function store(Request $request) {
        $validated_data = $request->validate([
            "name" => "required|string",
            "email" => "string|required|email:dns",
            "password" => "string|required|min:6"
        ]);
        $user = User::where("email", $validated_data["email"])->first();
        if($user) {
            return back()->withErrors([
                "error" => "Email ini sudah digunakan"
            ]);
        };
        User::create($validated_data);
        return back()->with("success", "User baru sudah dibuat");
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route("login");
    }
}
