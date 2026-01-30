<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController; // <--- MUST HAVE THIS LINE

// Handle CORS preflight request
Route::options('/chat', function () {
    return response()
        ->json(['status' => 'ok'])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->header('Access-Control-Max-Age', '3600');
});

Route::post('/chat', [ChatController::class, 'ask']);