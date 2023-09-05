$(document).ready(function () {
	var earningTable = $("#earning_table").DataTable({
		searchDelay: 500,
		processing: true,
		serverSide: true,
		responsive: true,
		order: [[0, "desc"]],
		fnDrawCallback: function () {
			const tooltipTriggerList = document.querySelectorAll(
				'[data-bs-toggle="tooltip"]'
			);
			const tooltipList = [...tooltipTriggerList].map(
				(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
			);
		},
		ajax: {
			url: listDataUrl,
			type: "POST",
			data: {
				// parameters for custom backend script demo
				_token: csrfToken,
			},
			beforeSend: function () {
				if (earningTable != null) {
					earningTable.settings()[0].jqXHR.abort();
				}
			},
			error: function (jqXHR, ajaxOptions, thrownError) {
				if (jqXHR.status == 419) {
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
			},
		},
		columns: [
			{
				data: "id",
			},
			{
				data: "booking_id",
			},
			{
				data: "service_provider_id",
				responsivePriority: -1,
				sClass: "d-flex align-items-center",
			},
			{
				data: "total_amount",
			},
			{
				data: "percentage",
			},
			{
				data: "amount",
			},
			{
				data: "admin_earning",
			},
			{
				data: "actions",
				responsivePriority: -1,
				sClass: "text-end",
			},
		],
		columnDefs: [
			{
				width: "100px",
				targets: 0,
				title: "#",
			},
			{
				targets: 1,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex align-items-center"><div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\
							<div class="symbol-label">\
								<img src="' +
						full.image +
						'" alt="' +
						full.booking_id +
						'" class="w-100">\
							</div>\
							</div>\
							<div class="d-flex flex-column">\
							<a href="' +
						full.booking_show_url +
						'" class="text-gray-800 text-hover-primary mb-1">#' +
						full.booking_id +
						"</a>\
							</div></div>"
					);
				},
			},
			{
				targets: 2,
				render: function (data, type, full, meta) {
					return (
						'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\
							<div class="symbol-label">\
								<img src="' +
						full.profile +
						'" alt="' +
						full.service_provider_id +
						'" class="w-100">\
							</div>\
							</div>\
							<div class="d-flex flex-column">\
							<a href="' +
						full.service_provider_show_url +
						'" class="text-gray-800 text-hover-primary mb-1">' +
						full.service_provider_id +
						'</a>\
								<a href="mailto:' +
						full.email +
						'" class="text-gray-400 text-hover-primary mb-1"><span class="d-none"> ( </span>' +
						full.email +
						'<span class="d-none"> ) </span></a>\
							</div>'
					);
				},
			},
			{
				width: "120px",
				targets: -1,
				title: "Actions",
				orderable: false,
				render: function (data, type, full, meta) {
					if (full.status == "0") {
						return (
							'<a href="javascript:void(0);" data-url="' +
							full.status_url +
							'"onClick="changeStatus(this)" data-status="Paid" class="btn btn-sm btn-icon btn-light-warning btn-active-warning" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Status">\
						<span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
						<path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="currentColor"/>\
						<path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="currentColor"/>\
						</svg>\
						</span>\
							</a>'
						);
					} else {
						return '<a class="btn btn-sm btn-icon btn-light-success btn-active-success" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Status">\
						<span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
						<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"/>\
						<path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor"/>\
						</svg>\
						</span>\
							</a>';
					}
				},
			},
		],
	});
	$("#datatable_earning_search").on("keyup", function (e) {
		earningTable.search(e.target.value).draw();
	});
	$("input[type=search]").on("search", function () {
		earningTable.search("").draw();
	});
	const documentTitle = "Earning Report";
	var buttons = new $.fn.dataTable.Buttons(earningTable, {
		buttons: [
			{
				extend: "csvHtml5",
				title: documentTitle,
				exportOptions: {
					columns: ':not([aria-label="Actions"])', // Exclude columns with class "actions"
				},
			},
			{
				extend: "excelHtml5",
				title: documentTitle,
				exportOptions: {
					columns: ':not([aria-label="Actions"])', // Exclude columns with class "actions"
				},
			},
		],
	})
		.container()
		.appendTo($("#kt_datatable_example_buttons"));

	// Hook dropdown menu click event to datatable export buttons
	const exportButtons = document.querySelectorAll(
		"#kt_datatable_example_export_menu [data-kt-export]"
	);
	exportButtons.forEach((exportButton) => {
		exportButton.addEventListener("click", (e) => {
			e.preventDefault();

			// Get clicked export value
			const exportValue = e.target.getAttribute("data-kt-export");
			const target = document.querySelector(
				".dt-buttons .buttons-" + exportValue
			);

			// Trigger click event on hidden datatable export buttons
			target.click();
		});
	});
});

var statusChangeAjax = null;
function changeStatus(e) {
	var url = $(e).attr("data-url");

	var status = $(e).attr("data-status");
	var dataStatus = 0;
	if (status == "Paid") {
		dataStatus = 1;
	}

	Swal.fire({
		title: "Are you sure?",
		text: "You want to " + status + " this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, " + status + " it!",
		customClass: {
			confirmButton: "btn btn-sm btn-success",
			cancelButton: "btn btn-sm btn-danger",
		},
	}).then(function (result) {
		if (result.value) {
			$.ajaxSetup({
				headers: {
					"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
						"content"
					),
				},
			});
			document.body.prepend(loadingEl);
			KTApp.showPageLoading();
			statusChangeAjax = $.ajax({
				method: "POST",
				data: { status: dataStatus },
				url: url,
				beforeSend: function() {
					if(statusChangeAjax != null) {
						statusChangeAjax.abort();
					}
				},
				success: function (response) {
					$("#earning_table").DataTable().ajax.reload();
					Toast.fire({
						icon: "success",
						title: "<span style='color:black'>The status updated successfully.</span>",
					});
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
		}
	});
}
