<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trash_reports', function (Blueprint $table) {
            $table->id();
            $table->string("photo");
            $table->text("description");
            $table->text("full_address");
            $table->decimal("latitude", 10, 7);
            $table->decimal("longitude", 10, 7);
            $table->string("status")->default("pending");
            $table->timestamps();

            $table->foreignId("user_id")->constrained()->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trash_reports');
    }
};
