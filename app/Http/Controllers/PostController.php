<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use App\Models\File as FileModel;
use App\Rules\LimitFiles;

class PostController extends Controller
{
    /**
     * Gets the posts of the user.
     * @return \Inertia\Inertia
     */
    public function index()
    {
        $posts = Post::latest()->get();
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
                $query->with('user')->withCount('replies')->orderByRaw('user_id = ? DESC', [auth()->id()])->latest()->limit(5);
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

        if ($post && !is_null($request->file('files'))) {
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
     * Renders the post editing page.
     * @param \Illuminate\Http\Request $request
     */
    public function edit(Request $request)
    {
        $post = Post::with('files')->find($request->id);
        return Inertia::render('EditPost', ['post' => $post]);
    }

    /**
     * Updates a post.
     * @param \Illuminate\Http\Request $request
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => ['required', 'integer'],
            'title' => ['required', 'max:100', 'string'],
            'description' => ['required', 'max:2000', 'string'],
            'is_uploadable' => ['required', 'boolean'],
            'removed_files' => ['array'],
            'files' => ['array', new LimitFiles($request->id)],
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
        
        if ($request->removed_files) {
            foreach ($request->removed_files as $file_id) {
                $file = FileModel::find($file_id);
                
                if ($file) {
                    Storage::disk('public')->delete($file->path);
                    $file->delete();
                }
            }
        }

        $post = Post::find($request->id);
        $post->title = $request->title;
        $post->description = $request->description;
        $post->is_uploadable = $request->is_uploadable;
        $post->save();

        if ($post && !is_null($request->file('files'))) {
            foreach ($request->file('files') as $new_file) {
                $path = $new_file->store('files');
                $file = new FileModel();
                $file->post_id = $post->id;
                $file->user_id = $post->user_id;
                $file->path = $path;
                $file->save();
            }
        }

        return to_route('post.view', ['id' => $request->id])->with('message', 'Post updated successfully!');
    }
}
