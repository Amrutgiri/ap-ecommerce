@foreach (['danger', 'warning', 'success', 'info', 'secondary', 'primary', 'dark', 'light'] as $msg)
    @if (Session::has('alert-' . $msg))
        <div
            class="alert alert-{{ $msg }} d-flex align-items-center p-3 mb-10 alert-dismissable alert-auto-dismissable">
            <!--begin::Svg Icon | path: icons/duotune/general/gen048.svg-->
            <span class="svg-icon svg-icon-2hx svg-icon-{{ $msg }} me-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3"
                        d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                        fill="currentColor"></path>
                    @if ($msg == 'success')
                        <path
                            d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z"
                            fill="currentColor"></path>
                    @elseif($msg == 'danger')
                        <rect opacity="0.5" x="8.05025" y="15.1356" width="11" height="1" rx="1"
                            transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                        <rect x="8.46447" y="7.05029" width="11" height="1" rx="1"
                            transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                    @elseif($msg == 'info')
                        <rect x="11" y="17" width="7" height="2" rx="1"
                            transform="rotate(-90 11 17)" fill="currentColor" />
                        <rect x="11" y="9" width="2" height="2" rx="1"
                            transform="rotate(-90 11 9)" fill="currentColor" />
                    @else
                        <rect x="11" y="14" width="7" height="2" rx="1"
                            transform="rotate(-90 11 14)" fill="currentColor" />
                        <rect x="11" y="17" width="2" height="2" rx="1"
                            transform="rotate(-90 11 17)" fill="currentColor" />
                    @endif

                </svg>
            </span>
            <!--end::Svg Icon-->
            <div class="d-flex flex-column">
                <h4 class="mb-1 text-{{ $msg }}">{{ ucfirst($msg) }}</h4>
                <span> {{ Session::get('alert-' . $msg) }}</span>
            </div>
            <!--begin::Close-->
            <button type="button"
                class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
                data-bs-dismiss="alert">
                <i class="bi bi-x fs-1 text-{{ $msg }}"></i>
            </button>
            <!--end::Close-->
        </div>
    @endif
@endforeach
