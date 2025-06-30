<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\TrashReport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PDFController extends Controller
{
  public function export(Request $request)
  {
    $statuses = $request->query('status');

    $query = TrashReport::with('user');

    if ($statuses) {
      if (is_string($statuses)) {
        $statuses = [$statuses];
      }
      $query->whereIn('status', $statuses);
    }

    $data = $query->get();

    $pdf = Pdf::loadView('pdf.report', [
      'data' => $data
    ]);

    return $pdf->stream('laporan.pdf');
  }
}
