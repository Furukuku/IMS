<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_uploadable'
    ];

    /**
     * Gets the user that owns the post.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Gets the files of the post.
     */
    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    /**
     * Gets the comments of the post.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
