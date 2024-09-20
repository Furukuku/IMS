<?php

use App\Http\Middleware\CheckIfActive;
use App\Http\Middleware\CheckIfAdmin;
use App\Http\Middleware\CheckIfApproved;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => CheckIfAdmin::class,
            'approved' => CheckIfApproved::class,
            'active' => CheckIfActive::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
