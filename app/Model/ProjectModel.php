<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectModel extends Model
{
    protected $table = 'projects_table';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
}
