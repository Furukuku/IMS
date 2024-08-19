<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use App\Models\File as FileModel;

class PostController extends Controller
{
    /**
     * Gets the posts of the user.
     * @return \Inertia\Inertia
     */
    public function index()
    {
        $posts = Post::where('user_id', auth()->id())->latest()->get();
        return Inertia::render('Dashboard', ['posts' => $posts]);
    }

    /**
     * Gets the post based on id.
     * @param int $id
     * @return \Inertia\Inertia
     */
    public function show($id)
    {
        $post = Post::with([
            'files', 
            'comments' => function($query) {
                $query->with('user')->withCount('replies')->latest()->limit(5);
            }
        ])->withCount(['files', 'comments'])->find($id);

        return Inertia::render('ViewPost', ['post' => $post]);
    }

    /**
     * Creates a new post.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request) 
    {
        $request->validate([
            'title' => ['required', 'max:100', 'string'],
            'description' => ['required', 'max:2000', 'string'],
            'is_uploadable' => ['required', 'boolean'],
            'files' => ['array', 'max:5'],
            'files.*' => [File::types([
                'pdf',
                'docx',
                'pptx',
                'txt',
                'xlsx',
                'png',
                'jpg',
                'jpeg'
            ])->max('5mb')]
        ]);

        $post = new Post();
        $post->user_id = auth()->id();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->is_uploadable = $request->is_uploadable;
        $post->save();

        if ($post->id) {
            foreach ($request->file('files') as $uploaded_file) {
                $path = $uploaded_file->store('files');
                $file = new FileModel();
                $file->post_id = $post->id;
                $file->user_id = auth()->id();
                $file->path = $path;
                $file->save();
            }
        }

        return to_route('dashboard')->with('message', 'Post added successfully!');
    }

    /**
     * @param string $filename
     */
    public function downloadFile($filename)
    {
        $url = Storage::disk('public')->path('files/' . $filename);
        return response()->download($url , $filename);
    }

    /**
     * @param string $filename
     */
    public function showFile($filename)
    {
        $url = Storage::disk('public')->path('files/' . $filename);
        return response()->file($url);
    }
}
