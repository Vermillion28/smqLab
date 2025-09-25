<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
{
    // Si c'est une requête API, renvoie un JSON d'erreur 401 au lieu de rediriger
    if ($request->is('api/*')) {
        abort(response()->json([
            'success' => false,
            'message' => 'Non authentifié'
        ], 401));
    }

    // Pour les requêtes web normales
    return route('login'); // Optionnel, pour les pages web
}

}
