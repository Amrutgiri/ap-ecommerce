<?php

namespace App\Http\Controllers\Website;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\ImageUploadTrait;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Website\User\UserUpdateRequest;

class WebsiteController extends Controller
{
    use ImageUploadTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('home');
    }
    public function userProfile()
    {
        $user = Auth::user();
        return view('website.user.profile', [
            'user' => $user,
        ]);
    }
    public function updateProfile(User $user, UserUpdateRequest $request)
    {
        $userArray = $request->safe()->all();


        $user->update($userArray);

        return redirect(route('profile'))->with('success', "Profile Updated Successfully");
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
