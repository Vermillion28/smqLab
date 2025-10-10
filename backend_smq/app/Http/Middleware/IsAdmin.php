<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifie que l'utilisateur est connecté et est admin
        if ($request->user() && $request->user()->role === 'ADMIN') {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Accès refusé : Admin seulement'
        ], 403);
    }
}
