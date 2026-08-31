<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {

     
        Schema::table('appointments', function (Blueprint $table) {


            $table->text('notes')->nullable()->after('status');


            $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->nullOnDelete();


            $table->string('guest_name')->nullable()->after('user_id');
            $table->string('guest_phone')->nullable()->after('guest_name');


            $table->dropForeign(['client_profile_id']);
            $table->dropColumn('client_profile_id');
        });
    }

    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->foreignId('client_profile_id')->nullable()->constrained('client_profiles');
            $table->dropColumn(['notes', 'user_id', 'guest_name', 'guest_phone']);
        });
    }
};