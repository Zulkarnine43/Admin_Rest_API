<?php

namespace App\Http\Controllers;

use App\Model\ContactTableModel;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    function ContactList(){
        $result=ContactTableModel::all();
        return $result;
    }

    function ContactDelete(Request $request){
        $id=$request->input('id');
        $result=ContactTableModel::where('id','=',$id)->delete();
        return $result;
    }
}
