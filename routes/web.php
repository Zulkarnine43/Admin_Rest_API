<?php

use Illuminate\Support\Facades\Route;



// Home Data Manage....
Route::get('/CountSummary','HomeController@CountSummary')->middleware('loginCheck');


//Contact Data Manage....
Route::get('/ContactList','ContactController@ContactList')->middleware('loginCheck');
Route::post('/ContactDelete','ContactController@ContactDelete')->middleware('loginCheck');


//Courses Data Manage....
Route::get('/CourseList','CourseController@CourseList')->middleware('loginCheck');
Route::post('/CourseDelete','CourseController@CourseDelete')->middleware('loginCheck');


//Project Data Manage....
Route::get('/ProjectList','ProjectController@ProjectList')->middleware('loginCheck');
Route::post('/ProjectDelete','ProjectController@ProjectDelete')->middleware('loginCheck');
Route::post('/AddProject','ProjectController@AddProject')->middleware('loginCheck');

//Service Data Manage....
Route::get('/ServiceList','ServiceController@ServiceList')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');
Route::post('/AddService','ServiceController@AddService')->middleware('loginCheck');



//Review Data Manage....
Route::get('/ReviewList','ReviewController@ReviewList')->middleware('loginCheck');
Route::post('/ReviewDelete','ReviewController@ReviewDelete')->middleware('loginCheck');
Route::post('/AddReview','ReviewController@AddReview')->middleware('loginCheck');





Route::get('/Login','AdminLoginController@LoginPage');
Route::get('/onLogin/{UserName}/{Password}','AdminLoginController@onLogin');
Route::get('/Logout','AdminLoginController@onLogout');


Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
