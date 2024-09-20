<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Gets all the students.
     * @return \Inertia\Inertia
     */
    public function index(Request $request)
    {
        if (!is_null($request->input('status')) && !is_null($request->input('search'))) {
            $students = User::where('is_admin', false)
                ->where('status', $request->input('status'))
                ->where(function($query) use ($request) {
                    $query->whereLike('first_name', "%{$request->input('search')}%")
                        ->orWhereLike('last_name', "%{$request->input('search')}%")
                        ->orWhereLike('student_no', "%{$request->input('search')}%")
                        ->orWhereLike('company_name', "%{$request->input('search')}%")
                        ->orWhereLike('company_address', "%{$request->input('search')}%")
                        ->orWhereLike(DB::raw("CONCAT(first_name, ' ', last_name)"), "%{$request->input('search')}%");
                })
                ->paginate(10);
            $students->appends([
                'status' => $request->input('status'),
                'search' => $request->input('search')
            ]);

            return Inertia::render('Students', [
                'students' => $students,
                'status' => $request->input('status'),
                'search' => $request->input('search')
            ]);
        }

        if (!is_null($request->input('status'))) {
            $students = User::where('is_admin', false)
                ->where('status', $request->input('status'))
                ->paginate(10);
            $students->appends(['status' => $request->input('status')]);

            return Inertia::render('Students', [
                'students' => $students,
                'status' => $request->input('status')
            ]);
        }

        if (!is_null($request->input('search'))) {
            $students = User::where('is_admin', false)
                ->where(function($query) use ($request) {
                    $query->whereLike('first_name', "%{$request->input('search')}%")
                        ->orWhereLike('last_name', "%{$request->input('search')}%")
                        ->orWhereLike('student_no', "%{$request->input('search')}%")
                        ->orWhereLike('company_name', "%{$request->input('search')}%")
                        ->orWhereLike('company_address', "%{$request->input('search')}%")
                        ->orWhereLike(DB::raw("CONCAT(first_name, ' ', last_name)"), "%{$request->input('search')}%");
                })
                ->paginate(10);
            $students->appends(['search' => $request->input('search')]);

            return Inertia::render('Students', [
                'students' => $students,
                'status' => 'All',
                'search' => $request->input('search')
            ]);
        }

        $students = User::where('is_admin', false)->paginate(10);
        return Inertia::render('Students', [
            'students' => $students,
            'status' => 'All'
        ]);
    }

    /**
     * Sets the status of the student to archived.
     */
    public function archive(Request $request)
    {
        $student = User::find($request->id);
        $student->status = 'Archive';
        $student->save();

        if (!is_null($request->input('status')) && !is_null($request->input('search'))) {
            return to_route('students', [
                'status' => $request->input('status'),
                'search' => $request->input('search')
            ])->with('message', "{$student->first_name} {$student->last_name} archived successfully!");
        }

        if (!is_null($request->input('status'))) {
            return to_route('students', ['status' => $request->input('status')])->with('message', "{$student->first_name} {$student->last_name} archived successfully!");
        }

        if (!is_null($request->input('search'))) {
            return to_route('students', ['search' => $request->input('search')])->with('message', "{$student->first_name} {$student->last_name} archived successfully!");
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

        if (!is_null($request->input('status')) && !is_null($request->input('search'))) {
            return to_route('students', [
                'status' => $request->input('status'),
                'search' => $request->input('search')
            ])->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
        }

        if (!is_null($request->input('status'))) {
            return to_route('students', ['status' => $request->input('status')])->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
        }

        if (!is_null($request->input('search'))) {
            return to_route('students', ['search' => $request->input('search')])->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
        }

        return to_route('students')->with('message', "{$student->first_name} {$student->last_name} approved successfully!");
    }
}
