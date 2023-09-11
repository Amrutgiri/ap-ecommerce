@extends('layouts.app')

@section('content')
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>My Profile</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('user.update.profile', $user->id) }}" method="POST"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <div class="form-group @error('profile') is-invalid @enderror">
                                        @if ($user->profile)
                                            <img src="{{ asset('website/user/' . $user->profile) }}"
                                                class="w-125px h-125px">
                                            <input type="file" name="profile" class="form-control " id="">
                                        @else
                                            <img src="{{ asset('website/no-image.png') }}" class="w-125px h-125px">
                                            <input type="file" name="profile" class="form-control" id="">
                                        @endif


                                    </div>
                                    @error('profile')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Full Name <span class="text-danger">*</span></label>
                                        <input type="text" name="full_name"
                                            class="form-control  @error('full_name') is-invalid @enderror"
                                            value="{{ old('full_name', $user->full_name ?? '') }}">
                                    </div>
                                    @error('full_name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Email<span class="text-danger">*</span></label>
                                        <input type="email" name="email"
                                            class="form-control @error('email') is-invalid @enderror"
                                            value="{{ old('email', $user->email ?? '') }}">
                                    </div>
                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Phone<span class="text-danger">*</span></label>
                                        <input type="number" name="phone"
                                            class="form-control @error('phone') is-invalid @enderror"
                                            value="{{ old('phone', $user->phone ?? '') }}">
                                    </div>
                                    @error('phone')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Date of Birth<span class="text-danger">*</span></label>
                                        <input type="date" name="date_of_birth"
                                            class="form-control @error('date_of_birth') is-invalid @enderror"
                                            value="{{ old('date_of_birth', $user->date_of_birth ?? '') }}">
                                    </div>
                                    @error('date_of_birth')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Address<span class="text-danger">*</span></label>
                                        <input type="text" name="address"
                                            class="form-control @error('address') is-invalid @enderror"
                                            value="{{ old('address', $user->address ?? '') }}">
                                    </div>
                                    @error('address')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">City<span class="text-danger">*</span></label>
                                        <input type="text" name="city_id"
                                            class="form-control @error('city_id') is-invalid @enderror"
                                            value="{{ old('city_id', $user->city_id ?? '') }}">
                                    </div>
                                    @error('city_id')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">State<span class="text-danger">*</span></label>
                                        <input type="text" name="state_id"
                                            class="form-control @error('state_id') is-invalid @enderror"
                                            value="{{ old('state_id', $user->state_id ?? '') }}">
                                    </div>
                                    @error('state_id')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-group">
                                        <label class="h6">Pincode<span class="text-danger">*</span></label>
                                        <input type="number" name="zipcode"
                                            class="form-control @error('zipcode') is-invalid @enderror"
                                            value="{{ old('zipcode', $user->zipcode ?? '') }}">
                                    </div>
                                    @error('zipcode')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="col-md-12 mb-3">
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary float-end">Update Profile</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
