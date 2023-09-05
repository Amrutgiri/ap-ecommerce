
var start = moment().subtract(6, 'days');
var end = moment();
var bookingChartsSeries = [];
var bookingChartsCategories = [];
var bookingChartsColor = ['#61D06A', '#FA8128', '#FFC107'];
var sPAndCustomer = [];
var myPieChart = null;
var dashboardDataAjax = null;

/* ApexCharts Line Charts Start */
var height = parseInt(KTUtil.css(sp_customer_charts, 'height'));
var fontFamily = KTUtil.getCssVariableValue('--bs-font-sans-serif');
var labelColor = KTUtil.getCssVariableValue('--kt-gray-500');
var borderColor = KTUtil.getCssVariableValue('--kt-border-dashed-color');
var options = {
    series: [{
        name: 'Bookings',
        data: bookingChartsSeries
    }],            
    chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: height,
        toolbar: {
            show: false
        }
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 80, 100]
        }
    },
    stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: bookingChartsColor
    },
    xaxis: {
        categories: bookingChartsCategories,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        tickAmount: 6,
        labels: {
            rotate: 0,
            rotateAlways: true,
            style: {
                colors: labelColor,
                fontSize: '12px'
            }
        },
        crosshairs: {
            position: 'front',
            stroke: {
                color: labelColor,
                width: 1,
                dashArray: 3
            }
        },
        tooltip: {
            enabled: true,
            formatter: undefined,
            offsetY: 0,
            style: {
                fontSize: '12px'
            }
        }
    },
    yaxis: {
        tickAmount: 4,
        min: 0,
        labels: {
            style: {
                colors: labelColor,
                fontSize: '12px'
            },
            formatter: function (val) {
                return parseInt(val)
            }
        }
    },
    states: {
        normal: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        hover: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: 'none',
                value: 0
            }
        }
    },
    tooltip: {
        style: {
            fontSize: '12px'
        },
        y: {
            formatter: function (val) {
                return  val
            }
        }
    },
    colors: bookingChartsColor,
    grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
            lines: {
                show: true
            }
        }
    },
    markers: {
        strokeColor:  bookingChartsColor,
        strokeWidth: 3
    }
};
var chart = new ApexCharts(sp_customer_charts, options);
chart.render();
/* ApexCharts Line Charts End */

dashboardDate.map(function (element) {
    if (element.getAttribute("data-kt-initialized") === "1") {
        return;
    }

    var display = element.querySelector('div');
    var attrOpens  = element.hasAttribute('data-dashboard-daterangepicker-opens') ? element.getAttribute('data-dashboard-daterangepicker-opens') : 'left';
    var range = element.getAttribute('data-kt-daterangepicker-range');
    var cb = function(start, end) {
        if (display) {
            display.innerHTML = start.format('D MMM YYYY') + ' - ' + end.format('D MMM YYYY');
            dashboardDataAjax = $.ajax({
                method: "POST",
                url: getDashboardDataRoute,
                data: {
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD'),
                    "_token": csrfToken
                },
				beforeSend: function() {
					if(dashboardDataAjax != null) {
						dashboardDataAjax.abort();
					}
				},
                success: function(resultData) {
                    if(myPieChart){
                        myPieChart.clear();
                        myPieChart.destroy();
                    }

                    bookingChartsSeries = resultData.data.bookingCharts.series;
                    bookingChartsCategories = resultData.data.bookingCharts.categories;
                    bookingChartsColor = resultData.data.bookingCharts.color;
                    sPAndCustomer = resultData.data.sPAndCustomer;
                    $('#total_earnings').html(resultData.data.arrayOfTotal.total_earnings)
                    $('#total_payment').html(resultData.data.arrayOfTotal.total_payment)
                    $('#total_bookings').html(resultData.data.arrayOfTotal.total_bookings)
                    $('#total_pending_jobs').html(resultData.data.arrayOfTotal.total_pending_jobs)
                    /* ApexCharts Line Charts Update Start */
                        chart.updateSeries(bookingChartsSeries);
                        chart.updateOptions({
                            xaxis: {
                                categories: bookingChartsCategories,
                                axisBorder: {
                                    show: false,
                                },
                                axisTicks: {
                                    show: false
                                },
                                tickAmount: 6,
                                labels: {
                                    rotate: -30,
                                    rotateAlways: true,
                                    style: {
                                        colors: labelColor,
                                        fontSize: '10px'
                                    }
                                },
                                crosshairs: {
                                    position: 'front',
                                    stroke: {
                                        color: labelColor,
                                        width: 1,
                                        dashArray: 3
                                    }
                                },
                                tooltip: {
                                    enabled: true,
                                    formatter: undefined,
                                    offsetY: 0,
                                    style: {
                                        fontSize: '12px'
                                    }
                                },
                            },
                            stroke: {
                                colors: bookingChartsColor
                            },
                            colors: bookingChartsColor,
                            markers: {
                                strokeColor:  bookingChartsColor,
                                strokeWidth: 3
                            }
                        })
                    /* ApexCharts Line Charts Update End */

                    /* Bookings pie Charts Start */
                    var ctx = document.getElementById('pie_chartjs');
                    var successColor = KTUtil.getCssVariableValue('--kt-success');
                    var infoColor = KTUtil.getCssVariableValue('--kt-warning');
                    // Chart labels
                    const labels = ['Customer', 'Service Providers'];
                    // Chart data
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Dataset 1',
                                data: sPAndCustomer,
                                backgroundColor: [successColor, infoColor]
                            },
                        ]
                    };
                    // Chart config
                    const config = {
                        type: 'pie',
                        data: data,
                        options: {
                            plugins: {
                                title: {
                                    display: false,
                                }
                            },
                            responsive: true,
                        },
                        defaults:{
                            global: {
                                defaultFont: fontFamily
                            }
                        }
                    };
                    myPieChart = new Chart(ctx, config);
                    /* Bookings pie Charts End */
                },
				error: function(jqXHR, ajaxOptions, thrownError) {
					if (jqXHR.status == 401 || jqXHR.status == 419) {
						noData = true;
						Swal.fire({
							title: "Session Expired",
							text: "You'll be take to the login page",
							icon: "warning",
							confirmButtonText: "Ok",
							allowOutsideClick: false,
							customClass: {
								confirmButton: "btn btn-sm btn-success",
							},
						}).then(function (result) {
							location.reload();
						});
					}
				}
            });
        };
    }

    if ( range === "today" ) {
        start = moment();
        end = moment();
    }

    $(element).daterangepicker({
        startDate: start,
        endDate: end,
        opens: attrOpens,
        ranges: {
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        }
    }, cb);

    cb(start, end);

    element.setAttribute("data-kt-initialized", "1");
});
