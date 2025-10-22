<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NonConformity extends Model
{
    use HasFactory;

    protected $table = 'non_conformities';

    // Champs autorisés pour le mass assignment
    protected $fillable = [
        'code',
        'title',
        'process_id',
        'description',
        'created_by'
    ];

    // Relations
    public function process()
    {
        return $this->belongsTo(Processus::class, 'process_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
