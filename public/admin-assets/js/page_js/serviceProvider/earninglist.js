$(document).ready(function () {
	var userTable = $("#earning_table").DataTable({
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
				data: "booking_id",
				responsivePriority: -1,
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
				data: "created_at",
			},
			{
				data: "status",
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
				width: "100px",
				targets: 1,
				render: function (data, type, full, meta) {
					var nameDiv =
						'<span class="text-gray-600 fw-bold d-block fs-6">N/A</span>';
					if (full.booking_id != null && data != "") {
						var nameDiv =
							'<span class="text-gray-600 fw-bold d-block fs-6">#' +
							full.booking_id +
							"</span>";
					}
					return (
						'<div class="d-flex align-items-center justify-content-start">\
						<div class="symbol symbol-30px me-3">\
							<img src="' +
						full.image +
						'" class="" alt="">\
						</div>\
							<a href="' +
						full.show_url +
						'">' +
						nameDiv +
						"</a>\
						</div>"
					);
				},
			},
			{
				width: "100px",
				targets: 2,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
							 <span>' +
						full.percentage +
						"</span>\
						</div>"
					);
				},
			},
			{
				width: "100px",
				targets: 3,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<span>' +
						full.amount +
						"</span>\
							</div>"
					);
				},
			},
			{
				width: "100px",
				targets: 4,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<span>' +
						full.admin_earning +
						"</span>\
							</div>"
					);
				},
			},
			{
				width: "100px",
				targets: 5,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
							<span>' +
						full.created_at +
						"</span>\
						</div>"
					);
				},
			},
			{
				width: "100px",
				targets: -1,
				render: function (data, type, full, meta) {
					var status = {
						0: {
							title: "Pending",
							state: "warning",
						},
						1: {
							title: "Paid",
							state: "success",
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
		],
	});
	$("#earning_table_search").on("keyup", function (e) {
		userTable.search(e.target.value).draw();
	});
	$("input[type=search]").on("search", function () {
		userTable.search("").draw();
	});
	const documentTitle = "Service Provider Earning Report";
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
