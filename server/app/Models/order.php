<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'offer_id',
        'city',
        'street',
        'house_number',
    ];

    public function offer(){
        return $this->belongsTo(offer::class);
    }

    public function user(){
        return $this->belongsTo(user::class);
    }
}
