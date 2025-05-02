<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrashReport extends Model
{
    protected $fillable = ["photo", "description", "latitude", "longitude", "status", "user_id"];
}
