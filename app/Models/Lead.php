<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'email',
        'name',
        'analysis_result',
        'status',
        'error_message',
        'session_id',
    ];

    protected $casts = [
        'analysis_result' => 'array',
    ];

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isProcessing(): bool
    {
        return in_array($this->status, ['pending', 'processing']);
    }

    public function hasFailed(): bool
    {
        return $this->status === 'failed';
    }
}