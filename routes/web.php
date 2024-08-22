<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReplyController;
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
    Route::prefix('post')->controller(PostController::class)->name('post.')->group(function() {
        Route::inertia('/add', 'AddPost')->name('add');
        Route::post('/add', [PostController::class, 'store']);
        Route::get('/{id}', [PostController::class, 'show'])->name('view');
        Route::get('/edit/{id}', [PostController::class, 'edit'])->name('edit');
        Route::put('/update', [PostController::class, 'update'])->name('update');
    });

    Route::prefix('file')->controller(FileController::class)->name('file.')->group(function() {
        Route::get('/show/{filename}', [FileController::class, 'show'])->name('show');
        Route::get('/download/{filename}', [FileController::class, 'download'])->name('download');
    });

    Route::prefix('reply')->controller(ReplyController::class)->name('replies.')->group(function() {
        Route::post('/add', 'store')->name('add');
        Route::get('/show', 'show')->name('show');
    });

    Route::prefix('comment')->controller(CommentController::class)->name('comments.')->group(function() {
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

