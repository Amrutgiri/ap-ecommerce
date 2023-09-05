<?php

namespace App\View\Components\admin;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Breadcrumb extends Component
{
    public $breadcrumb, $title;
    /**
     * Create a new component instance.
     */
    public function __construct($breadcrumb, $title)
    {
        $this->breadcrumb = $breadcrumb;
        $this->title = $title;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return view('components.admin.breadcrumb');
    }
}
