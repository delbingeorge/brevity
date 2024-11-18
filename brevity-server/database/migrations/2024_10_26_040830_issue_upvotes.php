<?php

// Migration to create issue_upvotes table
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueUpvotesTable extends Migration
{
    public function up()
    {
    }

    public function down()
    {
        Schema::dropIfExists('issue_upvotes');
    }
}

