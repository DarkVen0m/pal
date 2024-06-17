<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
