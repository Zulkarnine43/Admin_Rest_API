<?php

namespace App\Http\Controllers;

use App\Model\ClientReviewModel;
use App\Model\ContactTableModel;
use App\Model\ProjectModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    function ProjectList(){
        $result=ProjectModel::all();
        return $result;
    }
    function ProjectDelete(Request $request){
        $id=$request->input('id');


        $img_one= ProjectModel::where('id','=',$id)->get(['img_one']);
        $img_two=ProjectModel::where('id','=',$id)->get(['img_two']);

        $img_one_name=explode('/',$img_one[0]['img_one'])[4];
        $img_two_name=explode('/',$img_two[0]['img_two'])[4];

        Storage::delete('public/'.$img_one_name);
        Storage::delete('public/'.$img_two_name);


        $result=ProjectModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddProject(Request $request){
        $projectName=  $request->input('projectName');
        $projectDes=  $request->input('projectDes');
        $projectFeatures=  $request->input('projectFeatures');
        $projectLink=  $request->input('projectLink');

        $photoOnePath=$request->file('photoOne')->store('public');
        $photoOneName=explode("/", $photoOnePath)[1];
        $photoOneURL="http://".$_SERVER['HTTP_HOST']."/storage/".$photoOneName;

        $photoTwoPath=$request->file('photoTwo')->store('public');
        $photoTwoName=explode("/", $photoTwoPath)[1];
        $photoTwoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$photoTwoName;

        $result= ProjectModel::insert(['img_one'=>$photoOneURL, 'img_two'=>$photoTwoURL, 'project_name'=>$projectName, 'short_description'=>$projectDes, 'project_features'=>$projectFeatures, 'live_preview'=>$projectLink]);
        return $result;
    }
}
