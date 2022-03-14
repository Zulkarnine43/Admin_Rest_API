<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Model\ClientReviewModel;
use App\Model\ContactTableModel;
use App\Model\CourseTableModel;
use App\Model\ProjectModel;
use App\Model\ServiceModel;
class HomeController extends Controller
{

    function CountSummary(){
        $review= ClientReviewModel::count();
        $contact=ContactTableModel::count();
        $course=CourseTableModel::count();
        $project=ProjectModel::count();
        $service=ServiceModel::count();
        $totalCount=array('review'=>$review,'contact'=>$contact,'course'=>$course,'project'=>$project,'service'=>$service);
        return json_encode($totalCount);
    }

}
