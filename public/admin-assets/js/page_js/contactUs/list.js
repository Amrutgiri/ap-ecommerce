$(document).ready(function () {
	var contactUsTable = $("#contactus_table").DataTable({
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
				if (contactUsTable != null) {
					contactUsTable.settings()[0].jqXHR.abort();
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
				data: "name",
			},
			{
				data: "email",
			},
			{
				data: "actions",
				responsivePriority: -1,
				sClass: "text-end",
			},
		],
		columnDefs: [
			{
				targets: 2,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
										<a href="mailto:' +
						full.email +
						'" class="text-gray-800 text-hover-primary mb-1">' +
						full.email +
						"</a>\
									</div>"
					);
				},
			},
			{
				width: "120px",
				targets: -1,
				title: "Actions",
				orderable: false,
				render: function (data, type, full, meta) {
					return (
						' <a href="' +
						full.show_url +
						'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
									<i class="fa-solid fa-eye"></i>\
								</a>\
								<a href="javascript:void(0);" data-id="' +
						data +
						'" data-url="' +
						full.destroy_url +
						'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Delete Contact">\
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
	$("#datatable_contactus_search").on("keyup", function (e) {
		contactUsTable.search(e.target.value).draw();
	});
	$("input[type=search]").on("search", function () {
		contactUsTable.search("").draw();
	});
	const documentTitle = "Contact Us Report";
	var buttons = new $.fn.dataTable.Buttons(contactUsTable, {
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
					$("#contactus_table").DataTable().ajax.reload();
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