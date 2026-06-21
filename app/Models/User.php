<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    
    public $timestamps = false;

    public function favourite() {
        return $this->hasMany(Favourite::class);
    }

}
