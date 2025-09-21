<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Ici on retoune une seule chose
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Inscription
Route::post('/register', [UserController::class, 'register']);

//Authentification d'un utilisateur
Route::post('/login', [UserController::class , 'login']);

//Une route pour définir le mot de passe
Route::post('/set-password', [UserController::class, 'setPassword']);


//ici on va retourner un groupe de fonction(Pour les routes protégées)
Route::middleware('auth:sanctum')->group(function(){


    //Pour se déconnecter
    Route::post('/logout', [UserController::class , 'logout']);

    //Routourner l'utilisateur actuellemnt connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Seul l’admin peut créer d’autres utilisateurs
    Route::post('/create-user', [UserController::class, 'createUser']);

    // Modifier rôle d’un utilisateur
    Route::put('/users/{id}/role', [UserController::class, 'updateUserRole']);

    // Supprimer un utilisateur
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

    // Pour récupérer tous les utilisateurs 
    Route::get('/users', [UserController::class, 'getAllUsers']);


});