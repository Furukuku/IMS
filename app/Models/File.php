<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'unique_name',
        'orig_name',
        'is_submitted'
    ];

    /**
     * Gets the post that owns the file.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
