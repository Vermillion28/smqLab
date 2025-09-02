<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\LogUserRequest;

class UserController extends Controller
{
    public function register(RegisterUser $request)
    {
       try{
             //dd('ok');
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
       // $user->password = hash::make($request->password, [
       // 'round'=>12]);//methode pour hasher un mdp :pour plus sécuriser le mdp

        $user->save();

        return response()->json([
            'status_code'=> 200,
            'message'=>'Utilisateur enregistré',
            'user'=>$user
        ]);

       }catch(Exception $e){
            return response()->json($e);
       }
    }

    public function login(LogUserRequest $request)
    {
        if(auth()->attempt($request->only(['email', 'password']))){
            //si les infos sont correcte
            //on récupère l'utilisateur qui essai de se connecter
            $user = auth()->user();

            //on créee un token se basant sur les informations de l'utilisateur; en appellant une méthode méconnu de laravel pour lui dire de créer un token en lui passant un clé de sécurité qui ne doit être connu qu'au backend et on converti le token qui sera généré en plainTextToken
            $token = $user->createToken('MA_CLE_SECRETE_VISIBLE_UNIQUEMENT_AU_BACKEND')->plainTextToken;

             return response()->json([
            'status_code'=> 200,
            'status_message'=>'Utilisateur connecté',
            'user'=> $user,
            'token'=> $token
        ]);

        }else{
            //Si les infos ne correspondent à aucun utilisateur
             return response()->json([
            'status_code'=> 403,
            'message'=>'Information non valide',
        ]);
        }
    }
}
