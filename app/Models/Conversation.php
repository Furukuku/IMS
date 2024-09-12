<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Gets the senders (users) that belongs to the conversation.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_user', 'conversation_id', 'user_id')->withPivot('client_id', 'client_name')->withTimestamps();
    }

    /**
     * Gets the messages of the conversation.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
    
    /**
     * Gets the latest message of the conversation.
     */
    public function latestMessage(): HasOne
    {
        return $this->messages()->one()->latestOfMany();
    }

    /**
     * Gets the conversationUser of the authenticated user.
     */
    public function conversationUser()
    {
        return $this->hasOne(ConversationUser::class)->where('user_id', auth()->id());
    }
}
