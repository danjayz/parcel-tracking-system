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
        Schema::create('parcels', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique(); // Unique tracking number
            $table->string('sender_name'); // Sender name
            $table->string('receiver_name'); // Receiver name
            $table->string('address_line1'); // Address line 1
            $table->string('city'); // City
            $table->string('district'); // District
            $table->string('state')->default('tracking created');
            $table->decimal('weight', 8, 2); // Weight (e.g., 99,999.99)
            $table->string('dimensions'); // Dimensions (e.g., "10x10x10 cm")
            $table->string('pickup_location');
            $table->text('description')->nullable(); // Description (nullable)
            $table->text('comments')->nullable(); // Comments (nullable)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parcels');
    }
};
