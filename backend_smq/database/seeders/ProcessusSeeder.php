<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Processus;

class ProcessusSeeder extends Seeder
{
    public function run(): void
    {
        Processus::create([
            'name' => 'Processus Achat',
            'description' => 'Gère les achats de matériels et fournitures',
            'responsable_id' => 2,
            'created_by' => 1,
        ]);

        Processus::create([
            'name' => 'Processus RH',
            'description' => 'Gère le recrutement et la gestion du personnel',
            'responsable_id' => 2,
            'created_by' => 1,
        ]);

        Processus::create([
            'name' => 'Processus Formation',
            'description' => 'Supervise les activités de formation interne',
            'responsable_id' => 2,
            'created_by' => 1,
        ]);
    }
}
