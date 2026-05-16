<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Route::inertia('/', 'welcome', [
//     'canRegister' => Features::enabled(Features::registration()),
// ])->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/mentions-legales', [PortfolioController::class, 'mentionsLegales'])->name('mentions-legales');

require __DIR__ . '/settings.php';
