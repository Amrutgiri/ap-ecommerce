
var start = moment().subtract(6, 'days');
var end = moment();
var chartsData = [];
var sPAndCustomer = [];
var myPieChart = null;
var dashboardDataAjax = null;
/* bookingChart Line Charts Start */
var height = parseInt(KTUtil.css(booking_charts, 'height'));
var fontFamily = KTUtil.getCssVariableValue('--bs-font-sans-serif');
var labelColor = KTUtil.getCssVariableValue('--kt-gray-500');
var borderColor = KTUtil.getCssVariableValue('--kt-border-dashed-color');
var baseColor = KTUtil.getCssVariableValue('--kt-success');
var lightColor = KTUtil.getCssVariableValue('--kt-success');
var options = {
	series: [],
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
	xaxis: {
		categories: [],
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
				color: baseColor,
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
				return val
			}
		}
	},
};
var bookingChart = new ApexCharts(booking_charts, options);
bookingChart.render();
/* bookingChart Line Charts End */

/* repairChart Line Charts Start */
var repairChart = new ApexCharts(repair_and_installation_charts, options);
repairChart.render();
/* repairChart Line Charts End */

/* renovationChart Line Charts Start */
var renovationChart = new ApexCharts(renovation_charts, options);
renovationChart.render();
/* renovationChart Line Charts End */

dashboardDate.map(function (element) {
	if (element.getAttribute("data-kt-initialized") === "1") {
		return;
	}

	var display = element.querySelector('div');
	var attrOpens = element.hasAttribute('data-dashboard-daterangepicker-opens') ? element.getAttribute('data-dashboard-daterangepicker-opens') : 'left';
	var range = element.getAttribute('data-kt-daterangepicker-range');
	var cb = function (start, end) {
		if (display) {
			
			document.body.prepend(loadingEl);
			KTApp.showPageLoading();
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
				success: function (resultData) {
					if (myPieChart) {
						myPieChart.clear();
						myPieChart.destroy();
					}

					chartsData = resultData.data.chartsData;
					sPAndCustomer = resultData.data.sPAndCustomer;
					$('#gross_earning').html(resultData.data.arrayOfTotal.gross_earning)
					$('#total_payouts').html(resultData.data.arrayOfTotal.total_payouts)
					$('#total_commission').html(resultData.data.arrayOfTotal.total_commission)
					$('#total_pending_jobs').html(resultData.data.arrayOfTotal.total_pending_jobs)
					/* bookingChart Line Charts Update Start */
					bookingChart.updateSeries(chartsData.total_booking.series);
					bookingChart.updateOptions({
						xaxis: {
							categories: chartsData.total_booking.categories,
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
									color: baseColor,
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
						colors: chartsData.total_booking.color,
						markers: {
							strokeColor: chartsData.total_booking.color,
							strokeWidth: 3
						},
						stroke: {
							curve: 'smooth',
							show: true,
							width: 3,
							colors: chartsData.total_booking.color
						},
					})
					/* bookingChart Line Charts Update End */

					/* repairChart Line Charts Update Start */
					repairChart.updateSeries(chartsData.repair_installation.series);
					repairChart.updateOptions({
						xaxis: {
							categories: chartsData.repair_installation.categories,
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
									color: baseColor,
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
						colors: chartsData.repair_installation.color,
						markers: {
							strokeColor: chartsData.repair_installation.color,
							strokeWidth: 3
						},
						stroke: {
							curve: 'smooth',
							show: true,
							width: 3,
							colors: chartsData.repair_installation.color
						},
					})
					/* repairChart Line Charts Update End */

					/* renovationChart Line Charts Update Start */
					renovationChart.updateSeries(chartsData.renovation.series);
					renovationChart.updateOptions({
						xaxis: {
							categories: chartsData.renovation.categories,
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
									color: baseColor,
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
						colors: chartsData.renovation.color,
						markers: {
							strokeColor: chartsData.renovation.color,
							strokeWidth: 3
						},
						stroke: {
							curve: 'smooth',
							show: true,
							width: 3,
							colors: chartsData.renovation.color
						},
					})
					/* renovationChart Line Charts Update End */

					/* Bookings pie Charts Start */
					var config = {
						type: 'pie',
						data: {
							labels: ['  Customer ', '  Service Providers '],
							datasets: [
								{
									data: sPAndCustomer,
									backgroundColor: ['#61D06A', '#FFC107']
								},
							]
						},
						options: {
							plugins: {
								tooltip: {
									enabled: true,
									callbacks: {
										label: function (tooltipItem, data) {
											return tooltipItem['label'] + ': ' + tooltipItem['raw'] + '%';
										}
									}
								},
								title: {
									display: false,
								},
								legend: {
									display: false
								},

							},
							responsive: true,
						},
						defaults: {
							global: {
								defaultFont: fontFamily
							}
						},
					};
					var ctx = document.getElementById('pie_chartjs');
					// Chart config
					myPieChart = new Chart(ctx, config);
					/* Bookings pie Charts End */
					KTApp.hidePageLoading();
					loadingEl.remove();
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

	if (range === "today") {
		start = moment();
		end = moment();
	}

	$(element).daterangepicker({
		startDate: start,
		endDate: end,
		opens: attrOpens,
		maxDate: new Date(),
		ranges: {
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
		}
	}, cb);

	cb(start, end);

	element.setAttribute("data-kt-initialized", "1");
});
