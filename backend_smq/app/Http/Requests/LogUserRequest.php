<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LogUserRequest extends FormRequest
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
            // validateur pour pouvoir se connecter
            'email'    => 'required|email|exists:users,email',
            'password' => 'required'
        ];
    }

    // pour retourner la liste des erreurs : au cas où la validation échoue
    protected function failedValidation(Validator $validator) // ⚠️ doit être protected
    {
        throw new HttpResponseException(response()->json([
            'success'    => false,
            'error'      => true,
            'message'    => 'Erreur de validation',
            'errorsList' => $validator->errors()
        ], 422));
    }

    // pour renvoyer le message en français
    public function messages()
    {
        return [
            'email.required'    => 'email non fourni',
            'email.email'       => 'Adresse email non valide',
            'email.exists'      => 'Cette adresse n\'existe pas',
            'password.required' => 'Mot de passe non fourni',
        ]; 
    }
}
