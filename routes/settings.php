<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('settings')->group(function () {
        Route::inertia('appearance', 'settings/appearance')->name('appearance.edit');

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('security', [SecurityController::class, 'edit'])->name('security.edit');
        Route::put('password', [SecurityController::class, 'update'])->name('user-password.update');
    });
});
