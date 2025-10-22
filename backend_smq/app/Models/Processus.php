<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Processus extends Model
{
    use HasFactory;

    protected $table = 'processus';

    protected $fillable = [
        'name',
        'description',
        'responsable_id',
        'created_by',
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function createur()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function nonConformities()
{
    return $this->hasMany(NonConformity::class, 'process_id');
}

}
