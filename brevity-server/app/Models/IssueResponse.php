<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IssueResponse extends Model
{
    use HasFactory;
    protected $fillable = [
        'body',
        'solution',
        'upvote',
        'user_id',
        'issue_id'
    ];
}
