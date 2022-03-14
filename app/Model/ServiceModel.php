<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ServiceModel extends Model
{
    protected $table = 'services_table';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
}
