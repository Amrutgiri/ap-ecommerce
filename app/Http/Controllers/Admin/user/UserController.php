<?php

namespace App\Http\Controllers\Admin\user;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
