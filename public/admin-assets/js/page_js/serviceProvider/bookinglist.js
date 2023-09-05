$(document).ready(function () {
	var userTable = $("#booking_table").DataTable({
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
				if (userTable != null) {
					userTable.settings()[0].jqXHR.abort();
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
				data: "booking_number",
				responsivePriority: -1,
				sClass: "d-flex align-items-center",
			},
			{
				data: "user_name",
			},
			{
				data: "subcategory_id",
			},
			{
				data: "job_duration",
			},
			{
				data: "total_amount",
			},
			{
				data: "start_date",
			},
			{
				data: "status",
			},

			{
				data: "actions",
				responsivePriority: -1,
				sClass: "text-end",
			},
		],
		columnDefs: [
			{
				width: "50px",
				targets: 0,
				title: "#",
			},
			{
				width: "150px",
				targets: 1,
				render: function (data, type, full, meta) {
					return (
						'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\
							<a href="' +
						full.show_url +
						'">\
								<div class="symbol-label">\
									<img src="' +
						full.image +
						'" alt="' +
						data +
						'" class="w-100">\
								</div>\
							</a>\
						</div>\
						<div class="d-flex flex-column">\
							<a href="' +
						full.show_url +
						'" class="text-gray-800 text-hover-primary mb-1">#' +
						data +
						"</a>\
						</div>"
					);
				},
			},
			{
				width: "200px",
				targets: 2,
				render: function (data, type, full, meta) {
					var nameDiv =
						'<span class="text-gray-600 fw-bold d-block fs-6">N/A</span>';
					if (data != null && data != "") {
						var nameDiv =
							'<span class="text-gray-600 fw-bold d-block fs-6">' +
							data +
							"</span>";
					}
					return (
						'<div class="d-flex align-items-center justify-content-start">\
				<div class="symbol symbol-30px me-3">\
					<img src="' +
						full.user.profile_url +
						'" class="" alt="">\
				</div>\
					<a href="' +
						full.user_show_url +
						'">' +
						nameDiv +
						"</a>\
				</div>"
					);
				},
			},
			{
				width: "150px",
				targets: 3,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
							 <span>' +
						full.subcategory_id +
						"</span>\
						</div>"
					);
				},
			},
			{
				width: "80px",
				targets: 4,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<span>' +
						full.job_duration +
						"</span>\
							</div>"
					);
				},
			},
			{
				width: "80px",
				targets: 5,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<span>' +
						full.total_amount +
						"</span>\
							</div>"
					);
				},
			},
			{
				width: "80px",
				targets: 6,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
							<span>' +
						full.start_date +
						"</span>\
						</div>"
					);
				},
			},
			{
				width: "50px",
				targets: -2,
				render: function (data, type, full, meta) {
					var status = {
						0: {
							title: "Pending",
							state: "warning",
						},
						1: {
							title: "In Progress",
							state: "warning",
						},
						2: {
							title: "Accepted",
							state: "primary",
						},
						3: {
							title: "Completed",
							state: "success",
						},
						4: {
							title: "Rejected",
							state: "danger",
						},
						5: {
							title: "Cancelled",
							state: "danger",
						},
					};
					if (typeof status[data] === "undefined") {
						return data;
					}

					return (
						'<div class="badge badge-light-' +
						status[data].state +
						' fw-bold">' +
						status[data].title +
						"</div>"
					);
				},
			},
			{
				width: "80px",
				targets: -1,
				title: "Actions",
				orderable: false,
				render: function (data, type, full, meta) {
					return (
						'<a href="' +
						full.show_url +
						'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
				<i class="fa-solid fa-eye"></i>\
						</a>'
					);
				},
			},
		],
	});
	$("#booking_table_search").on("keyup", function (e) {
		userTable.search(e.target.value).draw();
	});
	$("input[type=search]").on("search", function () {
		userTable.search("").draw();
	});

	const documentTitle = "Service Provider Booking Report";
	var buttons = new $.fn.dataTable.Buttons(userTable, {
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

