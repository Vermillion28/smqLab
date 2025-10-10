<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProcessusController;
use App\Http\Controllers\Api\NonConformityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Toutes les routes de l'application passent par ici.
| On distingue les routes publiques (login/register)
| des routes protégées (auth:sanctum).
|
*/

// ---------------------------
// 🔓 Routes publiques
// ---------------------------
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class , 'login']);
Route::post('/set-password', [UserController::class, 'setPassword']);

// ---------------------------
// 🔐 Routes protégées
// ---------------------------
Route::middleware('auth:sanctum')->group(function() {

    // Déconnexion
    Route::post('/logout', [UserController::class , 'logout']);

    // Utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Gestion des utilisateurs (admin)
    Route::post('/create-user', [UserController::class, 'createUser']);
    Route::put('/users/{id}/role', [UserController::class, 'updateUserRole']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
    Route::get('/users', [UserController::class, 'getAllUsers']);

    // ---------------------------
    // ⚙️ Gestion des processus
    // ---------------------------
    Route::get('/processes', [ProcessusController::class, 'index']); // tous les rôles peuvent consulter

    // Routes admin seulement
    Route::middleware('isAdmin')->group(function () {
        Route::post('/processes', [ProcessusController::class, 'store']);
        Route::put('/processes/{id}', [ProcessusController::class, 'update']);
        Route::delete('/processes/{id}', [ProcessusController::class, 'destroy']);
    });

    // ---------------------------
    // 🔹 Récupérer les responsables
    // ---------------------------
    Route::get('/responsables', function () {
        return \App\Models\User::whereIn('role', ['RESPONSABLE', 'CO_RESPONSABLE'])
                                ->get(['id', 'name', 'email']);
    })->middleware('isAdmin');

    // ---------------------------
    // 📝 Gestion des non-conformités
    // ---------------------------
    Route::get('/non-conformities', [NonConformityController::class, 'index']);
    Route::post('/non-conformities', [NonConformityController::class, 'store']);
    Route::get('/non-conformities/{id}', [NonConformityController::class, 'show']);
    Route::put('/non-conformities/{id}', [NonConformityController::class, 'update']);
    Route::delete('/non-conformities/{id}', [NonConformityController::class, 'destroy']);

    //Voir un processus
    Route::get('/processes/{id}', [ProcessusController::class, 'show']); 


});
