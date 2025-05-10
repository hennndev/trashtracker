<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\TrashReport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function export()
    {
        $data = TrashReport::with("user")->get();
        $pdf = Pdf::loadView('pdf.report', [
            "data" => $data
        ]);
        return $pdf->stream('laporan.pdf'); 
    }
}