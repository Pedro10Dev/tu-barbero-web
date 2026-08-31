<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('client_profiles');
    }

    public function down(): void
    {
        // Si quisieras dar marcha atrás podrías recrearla, 
        // pero como ya no la necesitamos, puedes dejarlo vacío.
    }
};
