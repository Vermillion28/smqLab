<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin principal
        User::create([
            'name' => 'Admin Principal',
            'email' => 'admin@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'ADMIN',
            'password_set' => true,
        ]);

        // Responsables
        User::create([
            'name' => 'Responsable Qualité',
            'email' => 'resp.qualite@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'RESPONSABLE',
            'password_set' => true,
        ]);

        User::create([
            'name' => 'Responsable Achats',
            'email' => 'resp.achats@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'RESPONSABLE',
            'password_set' => true,
        ]);

        User::create([
            'name' => 'Responsable Production',
            'email' => 'resp.production@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'RESPONSABLE',
            'password_set' => true,
        ]);

        // Collaborateurs
        User::create([
            'name' => 'Collaborateur 1',
            'email' => 'collab1@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'COLLABORATEUR',
            'password_set' => true,
        ]);

        User::create([
            'name' => 'Collaborateur 2',
            'email' => 'collab2@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'COLLABORATEUR',
            'password_set' => true,
        ]);

        User::create([
            'name' => 'Collaborateur 3',
            'email' => 'collab3@smq.com',
            'password' => Hash::make('password123'),
            'role' => 'COLLABORATEUR',
            'password_set' => true,
        ]);
    }
}
