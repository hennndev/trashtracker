<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrashReport extends Model
{
    protected $fillable = ["photo", "description", "full_address", "latitude", "longitude", "status", "status_description", "user_id"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setPhotoAttribute($value)
    {
        $this->attributes['photo'] = filter_var($value, FILTER_SANITIZE_URL);
    }

    public function proof() {
      return $this->hasOne(TrashReportProof::class);
    }
}
