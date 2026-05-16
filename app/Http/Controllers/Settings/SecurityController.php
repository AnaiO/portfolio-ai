<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class SecurityController extends Controller
{
    public function edit(Request $request): InertiaResponse|RedirectResponse
    {
        if (
            Features::enabled(Features::twoFactorAuthentication()) &&
            Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')
        ) {
            $confirmedAt = $request->session()->get('auth.password_confirmed_at', 0);

            if (time() - $confirmedAt >= config('auth.password_timeout', 10800)) {
                return redirect()->route('password.confirm');
            }
        }

        $canManageTwoFactor = Features::enabled(Features::twoFactorAuthentication());

        $data = [
            'canManageTwoFactor' => $canManageTwoFactor,
            'passwordRules'      => $this->passwordRules(),
        ];

        if ($canManageTwoFactor) {
            $data['twoFactorEnabled']    = ! is_null($request->user()->two_factor_secret);
            $data['requiresConfirmation'] = Fortify::confirmsTwoFactorAuthentication();
        }

        return Inertia::render('settings/security', $data);
    }

    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        return redirect()->route('security.edit');
    }

    private function passwordRules(): string
    {
        return 'minlength: 8;';
    }
}
