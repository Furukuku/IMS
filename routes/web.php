<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
Route::middleware('auth')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('dashboard');
    Route::inertia('/add-post', 'AddPost')->name('add-post');
    Route::get('/post/{id}', [PostController::class, 'show'])->name('view-post');
    Route::get('/download-file/{filename}', [PostController::class, 'downloadFile'])->name('download-file');
    Route::get('/show-file/{filename}', [PostController::class, 'showFile'])->name('show-file');
    Route::post('/add-post', [PostController::class, 'store']);

    Route::prefix('comments')->controller(CommentController::class)->name('comments.')->group(function () {
        Route::post('/add', 'store')->name('add');
        Route::get('/show-more', 'showMore')->name('show-more');
    });

    Route::post('/logout', [LogoutController::class, 'logout']);
});

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Login')->name('login');
    Route::inertia('/register', 'Register')->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [LoginController::class, 'store']);
});

