<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Post;

class LimitFiles implements ValidationRule
{
    private $post_id, $removed_files;

    public function __construct($post_id, $removed_files)
    {
        $this->post_id = $post_id;
        $this->removed_files = $removed_files;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $post = Post::withCount('files')->find($this->post_id);
        $currentFiles = $post->files_count - count($this->removed_files);
        
        if (count($value) + $currentFiles > 5) {
            $fail('The :attribute field must not have more than 5 items.');
        }
    }
}
