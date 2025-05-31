<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrashReportProof extends Model
{
    protected $fillable = ["photo", "description", "verified_at", "trash_report_id"];

    public function report() {
      return $this->belongsTo(TrashReport::class, "trash_report_id");
    }
}
