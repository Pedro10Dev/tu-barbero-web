<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->string('barber_name')->nullable()->after('barber_profile_id');
        });

        DB::table('appointments')
            ->whereNotNull('barber_profile_id')
            ->update([
                'barber_name' => DB::raw(
                    '(SELECT display_name FROM barber_profiles WHERE barber_profiles.id = appointments.barber_profile_id)'
                ),
            ]);

        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['barber_profile_id']);
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->foreignId('barber_profile_id')->nullable()->change();
            $table->foreign('barber_profile_id')
                ->references('id')
                ->on('barber_profiles')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['barber_profile_id']);
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->dropColumn('barber_name');
            $table->foreign('barber_profile_id')
                ->references('id')
                ->on('barber_profiles')
                ->cascadeOnDelete();
        });
    }
};
