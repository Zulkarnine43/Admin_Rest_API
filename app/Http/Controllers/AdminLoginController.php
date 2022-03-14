<?php

namespace App\Http\Controllers;

use App\Model\AdminLoginModel;
use Illuminate\Http\Request;

class AdminLoginController extends Controller
{

    function LoginPage(){
        return view('login');
    }


    function onLogin(Request $request){
        $UserName =$request->UserName;
        $Password =$request->Password;
        $count=AdminLoginModel::where('user_name',$UserName)->where('password',$Password)->count();
        if($count==1){
            $request->session()->put('userNameKey',$UserName);
            return "1";
        }else{
            return "0";
        }
    }

    function onLogout(Request $request){
        $request->session()->flash('userNameKey');
        return redirect('/Login');
    }

}
