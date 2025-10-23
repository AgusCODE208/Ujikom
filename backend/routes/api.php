<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/profile/update', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    
    // User (customer) routes - untuk yang sudah login
    Route::middleware('role:user')->group(function () {
        Route::get('/customer/tickets', function () {
            return response()->json(['message' => 'Customer Tickets']);
        });
    });
    
    // Kasir routes
    Route::middleware('role:kasir')->group(function () {
        Route::get('/kasir/transactions', function () {
            return response()->json(['message' => 'Kasir Transactions']);
        });
    });
    
    // Admin routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', function () {
            return response()->json(['message' => 'Admin Dashboard']);
        });
    });
    
    // Owner routes
    Route::middleware('role:owner')->group(function () {
        Route::get('/owner/reports', function () {
            return response()->json(['message' => 'Owner Reports']);
        });
    });
});
