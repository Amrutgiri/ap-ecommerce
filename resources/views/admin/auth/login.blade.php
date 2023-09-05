@extends('layouts.admin.auth.app')
@section('title')
    {{ $title }}
@endsection
@section('content')
    <div class="d-flex flex-center w-lg-50 p-10">
        <!--begin::Card-->
        <div class="card rounded-3 w-md-550px">
            <!--begin::Card body-->
            <div class="card-body p-10 p-lg-20">
                <!--begin::Form-->
                <form class="form w-100" action="{{ route('admin.login.check') }}" method="POST">
                    @csrf
                    <!--begin::Heading-->
                    <div class="text-center mb-11">
                        <!--begin::Logo-->
                        <a href="{{ route('admin.login') }}" class="mb-7">
                            <img alt="Logo" class="h-150px"
                                src="{{ asset('admin-assets/media/logos/Fixr-Upper-Logo-Final-08-white.png') }}" />
                        </a>
                        <!--end::Logo-->
                        <!--begin::Title-->
                        <h1 class="text-dark fw-bolder mb-3">Sign In</h1>
                        <!--end::Title-->
                    </div>
                    <!--begin::Heading-->
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <x-admin.flash-message></x-admin.flash-message>
                    <!--begin::Input group=-->
                    <div class="fv-row mb-8">
                        <!--begin::Email-->
                        <input type="text" placeholder="Email *" name="username" autocomplete="off"
                            class="form-control bg-transparent @error('username') is-invalid @enderror"
                            value="{{ old('username') }}" />
                        <!--end::Email-->
                        @error('username')
                            <div class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </div>
                        @enderror
                    </div>
                    <!--begin::Input group-->
                    <div class="fv-row mb-8" data-kt-password-meter="true">
                        <!--begin::Wrapper-->
                        <div class="mb-1">
                            <!--begin::Input wrapper-->
                            <div class="position-relative mb-3 @error('password') is-invalid @enderror">
                                <input class="form-control bg-transparent @error('password') is-invalid @enderror"
                                    type="password" placeholder="Password *" name="password" id="password"
                                    autocomplete="off">
                                <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                                    data-kt-password-meter-control="visibility">
                                    <i class="bi bi-eye-slash fs-2"></i>
                                    <i class="bi bi-eye fs-2 d-none"></i>
                                </span>
                            </div>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <!--end::Input wrapper-->
                        </div>
                        <!--end::Wrapper-->
                    </div>
                    <!--end::Input group=-->
                    <!--begin::Wrapper-->
                    <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                        <div></div>
                        @if (Route::has('admin.forgotpassword'))
                            <!--begin::Link-->
                            <a href="{{ route('admin.forgotpassword') }}" class="text-gray-800">Forgot Password ?</a>
                            <!--end::Link-->
                        @endif
                    </div>
                    <!--end::Wrapper-->
                    <!--begin::Submit button-->
                    <div class="d-grid mb-10">
                        <button type="submit" class="btn btn-dark">
                            <!--begin::Indicator label-->
                            <span class="indicator-label">Sign In</span>
                            <!--end::Indicator label-->
                        </button>
                    </div>
                    <!--end::Submit button-->
                </form>
                <!--end::Form-->
            </div>
            <!--end::Card body-->
        </div>
        <!--end::Card-->
    </div>
@endsection
@section('pagewise_js')
    <script>
        // A $( document ).ready() block.
        $(document).ready(function() {
            $('#password').keydown(function(e) {
                if (e.ctrlKey && (e.keyCode == 88 || e.keyCode == 67 || e.keyCode == 86)) {
                    return false;
                }
            });
        });
    </script>
@endsection
