@extends('layouts.admin.app')
@section('pagewise_css')
    <!-- Datatable -->
    <link href="{{ asset('admin-assets/plugins/custom/datatables/datatables.bundle.min.css') }}"
        rel="stylesheet"type="text/css" />
@endsection
@section('title')
    {{ $title }}
@endsection
@section('content')
    <x-admin.flash-message></x-admin.flash-message>
    <div class="col-xl-12 col-lg-12">
        <!--begin::Card-->
        <div class="card">
            <!--begin::Card header-->
            <div class="card-header border-0 pt-6">
                <!--begin::Card title-->
                <div class="card-title">
                    <!--begin::Search-->
                    <div class="d-flex align-items-center position-relative my-1">
                        <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                        <span class="svg-icon svg-icon-1 position-absolute ms-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2"
                                    rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                <path
                                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                    fill="currentColor" />
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                        <input type="search" data-kt-filter="search" id="datatable_user_search"
                            class="form-control form-control-solid w-250px ps-14" placeholder="Search user" />
                    </div>
                    <div id="kt_datatable_example_1_export" class="d-none"></div>
                    <!--end::Search-->
                </div>
                <!--begin::Card title-->
                <!--begin::Card toolbar-->
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    @if ($users > 0)
                        <!--begin::Export dropdown-->
                        <button type="button" class="btn btn-light-dark" data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end">
                            <span class="svg-icon svg-icon-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" width="12" height="2" rx="1"
                                        transform="matrix(0 -1 -1 0 12.75 19.75)" fill="currentColor"></rect>
                                    <path
                                        d="M12.0573 17.8813L13.5203 16.1256C13.9121 15.6554 14.6232 15.6232 15.056 16.056C15.4457 16.4457 15.4641 17.0716 15.0979 17.4836L12.4974 20.4092C12.0996 20.8567 11.4004 20.8567 11.0026 20.4092L8.40206 17.4836C8.0359 17.0716 8.0543 16.4457 8.44401 16.056C8.87683 15.6232 9.58785 15.6554 9.9797 16.1256L11.4427 17.8813C11.6026 18.0732 11.8974 18.0732 12.0573 17.8813Z"
                                        fill="currentColor"></path>
                                    <path opacity="0.3"
                                        d="M18.75 15.75H17.75C17.1977 15.75 16.75 15.3023 16.75 14.75C16.75 14.1977 17.1977 13.75 17.75 13.75C18.3023 13.75 18.75 13.3023 18.75 12.75V5.75C18.75 5.19771 18.3023 4.75 17.75 4.75L5.75 4.75C5.19772 4.75 4.75 5.19771 4.75 5.75V12.75C4.75 13.3023 5.19771 13.75 5.75 13.75C6.30229 13.75 6.75 14.1977 6.75 14.75C6.75 15.3023 6.30229 15.75 5.75 15.75H4.75C3.64543 15.75 2.75 14.8546 2.75 13.75V4.75C2.75 3.64543 3.64543 2.75 4.75 2.75L18.75 2.75C19.8546 2.75 20.75 3.64543 20.75 4.75V13.75C20.75 14.8546 19.8546 15.75 18.75 15.75Z"
                                        fill="currentColor"></path>
                                </svg>
                            </span>
                            Export Report
                        </button>
                        <!--begin::Menu-->
                        <!--begin::Menu-->
                        <div id="kt_datatable_example_export_menu"
                            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-175px py-4"
                            data-kt-menu="true">
                            <!--begin::Menu item-->
                            <div class="menu-item px-3">
                                <a href="javascript:void(0);" class="menu-link px-3" data-kt-export="excel">
                                    Export as Excel
                                </a>
                            </div>
                            <!--end::Menu item-->
                            <!--begin::Menu item-->
                            <div class="menu-item px-3">
                                <a href="javascript:void(0);" class="menu-link px-3" data-kt-export="csv">
                                    Export as CSV
                                </a>
                            </div>
                            <!--end::Menu item-->
                        </div>
                        <!--end::Menu-->
                        <div id="kt_datatable_example_buttons" class="d-none"></div>
                    @endif

                    {{-- <a href="{{ route('admin.user.create') }}" class="btn btn-dark">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
                        <span class="svg-icon svg-icon-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2"
                                    rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1"
                                    fill="currentColor" />
                            </svg>
                        </span>
                        <!--end::Svg Icon-->Add
                    </a> --}}
                </div>
                <!--end::Card toolbar-->
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class="card-body py-4">
                <!--begin::Table-->
                <table class="table align-middle table-row-dashed fs-6 gy-5" id="user_table">
                    <!--begin::Table head-->
                    <thead>
                        <!--begin::Table row-->
                        <tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th class="w-80px">Sr No.</th>
                            <th class="min-w-100px">Full Name</th>
                            <th class="min-w-100px">E-mail</th>
                            <th class="min-w-100px">Mobile</th>
                            <th class="min-w-50px">Status</th>
                            <th class="text-end min-w-120px">Actions</th>
                        </tr>
                        <!--end::Table row-->
                    </thead>
                    <!--end::Table head-->
                    <!--begin::Table body-->
                    <tbody class="text-gray-600 fw-semibold">

                    </tbody>
                    <!--end::Table body-->
                </table>
                <!--end::Table-->
            </div>
            <!--end::Card body-->
        </div>
        <!--end::Card-->
    </div>
@endsection
@section('pagewise_js')
    <script src="{{ asset('admin-assets/plugins/custom/datatables/datatables.bundle.min.js') }}"></script>
    <script>
        $(document).ready(function() {});
        var listDataUrl = "{{ route('admin.user.listdata') }}";
        // begin datatables code
    </script>
    <script src="{{ asset('admin-assets/js/page_js/user/list.js') }}?{{ time() }}"></script>
@endsection
