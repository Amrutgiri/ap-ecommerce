$(document)
	.ready(function () {
		var stateTable = $("#state_table").DataTable({
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
					(tooltipTriggerEl) =>
						new bootstrap.Tooltip(tooltipTriggerEl)
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
					if (stateTable != null) {
						stateTable.settings()[0].jqXHR.abort();
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
					data: "country_name",
				},
				{
					data: "name",
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
					targets: 2,
					orderable: true,
					render: function (data, type, full, meta) {
						return (
							'<div class="d-flex flex-column">\
							<span class="">' +
							full.country_name +
							"</span>\
						</div>"
						);
					},
				},
				{
					width: "100px",
					targets: 1,
					orderable: true,
					render: function (data, type, full, meta) {
						return (
							'<div class="d-flex flex-column">\
							<span class="">' +
							full.name +
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
						var deleteHtml = "";
						if (full.is_delete == true) {
							deleteHtml =
								'<a href="javascript:void(0);" data-id="' +
								data +
								'" data-url="' +
								full.destroy_url +
								'"  onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Delete State">\
					<span class="svg-icon">\
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
							<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
							<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
							<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
						</svg>\
					</span>\
				</a>';
						} else {
							deleteHtml =
								'<a href="javascript:void(0);" class="btn btn-sm btn-icon btn-light-danger btn-active-danger"  data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "You can\'t delete this state.">\
					<span class="svg-icon">\
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
							<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
							<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
							<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
						</svg>\
					</span>\
				</a>';
						}
						return (
							'<button type="button" data-id="' +
							data +
							'" data-state_name="' +
							full.name +
							'" data-country_id="' +
							full.country_id +
							'" onClick="editStateFunction(this)" data-title="Edit State" class="btn btn-sm btn-icon btn-light-primary btn-active-primary" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Edit State">\
					<span class="svg-icon">\
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
							<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"/>\
							<path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"/>\
							<path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"/>\
						</svg>\
					</span>\
				</button> ' +
							deleteHtml
						);
					},
				},
			],
		});
		$("#datatable_state_search").on("keyup", function (e) {
			stateTable.search(e.target.value).draw();
		});
		$("input[type=search]").on("search", function () {
			stateTable.search("").draw();
		});
		const documentTitle = "State Report";
		var buttons = new $.fn.dataTable.Buttons(stateTable, {
			buttons: [
				{
					extend: "csvHtml5",
					title: documentTitle,
					exportOptions: {
						columns: ':not([aria-label="Actions"])',
					},
				},
				{
					extend: "excelHtml5",
					title: documentTitle,
					exportOptions: {
						columns: ':not([aria-label="Actions"])',
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

		$("#kt_modal_1").on("hidden.bs.modal", function () {
			//$("#country").select2().val('').trigger('change');
			$("#state_id").val("");
			$("#state_name").val("");
			var element = document.getElementById("changeTitle");
			element.textContent = "Add State";
		});
	})
	.on("change blur keyup keydown click", "#state_name", function () {
		$(this).removeClass("is-invalid");
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
						$("#state_table").DataTable().ajax.reload();
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

function editStateFunction(e) {
	document.body.prepend(loadingEl);
	KTApp.showPageLoading();
	var id = $(e).attr("data-id");
	var stateName = $(e).attr("data-state_name");
	var countryId = $(e).attr("data-country_id");
	var editTitle = $(e).attr("data-title");
	var element = document.getElementById("changeTitle");
	element.textContent = editTitle;
	$("#country").select2().val(countryId).trigger("change");
	$("#state_id").val(id);
	$("#state_name").val(stateName);
	$("#kt_modal_1").modal("show");

	KTApp.hidePageLoading();
	loadingEl.remove();
}

var stateUpdateOrCreateAjax = null;
function stateUpdateOrCreateFunction(e) {
	$(".overlay").addClass("overlay-block");
	$("#overlay_layer").show();
	var countryId = $("#country").val();
	var stateId = $("#state_id").val();
	var stateName = $("#state_name").val();
	var data = {
		country_id: countryId,
		state_id: stateId,
		name: stateName,
		_token: csrfToken,
	};
	stateUpdateOrCreateAjax = $.ajax({
		type: "POST",
		data: data,
		dataType: "json",
		url: storeStatesUrl,
		beforeSend: function() {
			if(stateUpdateOrCreateAjax != null) {
				stateUpdateOrCreateAjax.abort();
			}
		},
		success: function (response) {
			$("#state_table").DataTable().ajax.reload();
			Toast.fire({
				icon: "success",
				title:
					"<span style='color:black'>" + response.message + "</span>",
			});
			$(".overlay").removeClass("overlay-block");
			$("#overlay_layer").hide();
			$("#kt_modal_1").modal("hide");
		},
		error: function (jqXHR, textStatus, errorThrown) {
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
				$.each(jqXHR.responseJSON.errors, function (index, value) {
					$("#state_" + index).addClass("is-invalid");
				});
				Toast.fire({
					icon: "error",
					title:
						"<span style='color:black'>" +
						jqXHR.responseJSON.message +
						"</span>",
				});
				$(".overlay").removeClass("overlay-block");
				$("#overlay_layer").hide();
			}
		},
	});
}

$("#kt_modal_1").on("hidden.bs.modal", function () {
	$("#state_name").val("");
	$("#state_name").removeClass("is-invalid");
});