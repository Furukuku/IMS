<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;

class FileController extends Controller
{
    /**
     * Shows the file.
     * @param string $filename
     */
    public function show($filename)
    {
        $url = Storage::disk('public')->path('files/' . $filename);
        return response()->file($url);
    }

     /**
      * Force downloads the file.
     * @param string $filename
     */
    public function download($filename)
    {
        $file = File::where('unique_name', $filename)->first();
        $url = Storage::disk('public')->path('files/' . $filename);
        $download_filename = $file ? $file->orig_name : $filename;
        return response()->download($url , $download_filename);
    }
}
