<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index() {
        $title = "TrashTracker | History";
        return Inertia::render("History", compact("title"));
    }
}
