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
        Schema::create('trash_report_proofs', function (Blueprint $table) {
            $table->id();
            $table->string("photo");
            $table->text("description");
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->foreignId("trash_report_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trash_report_proofs');
    }
};
