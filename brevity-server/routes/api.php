<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\IssuePostController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\ProfileController;


Route::post('/google-signin', [AuthController::class, 'googleSignIn']);

Route::post('/profile/update', [ProfileController::class, 'editProfile']);

Route::post('/post-issue', [IssuePostController::class, 'postIssue']);

Route::post('/explore-search', [ExploreController::class, 'exploreSearch']);

Route::post('/join-list', [ListController::class, 'joinList']);

Route::post('/leave-list', [ListController::class, 'leaveList']);

Route::post('/get-all-lists', [ListController::class, 'getMyLists']);

