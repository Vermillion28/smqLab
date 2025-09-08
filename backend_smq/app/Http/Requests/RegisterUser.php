<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //validateur pour pouvoir créer un document

            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6',

        ];
    }

    //pour retourner la liste des erreurs : au cas où la validation échoue
    public function failedValidation(Validator $validator)
    {
       throw new HttpResponseException(response()->json([
            'success'=> false,
            'status_code'=> 422,
            'error'=> true,
            'message'=> 'Erreur de validation',
            'errorsList'=> $validator->errors()
       ]));
    }

    //pour renvoyer le message en français
    public function messages()
    {
       return [
        'name.required'=>'Un nom doit être fourni',
        'email.required'=>'Une adresse mail doit être fourni',
        'email.email'=>'adresse email non valide',
        'email.unique'=>'Cette adresse mail existe déjà',
        'password.required'=>'Le mot de passe est requis',
        'password.min'=> 'Un mot de passe d\'au moins 6 caractères est requis'

       ]; 
    }
}
