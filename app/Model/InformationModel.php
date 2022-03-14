<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class InformationModel extends Model
{
    protected $table = 'information_etc';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
}
