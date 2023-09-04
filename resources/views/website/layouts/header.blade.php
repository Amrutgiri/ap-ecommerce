<div class="search-popup">
    <div class="search-popup-container">

        <form role="search" method="get" class="search-form" action="">
            <input type="search" id="search-form" class="search-field" placeholder="Type and press enter" value=""
                name="s" />
            <button type="submit" class="search-submit"><a href="#"><i class="icon icon-search"></i></a></button>
        </form>


    </div>
</div>
<header id="header">
    <div id="header-wrap">
        <nav class="secondary-nav border-bottom">
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-md-4 header-contact">
                        <p>Let's talk! <strong>+9375333232</strong>
                        </p>
                    </div>
                    <div class="col-md-4 shipping-purchase text-center">
                        <p>Free shipping on a purchase value of 500/-</p>
                    </div>
                    <div class="col-md-4 col-sm-12 user-items">
                        <ul class="d-flex justify-content-end list-unstyled">

                            <li style="margin-top: 7px;">
                                <a href="cart.html">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </a>
                            </li>
                            <li style="margin-top: 7px;">
                                <a href="wishlist.html">
                                    <i class="fa-solid fa-heart"></i>
                                </a>
                            </li>
                            <li class="user-items search-item pe-3" style="margin-top: 7px;">
                                <a href="#" class="search-button">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </a>
                            </li>

                            @guest
                                @if (Route::has('login'))
                                    <li>
                                        <a href="{{ route('login') }}" class="btn btn-primary btn-sm"
                                            style="margin-top: 7px;margin-bottom: 7px;">
                                            Login
                                        </a>
                                    </li>
                                @endif
                                @if (Route::has('register'))
                                    <li>
                                        <a href="{{ route('register') }}" class="btn btn-primary btn-sm"
                                            style="margin-top: 7px;margin-bottom: 7px;">
                                            Register
                                        </a>
                                    </li>
                                @endif
                            @else
                                <li style="margin-top: 7px;">
                                    <a href="login.html" class="text-dark text-decoration-none h6">
                                        <i class="fa-solid fa-user me-2"></i>{{ Auth::user()->name }}
                                    </a>
                                </li>
                                <li style="margin-top: 7px;">
                                    <a href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();"
                                        class="text-danger text-decoration-none h6">
                                        <i class="fa-solid fa-right-from-bracket"></i> {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>

                                </li>


                            @endguest
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <nav class="primary-nav padding-small">
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-lg-2 col-md-2">
                        <div class="main-logo">
                            <a href="index.html">
                                <img src="{{ asset('website/images/main-logo.png') }}" alt="logo">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-10 col-md-10">
                        <div class="navbar">

                            <div id="main-nav" class="stellarnav d-flex justify-content-end right">
                                <ul class="menu-list">

                                    <li class="menu-item has-sub">
                                        <a href="{{ route('home') }}"
                                            class="item-anchor active d-flex align-item-center"
                                            data-effect="Home">Home</a>

                                    </li>

                                    <li><a href="about.html" class="item-anchor" data-effect="About">About</a>
                                    </li>

                                    <li class="menu-item has-sub">
                                        <a href="shop.html" class="item-anchor d-flex align-item-center"
                                            data-effect="Shop">Shop<i class="icon icon-chevron-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="shop.html" class="item-anchor">Shop</a></li>
                                            <li><a href="shop-slider.html" class="item-anchor">Shop slider<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="shop-grid.html" class="item-anchor">Shop grid<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="shop-list.html" class="item-anchor">Shop list<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="single-product.html" class="item-anchor">Single
                                                    product<span class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="cart.html" class="item-anchor">Cart<span class="text-primary">
                                                        (PRO)</span></a></li>
                                            <li><a href="wishlist.html" class="item-anchor">Wishlist<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="checkout.html" class="item-anchor">Checkout<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                        </ul>
                                    </li>

                                    <li class="menu-item has-sub">
                                        <a href="#" class="item-anchor d-flex align-item-center"
                                            data-effect="Pages">Pages<i class="icon icon-chevron-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="coming-soon.html" class="item-anchor">Coming soon<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="login.html" class="item-anchor">Login<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="faqs.html" class="item-anchor">FAQs<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                            <li><a href="styles.html" class="item-anchor">Styles</a></li>
                                            <li><a href="thank-you.html" class="item-anchor">Thankyou</a></li>
                                            <li><a href="error.html" class="item-anchor">Error page<span
                                                        class="text-primary"> (PRO)</span></a></li>
                                        </ul>
                                    </li>



                                    <li><a href="contact.html" class="item-anchor" data-effect="Contact">Contact</a>
                                    </li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>
