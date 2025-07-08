<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
  public function index()
  {
    $query = User::with("trash_report")
      ->where("role", "!=", "admin");
    $data = $query
      ->paginate(10)
      ->withQueryString();

    $title = "TrashTracker |  Admin Manajemen Pengguna";
    return Inertia::render("admin/Users", compact("title", "data"));
  }
}
