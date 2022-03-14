<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ChartDataModel extends Model
{
    protected $table = 'chart_data';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

}
