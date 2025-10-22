<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NonConformity;
use App\Models\Processus;
use App\Models\User;

class NonConformitySeeder extends Seeder
{
    public function run(): void
    {
        // Récupérer un utilisateur admin pour created_by
        $admin = User::where('role', 'ADMIN')->first();

        // Récupérer tous les processus existants
        $processes = Processus::all();

        if ($processes->isEmpty() || !$admin) {
            $this->command->info('Pas de processus ou d\'admin trouvé, ajoutez-les avant de lancer le seeder.');
            return;
        }

        foreach ($processes as $process) {
            // Vérifier si une non-conformité avec ce code existe déjà
            $code = 'NC-' . rand(100, 999);
            if (!NonConformity::where('code', $code)->exists()) {
                NonConformity::create([
                    'code' => $code,
                    'title' => 'Non-conformité test pour ' . $process->name,
                    'process_id' => $process->id,
                    'description' => 'Description de la non-conformité pour le processus ' . $process->name,
                    'created_by' => $admin->id,
                ]);
            }
        }
    }
}
