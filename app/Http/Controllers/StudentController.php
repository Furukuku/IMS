<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class StudentController extends Controller
{
    /**
     * Gets all the students.
     * @return \Inertia\Inertia
     */
    public function index(Request $request)
    {
        if (!is_null($request->input('status'))) {
            $students = User::where('is_admin', false)
                ->where('status', $request->input('status'))
                ->get();

            return Inertia::render('Students', ['students' => $students]);
        };

        $students = User::where('is_admin', false)->get();
        return Inertia::render('Students', ['students' => $students]);
    }

    /**
     * Sets the status of the student to archived.
     */
    public function archive(Request $request)
    {
        $student = User::find($request->id);
        $student->status = 'Archive';
        $student->save();

        if (!is_null($request->input('status'))) {
            return to_route('students', ['status' => $request->input('status')])->with('message', "{$student->first_name} {$student->last_name} archived successfully!");
        }

        return to_route('students')->with('message', "{$student->first_name} {$student->last_name} archived successfully!");
    }

     /**
     * Sets the status of the student to active.
     */
    public function approve(Request $request)
    {
        $student = User::find($request->id);
        $student->status = 'Active';
        $student->save();

        if (!is_null($request->input('status'))) {
            return to_route('students', ['status' => $request->input('status')])->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
        }

        return to_route('students')->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
    }
}
