$(document).ready(function () {
	var rating_review_table = $("#rating_review_table").DataTable({
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
				if (rating_review_table != null) {
					rating_review_table.settings()[0].jqXHR.abort();
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
				sClass: "",
			},
			{
				data: "service_provider_id",
			},
			{
				data: "review",
			},
			{
				data: "type",
			},
			{
				data: "rating",
			},
			{
				data: "created_at",
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
				width: "200px",
				targets: 2,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex align-items-center justify-content-start">\
							<div class="symbol symbol-30px me-3">\
								<img src="' +
						full.profile +
						'" class="" alt="">\
							</div>\
								<a href="' +
						full.service_provider_show_url +
						'"><span class="text-gray-600 fw-bold d-block fs-6">' +
						data +
						"</span></a>\
							</div>"
					);
				},
			},
			{
				width: "500px",
				targets: 3,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<span>' +
						full.review +
						"</span>\
							</div>"
					);
				},
			},
			{
				width: "150px",
				targets: 4,
				render: function (data, type, full, meta) {
					var type = {
						0: {
							title: "Public",
							state: "info",
						},
						1: {
							title: "Private",
							state: "primary",
						},
					};
					if (typeof type[data] === "undefined") {
						return data;
					}

					return (
						'<div class="badge badge-light-' +
						type[data].state +
						' fw-bold">' +
						type[data].title +
						"</div>"
					);
				},
			},
			{
				width: "150px",
				targets: 5,
				render: function (data, type, full, meta) {
					stars = "";
					for ($i = 0; $i < 5; $i++) {
						if (parseInt(full.rating) - $i >= 1) {
							stars +=
								'<i class="fas fa-star text-warning me-1"> </i>';
						} else if (full.rating - $i > 0) {
							stars +=
								'<i class="fas fa-star-half-alt text-warning  me-1"></i>';
						} else {
							stars +=
								'<i class="far fa-star text-warning  me-1"></i>';
						}
					}
					return '<div class="rating">' + stars + "</div>";
				},
			},
			{
				width: "150px",
				targets: 6,
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
				title: "Actions",
				orderable: false,
				render: function (data, type, full, meta) {
					stars = "";
					for ($i = 0; $i < 5; $i++) {
						if (parseInt(full.rating) - $i >= 1) {
							stars +=
								'<i class="fas fa-star text-warning me-1"> </i>';
						} else if (full.rating - $i > 0) {
							stars +=
								'<i class="fas fa-star-half-alt text-warning  me-1"></i>';
						} else {
							stars +=
								'<i class="far fa-star text-warning  me-1"></i>';
						}
					}
					var statusType = {
						0: {
							title: "Public",
							state: "info",
						},
						1: {
							title: "Private",
							state: "primary",
						},
					};

					return (
						'<a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#review_modal_' +
						data +
						'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark">\
								<span class="svg-icon">\
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
										<path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z" fill="currentColor"/>\
										<rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor"/>\
										<rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor"/>\
										<rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor"/>\
										<path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"/>\
									</svg>\
								</span>\
							</a>\
							<div class="modal fade" tabindex="-1" id="review_modal_' +
						data +
						'">\
								<div class="modal-dialog">\
									<div class="modal-content">\
										<div class="modal-header">\
											<h3 class="modal-title">#' +
						full.booking_id +
						'</h3>\
											<div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">\
												<span class="svg-icon svg-icon-1">\
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
														<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>\
														<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>\
													</svg>\
												</span>\
											</div>\
										</div>\
										<div class="modal-body">\
											<div class="d-flex align-items-center mb-3">\
												<div class="d-flex align-items-center flex-grow-1">\
													<div class="symbol symbol-45px me-5">\
														<img src="' +
						full.profile +
						'" alt="">\
													</div>\
													<div class="d-flex flex-column">\
														<a href="javascript:void(0);" class="text-gray-900 text-hover-primary fs-6 fw-bold">' +
						full.service_provider_id +
						'</a>\
													</div>\
												</div>\
												<div class="d-flex align-items-center flex-grow-1 justify-content-end">\
													<div class="d-flex flex-column">\
														<div class="rating mb-2">' +
						stars +
						'</div>\
														<div><span class="badge badge-light-' +
						statusType[full.type].state +
						' fw-bold">' +
						statusType[full.type].title +
						'</span></div>\
													</div>\
												</div>\
											</div>\
											<div class="text-gray-800 mb-5 text-start">' +
						full.full_review +
						' </div>\
										</div>\
									</div>\
								</div>\
							</div>\
							<a href="javascript:void(0);" data-id="' +
						data +
						'" data-url="' +
						full.rating_review_destroy +
						'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
									<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
									<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>'
					);
				},
			},
		],
	});
	$("#rating_review_table_search").on("keyup", function (e) {
		rating_review_table.search(e.target.value, "search").draw();
	});
	$("input[type=search]").on("search", function (e) {
		rating_review_table.search("").draw();
	});
	const documentTitle = "User Rating-Reviews Report";
	var buttons = new $.fn.dataTable.Buttons(rating_review_table, {
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

destroyFunctionAjax = null;
function destroyFunction(e) {
	var id = $(e).attr("data-id");
	var url = $(e).attr("data-url");

	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, delete it!",
		customClass: {
			confirmButton: "btn btn-sm btn-success",
			cancelButton: "btn btn-sm btn-danger",
		},
	}).then(function (result) {
		if (result.value) {
			document.body.prepend(loadingEl);
			KTApp.showPageLoading();
			destroyFunctionAjax = $.ajax({
				method: "POST",
				url: url,
				data: {
					id: id,
					_method: "delete",
					_token: csrfToken,
				},
				beforeSend: function() {
					if(destroyFunctionAjax != null) {
						destroyFunctionAjax.abort();
					}
				},
				success: function (resultData) {
					$("#rating_review_table").DataTable().ajax.reload();
					Toast.fire({
						icon: "success",
						title:
							"<span style='color:black'>" +
							resultData.message +
							"</span>",
					});
					KTApp.hidePageLoading();
					loadingEl.remove();
				},
				error: function (jqXHR, ajaxOptions, thrownError) {
					if (jqXHR.status == 401 || jqXHR.status == 419) {
						console.log(jqXHR.status);
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
							return false;
						});
					} else {
						Toast.fire({
							icon: "error",
							title:
								"<span style='color:black'>" +
								jqXHR.responseJSON.message +
								"</span>",
						});
						KTApp.hidePageLoading();
						loadingEl.remove();
					}
				},
			});
		}
	});
}