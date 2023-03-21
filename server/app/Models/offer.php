<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'discount_price',
        'type',
        'is_special',
        'created_at',
        'img_url'
    ];

    public function orders(){
        return $this->hasMany(order::class);
    }

}