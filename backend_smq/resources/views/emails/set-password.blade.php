<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Définir votre mot de passe</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; padding:20px;">

        <h2 style="color:#333;">Bonjour {{ $name }},</h2>

        <p>Un compte a été créé pour vous dans le système <strong>SMQ</strong>.</p>

        <p>Veuillez définir votre mot de passe en cliquant sur le lien ci-dessous :</p>

        <p style="text-align:center; margin:30px 0;">
            <a href="{{ $url }}" 
               style="background:#007bff; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px;">
                Définir mon mot de passe
            </a>
        </p>

        <p>Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet email.</p>

        <p style="margin-top:30px;">Merci,<br>L’équipe SMQ</p>
    </div>
</body>
</html>
