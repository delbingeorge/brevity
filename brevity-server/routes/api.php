<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\FeedPageController;
use App\Http\Controllers\IssuePostController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\PostSolutionController;
use App\Http\Controllers\ProfileController;


// Authentication routes

Route::post('/google-signin', [AuthController::class, 'SignIn']);
Route::get('/google-signout', [AuthController::class, 'signOut']);

// Routes which needs authentication

// Route::middleware('auth')->group(function () {
Route::post('/profile/update', [ProfileController::class, 'editProfile']);
Route::post('/post-issue', [IssuePostController::class, 'postIssue']);
Route::post('/explore-search', [ExploreController::class, 'exploreSearch']);
Route::post('/join-list', [ListController::class, 'joinList']);
Route::post('/leave-list', [ListController::class, 'leaveList']);
Route::post('/get-all-lists', [ListController::class, 'getMyLists']);
Route::get('/lists-details/{list_id}', [ListController::class, 'getListsDetails']);
Route::get('/get-posted-issues/{profileId}', [IssuePostController::class, 'getUserIssues']);
Route::get('/get-list-issues/{listId}', [ListController::class, 'getListIssues']);
Route::post('/post-response', [PostSolutionController::class, 'postSolution']);
Route::get('/get-issue-solutions/{issueId}', [PostSolutionController::class, 'resSolution']);
// });

// Routes free of authentication

Route::get('/get-feed/{authValue}', [FeedPageController::class, 'getFeed']);
Route::delete('/delete-issue/{delParams}', [IssuePostController::class, 'deleteIssue']);
