<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = array(
            'full_name' => 'Admin',
            'email' => 'admin1008@yopmail.com',
            'password' => Hash::make('Password@123')
        );
        $exists = Admin::where('email', $admin['email'])->first();
        if (!$exists) {
            Admin::create($admin);
        }
    }
}
