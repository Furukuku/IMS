<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * @param string $filename
     */
    public function show($filename)
    {
        $url = Storage::disk('public')->path('files/' . $filename);
        return response()->file($url);
    }

     /**
     * @param string $filename
     */
    public function download($filename)
    {
        $url = Storage::disk('public')->path('files/' . $filename);
        return response()->download($url , $filename);
    }
}
