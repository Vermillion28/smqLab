<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        // 🔹 Lien vers la page frontend Next.js pour définir le mot de passe
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000'); // mettre ton frontend URL dans .env si tu veux
        $url = $frontendUrl . "/validationAuth?email={$this->user->email}&token={$this->token}";

        return $this->subject('Définir votre mot de passe')
                    ->markdown('emails.set-password')
                    ->with([
                        'name' => $this->user->name,
                        'url' => $url,
                    ]);
    }
}
