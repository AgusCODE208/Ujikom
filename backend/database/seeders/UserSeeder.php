<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@bioskop.com',
                'password' => Hash::make('password'),
                'role' => 'admin'
            ],
            [
                'name' => 'Owner User',
                'email' => 'owner@bioskop.com',
                'password' => Hash::make('password'),
                'role' => 'owner'
            ],
            [
                'name' => 'Kasir User',
                'email' => 'kasir@bioskop.com',
                'password' => Hash::make('password'),
                'role' => 'kasir'
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@bioskop.com',
                'password' => Hash::make('password'),
                'role' => 'user'
            ]
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => $userData['password']
            ]);
            
            $user->assignRole($userData['role']);
        }
    }
}