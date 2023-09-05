<!DOCTYPE html>
<html lang="en">

<head>
    <title>Nitya Fashion Hub</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="author" content="">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <link rel="stylesheet" type="text/css" href="{{ asset('website/css/normalize.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('website/icomoon/icomoon.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="stylesheet" type="text/css" href="{{ asset('website/css/vendor.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('website/style.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- script
    ================================================== -->
    <script src="{{ asset('website/js/modernizr.js') }}"></script>
</head>

<body>

    <x-header></x-header>

    @yield('content')

    <x-footer></x-footer>
    <script src="{{ asset('website/js/jquery-1.11.0.min.js') }}"></script>
    <script src="{{ asset('website/js/plugins.js') }}"></script>
    <script src="{{ asset('website/js/script.js') }}"></script>
</body>

</html>
