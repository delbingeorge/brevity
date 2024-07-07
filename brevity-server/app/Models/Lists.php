<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    protected $fillable = [
        'list_name', 'description',
    ];

    // Relationships
    public function users()
    {
        return $this->belongsToMany(User::class);
    }


    public function issues()
    {
        return $this->hasMany(Issue::class);
    }
}
