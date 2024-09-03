<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\MessageController;
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
        Route::post('/add', 'store');
        Route::get('/{id}', 'show')->name('view');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::put('/update', 'update')->name('update');
        Route::delete('/destroy', 'destroy')->name('destroy');
    });

    Route::prefix('file')->controller(FileController::class)->name('file.')->group(function() {
        Route::get('/show/{filename}', 'show')->name('show');
        Route::get('/download/{filename}', 'download')->name('download');
    });

    Route::prefix('reply')->controller(ReplyController::class)->name('replies.')->group(function() {
        Route::post('/add', 'store')->name('add');
        Route::get('/show', 'show')->name('show');
    });

    Route::prefix('comment')->controller(CommentController::class)->name('comments.')->group(function() {
        Route::post('/add', 'store')->name('add');
        Route::get('/show-more', 'showMore')->name('show-more');
    });

    Route::get('/students', [StudentController::class, 'index'])->name('students');
    Route::prefix('student')->controller(StudentController::class)->name('student.')->group(function() {
        Route::patch('/archive', 'archive')->name('archive');
        Route::patch('/approve', 'approve')->name('approve');
    });

    
    Route::prefix('/messages')->controller(MessageController::class)->name('messages.')->group(function() {
        Route::get('/show-more', 'showMore')->name('show-more');
    });

    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations');
    Route::prefix('conversation')->controller(ConversationController::class)->name('conversation.')->group(function() {
        Route::get('/{id}', 'show')->name('view');
    });

    Route::post('/logout', [LogoutController::class, 'logout']);
});

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Login')->name('login');
    Route::inertia('/register', 'Register')->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [LoginController::class, 'store']);
});

