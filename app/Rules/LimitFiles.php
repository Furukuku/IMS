<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Post;

class LimitFiles implements ValidationRule
{
    private $post_id;

    public function __construct($post_id)
    {
        $this->post_id = $post_id;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $post = Post::withCount('files')->find($this->post_id);
        
        if (count($value) + $post->files_count > 5) {
            $fail('The :attribute field must not have more than 5 items.');
        }
    }
}
