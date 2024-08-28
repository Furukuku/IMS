<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // return [
        //     'name' => fake()->name(),
        //     'email' => fake()->unique()->safeEmail(),
        //     'email_verified_at' => now(),
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ];


        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'student_no' => $this->generateRandomIdNum(),
            'company_name' => fake()->company(),
            'company_address' => fake()->address(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('12345678'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    private function generateRandomIdNum() 
    {
        $id_number = '';

        for ($i = 0; $i < 8; $i++) {
            $id_number .= mt_rand(0, 9);
        }

        return $id_number;
    }
}
