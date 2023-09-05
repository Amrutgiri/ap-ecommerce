$(document).ready(function () {
	var userTable = $("#serviceProviderKyc_table").DataTable({
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
				data: "full_name",
				responsivePriority: -1,
				sClass: "d-flex align-items-center",
			},
			{
				data: "phone",
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
				width: "200px",
				targets: 1,
				render: function (data, type, full, meta) {
					return (
						'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\
								<a href="' +
						full.show_url +
						'">\
									<div class="symbol-label">\
										<img src="' +
						full.profile +
						'" alt="' +
						data +
						'" class="w-100">\
									</div>\
								</a>\
							</div>\
							<div class="d-flex flex-column">\
								<a href="' +
						full.show_url +
						'" class="text-gray-800 text-hover-primary mb-1">' +
						data +
						'</a>\
								<a href="mailto:' +
						full.email +
						'" class="text-gray-400 text-hover-primary mb-1"><span>' +
						full.email +
						"</span></a>\
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
						' <a href="javascript:void(0);" data-url="' +
						full.change_status_verify_url +
						'/1" onClick="changeStatusVerify(this)" data-status="Verify" class="btn btn-sm btn-icon btn-light-success btn-active-success">\
								<span class="svg-icon">\
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path opacity="0.3" d="M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor"/>\
									<path d="M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor"/>\
									</svg>\
								</span>\
							</a>\
							<a href="javascript:void(0);" data-url="' +
						full.change_status_verify_url +
						'/2" onClick="changeStatusVerify(this)" data-status="Reject" class="btn btn-sm btn-icon btn-light-danger btn-active-danger">\
								<span class="svg-icon">\
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path opacity="0.3" d="M6 19.7C5.7 19.7 5.5 19.6 5.3 19.4C4.9 19 4.9 18.4 5.3 18L18 5.3C18.4 4.9 19 4.9 19.4 5.3C19.8 5.7 19.8 6.29999 19.4 6.69999L6.7 19.4C6.5 19.6 6.3 19.7 6 19.7Z" fill="currentColor"/>\
									<path d="M18.8 19.7C18.5 19.7 18.3 19.6 18.1 19.4L5.40001 6.69999C5.00001 6.29999 5.00001 5.7 5.40001 5.3C5.80001 4.9 6.40001 4.9 6.80001 5.3L19.5 18C19.9 18.4 19.9 19 19.5 19.4C19.3 19.6 19 19.7 18.8 19.7Z" fill="currentColor"/>\
									</svg>\
								</span>\
							</a>'
					);
				},
			},
		],
	});
	$("#datatable_serviceProvider_search").on("keyup", function (e) {
		userTable.search(e.target.value, "search").draw();
	});
	$("#dataTableVerifyFilter").on("change", function (e) {
		userTable.search(e.target.value, "filter").draw();
	});
	$("input[type=search]").on("search", function () {
		userTable.search("").draw();
	});
});

//admin.service.provider.changeStatus.verify
var changeStatusVerifyAjax = null;
function changeStatusVerify(e) {
	var url = $(e).attr("data-url");
	var status = $(e).attr("data-status");
	Swal.fire({
		title: "Are you sure",
		text: "You want to " + status + " this?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, " + status + " it!",
	}).then(function (result) {
		if (result.value) {
			$.ajaxSetup({
				headers: {
					"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
						"content"
					),
				},
			});
			changeStatusVerifyAjax = $.ajax({
				method: "POST",
				url: url,
				beforeSend: function() {
					if(changeStatusVerifyAjax != null) {
						changeStatusVerifyAjax.abort();
					}
				},
				success: function (response) {
					$("#serviceProviderKyc_table").DataTable().ajax.reload();
					Toast.fire({
						icon: "success",
						title: "<span style='color:black'>The verify status updated successfully.</span>",
					});
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
