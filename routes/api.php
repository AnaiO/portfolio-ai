<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('analyse')->group(function () {
    Route::post('/', [PortfolioController::class, 'analyse'])->middleware('throttle:analyse');
    Route::get('/{leadId}/status', [PortfolioController::class, 'status']);
    Route::post('/{leadId}/capture', [PortfolioController::class, 'captureLead']);
});
