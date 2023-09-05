<div id="kt_app_footer" class="app-footer">
    <!--begin::Footer container-->
    <div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        <!--begin::Copyright-->
        <div class="text-dark order-2 order-md-1">
            <span class="text-muted fw-semibold me-1">{{ Carbon\Carbon::now()->year }}&copy;</span>
            <a href="{{ config('app.url') }}" target="_blank"
                class="text-gray-800 text-hover-primary">{{ config('app.name') }}</a>
        </div>
        <!--end::Copyright-->
    </div>
    <!--end::Footer container-->
</div>
