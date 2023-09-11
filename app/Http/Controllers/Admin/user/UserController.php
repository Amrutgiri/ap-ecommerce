<?php

namespace App\Http\Controllers\Admin\user;

use Throwable;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Admin\User\UserCreateRequest;
use App\Http\Requests\Admin\User\UserUpdateRequest;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::count();
        return view('admin.user.list', [
            'title' => 'Users',
            'breadcrumb' => array(),
            'users' => $users,
        ]);
    }
    public function listdata(Request $request)
    {

        $columns = array(
            0 => 'id',
            1 => 'full_name',
            2 => 'email',
            3 => 'phone',
            4 => 'status'
        );

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $users = User::orderBy($order, $dir);
        $totalData = $users->count();

        $totalFiltered = $totalData;

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $users = $users->where(function ($query) use ($search) {
                $query->where('full_name', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('date_of_birth', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });

            $totalFiltered =  $users->count();
        }

        $users =  $users->offset($start)
            ->limit($limit)
            ->get();
        $data = array();
        if (!empty($users)) {
            $sr_no = '1';
            foreach ($users as $user) {
                $nestedData['id'] = $user->id;
                $nestedData['srno'] = $sr_no;
                $nestedData['full_name'] = $user->full_name ?? 'N/A';
                if (isset($user->profile) && Storage::exists($user->profile)) {
                    $nestedData['profile'] = Storage::url($user->profile);
                } else {
                    $nestedData['profile'] = asset('admin-assets/media/svg/avatars/blank.svg');
                }

                $nestedData['phone'] = $user->phone;
                $nestedData['email'] = $user->email ?? '';
                $nestedData['status'] = $user->status;
                $nestedData['profile_completion'] = $user->profile_completion;
                $nestedData['show_url'] = route('admin.user.show', $user->id);
                $nestedData['edit_url'] = route('admin.user.edit', $user->id);
                $nestedData['destroy_url'] = route('admin.user.destroy', $user->id);
                $nestedData['status_change_url'] = route('admin.user.status.change', $user->id);
                $nestedData['actions'] = $user->id;
                $data[] = $nestedData;
                $sr_no++;
            }
        }

        $json_data = array(
            "draw"            => intval($request->input('draw')),
            "recordsTotal"    => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data"            => $data
        );

        echo json_encode($json_data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.user.create', [
            'title' => 'User Create',
            'breadcrumb' => array(
                array('title' => 'Users', 'link' => route('admin.user.list'))
            )
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserCreateRequest $request)
    {
        try {

            $userArray = $request->safe()->all();

            dd($userArray);

            $userArray['full_name'] = Str::title($request->full_name);
            $userArray['status'] = '1';
            if ($userArray['password'] != '') {
                $userArray['password'] = Hash::make($userArray['password']);
            }
            $userArray['phone'] = $request->phone;
            $userArray['date_of_birth'] = $request->dateOfBirth;
            $userArray['email'] = $request->email;
            $userArray['address'] = $request->address;

            $user = new User();
            $user = $user->create($userArray);
            if ($user) {

                $file = $request->file('avatar');
                if ($file) {
                    $path = $this->imageUpload($file, 'user');
                    $user->profile = $path;
                    $user->save();
                }
                Session::flash('alert-success', __('messages.admin.user_created_succ'));
            } else {
                Session::flash('alert-danger', __('messages.admin.errors.something_went_wrong'));
            }
            return redirect(route('admin.user.list'));
        } catch (Throwable $exception) {
            Session::flash('alert-danger', $exception->getMessage());
            return redirect(route('admin.user.list'));
        }
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
    public function edit(User $user)
    {

        return view('admin.user.edit', [
            'title' => 'Edit User',
            'user' => $user,
            'breadcrumb' => array(
                array('title' => 'Users', 'link' => route('admin.user.list'))
            )
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, $id)
    {

        try {

            $userArray = $request->safe()->all();
            dd($userArray);
            $userArray['full_name'] = Str::title($request->full_name);
            $dateOfBirth = $request->date_of_birth;
            $userArray['date_of_birth'] = ($dateOfBirth) ? $this->dateFormat($dateOfBirth, "Y-m-d") : '';
            $userArray['phone'] = $request->phone;


            $file = $request->file('profile');
            if ($request->avatar_remove == 1) {
                if ($user->profile && Storage::exists($user->profile)) {
                    $this->imageDelete($user->profile);
                }
                $userArray['profile'] = NULL;
            }
            if ($file) {
                if ($user->profile && Storage::exists($user->profile)) {
                    $this->imageDelete($user->profile);
                }
                $path = $this->imageUpload($file, 'user');
                $userArray['profile'] = $path;
            }

            $userArray['address'] = $request->address;

            if ($user->update($userArray)) {
                Session::flash('alert-success', __('messages.admin.user_updated_succ'));
            } else {
                Session::flash('alert-danger', __('messages.admin.errors.something_went_wrong'));
            }
            return redirect(route('admin.user.list'));
        } catch (Throwable $exception) {
            Session::flash('alert-danger', $exception->getMessage());
            return redirect(route('admin.user.list'));
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Request $request)
    {
        try {
            if ($user->profile && Storage::exists($user->profile)) {
                $this->imageDelete($user->profile);
            }
            if ($user->delete()) {
                // Session::flash('alert-success', __('messages.admin.user_deleted_succ'));
                return response()->json([
                    'state' => true,
                    'message' => __('messages.admin.user_deleted_succ'),
                ]);
            }
            // return redirect(route('admin.user.list'));
        } catch (Throwable $exception) {
            return response()->json([
                'state' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
    public function statusChange(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if ($request->status == '1') {
                $status = '0';
            } else {
                $status = '1';
            }
            $user->status = $status;
            $user->save();
            return response()->json([
                'state' => true,
                'message' => 'Status Changes Successfully.',
            ]);
        } catch (Throwable $exception) {
            return response()->json([
                'state' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
