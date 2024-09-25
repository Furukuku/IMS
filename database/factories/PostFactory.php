<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 2,
            'title' => fake()->realTextBetween(10, 100),
            'description' => fake()->paragraph(5),
            'is_uploadable' => $this->randomBool()
        ];
    }

    /**
     * Generates a random boolean.
     * 
     * @return boolean
     */
    private function randomBool(): bool
    {
        return mt_rand(0, 1) === 1;
    }
}
