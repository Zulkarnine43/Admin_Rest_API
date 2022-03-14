<?php


namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class AdminLoginModel extends Model
{

    protected $table = 'admin_login';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

}
