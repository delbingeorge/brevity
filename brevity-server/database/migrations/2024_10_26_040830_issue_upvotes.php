<?php

// Migration to create issue_upvotes table
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueUpvotesTable extends Migration
{
    public function up()
    {
        Schema::create('issue_upvotes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('issue_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Foreign keys
            $table->foreign('issue_id')->references('id')->on('issues')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Ensure unique upvote per user and issue
            $table->unique(['issue_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('issue_upvotes');
    }
}

