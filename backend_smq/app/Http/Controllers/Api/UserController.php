<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\SetPasswordMail;
use App\Http\Requests\RegisterUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    // ----------------------------
    // Inscription Admin
    // ----------------------------
    public function register(RegisterUser $request)
    {
        try {
            // Vérifier s'il existe déjà un admin
        if (User::where('role', 'ADMIN')->exists()) {
            return response()->json([
                'success' => false,
                'status_code' => 403,
                'message' => 'Un administrateur existe déjà. Impossible d’en créer un autre.'
            ], 403);
        }
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = 'ADMIN';
            $user->password_set = true;
            $user->save();

            return response()->json([
                'success' => true,
                'status_code' => 201,
                'message' => 'Administrateur inscrit avec succès',
                'user' => $user->only(['id','name','email','role','password_set','created_at','updated_at'])
            ], 201);

        } catch(Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // ----------------------------
    // Connexion
    // ----------------------------
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'status_code' => 401,
                'message' => 'Informations invalides'
            ], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'status_code' => 200,
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user->only(['id','name','email','role','password_set','created_at','updated_at'])
        ]);
    }

    // ----------------------------
    // Déconnexion
    // ----------------------------
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success'  => true,
            'status_code' => 200,
            'message' => 'Déconnexion réussie.'
        ]);
    }

    // ----------------------------
    // Création d'un utilisateur par Admin
    // ----------------------------
    public function createUser(Request $request)
{
    if(auth()->user()->role !== 'ADMIN') {
        return response()->json([
            'success' => false,
            'status_code' => 403,
            'message' => 'Accès refusé : seuls les administrateurs peuvent créer des utilisateurs.'
        ], 403);
    }

    try {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:RESPONSABLE,CO_RESPONSABLE,COLLABORATEUR,AUDITEUR'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => null,
            'password_set' => false,
        ]);

        $token = Str::random(60);
        $user->set_password_token = $token;
        $user->save();

        Mail::to($user->email)->send(new SetPasswordMail($user, $token));

        return response()->json([
            'success' => true,
            'status_code' => 201,
            'message' => 'Utilisateur créé avec succès',
            'user' => $user->only(['id','name','email','role','password_set','set_password_token','created_at','updated_at'])
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'status_code' => 422,
            'errors' => $e->errors(),
            'message' => 'Erreur de validation'
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'status_code' => 500,
            'message' => $e->getMessage()
        ], 500);
    }
}


    // ----------------------------
    // Définir le mot de passe via email
    // ----------------------------
    public function setPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)
                    ->where('set_password_token', $request->token)
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'status_code' => 400,
                'message' => 'Token invalide ou utilisateur non trouvé.'
            ], 400);
        }

        $user->password = Hash::make($request->password);
        $user->password_set = true;
        $user->set_password_token = null;
        $user->save();

        return response()->json([
            'success' => true,
            'status_code' => 200,
            'message' => 'Mot de passe défini avec succès',
            'user' => $user->only(['id','name','email','role','password_set'])
        ],200);
    }

    public function updateUserRole(Request $request, $id)
{
    if (auth()->user()->role !== 'ADMIN') {
        return response()->json([
            'success' => false,
            'status_code' => 403,
            'message' => 'Accès refusé : seuls les administrateurs peuvent modifier les rôles.'
        ], 403);
    }

    $request->validate([
        'role' => 'required|in:RESPONSABLE,COLLABORATEUR'
    ]);

    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'status_code' => 404,
            'message' => 'Utilisateur non trouvé'
        ], 404);
    }

    // Interdire de modifier l’admin unique
    if ($user->role === 'ADMIN') {
        return response()->json([
            'success' => false,
            'status_code' => 403,
            'message' => 'Impossible de modifier le rôle de l’administrateur.'
        ], 403);
    }

    $user->role = $request->role;
    $user->save();

    return response()->json([
        'success' => true,
        'status_code' => 200,
        'message' => 'Rôle modifié avec succès',
        'user' => $user->only(['id','name','email','role'])
    ]);
}

public function deleteUser($id)
{
    if (auth()->user()->role !== 'ADMIN') {
        return response()->json([
            'success' => false,
            'status_code' => 403,
            'message' => 'Accès refusé : seuls les administrateurs peuvent supprimer un utilisateur.'
        ], 403);
    }

    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'status_code' => 404,
            'message' => 'Utilisateur non trouvé'
        ], 404);
    }

    // Interdire de supprimer l’admin unique
    if ($user->role === 'ADMIN') {
        return response()->json([
            'success' => false,
            'status_code' => 403,
            'message' => 'Impossible de supprimer l’administrateur.'
        ], 403);
    }

    $user->delete();

    return response()->json([
        'success' => true,
        'status_code' => 200,
        'message' => 'Utilisateur supprimé avec succès'
    ]);
}

public function getAllUsers(Request $request)
{
    $admin = Auth::user();

    if ($admin->role !== 'ADMIN') {
        return response()->json([
            'success' => false,
            'message' => 'Accès refusé. Seul l’administrateur peut voir la liste des utilisateurs.'
        ], 403);
    }

    $query = User::query();

    // 🔎 Filtres dynamiques
    if ($request->has('name')) {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    if ($request->has('email')) {
        $query->where('email', 'like', '%' . $request->email . '%');
    }

    if ($request->has('role')) {
        $query->where('role', $request->role);
    }

    //  Pagination : par défaut 10 utilisateurs par page
    $perPage = $request->get('per_page', 15);
    $users = $query->paginate($perPage);

    return response()->json([
        'success' => true,
        'users' => $users
    ]);
}


}
