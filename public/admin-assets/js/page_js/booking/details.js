var amountUpdateAjax = null;
var spUpdateAjax = null;
var refundAjax = null;
$(document).ready(function () {
	var target = document.querySelector("#assignSpModelContent");
	var blockUI = new KTBlockUI(target);
	var targetRefundModel = document.querySelector("#refundModelContent");
	var refundModelBlockUI = new KTBlockUI(targetRefundModel);
	// Format options
	const optionFormat = (item) => {
		if (!item.id) {
			return item.text;
		}

		var span = document.createElement("span");
		var template = "";

		template += '<div class="d-flex align-items-center">';
		template +=
			'<img src="' +
			item.element.getAttribute("data-content-icon") +
			'" class="rounded-circle h-40px w-40px me-3" alt="' +
			item.text +
			'"/>';
		template += '<div class="d-flex flex-column">';
		template += '<span class="fs-4 fw-bold lh-1">' + item.text + "</span>";
		template +=
			'<span class="text-muted fs-5">' +
			item.element.getAttribute("data-content-subcontent") +
			"</span>";
		template += "</div>";
		template += "</div>";

		span.innerHTML = template;

		return $(span);
	};

	// Init Select2 --- more info: https://select2.org/
	$("#serviceProvider").select2({
		placeholder: "Select an option",
		minimumResultsForSearch: Infinity,
		templateSelection: optionFormat,
		templateResult: optionFormat,
	});

	$("#spUpdateBtn").click(function () {
		var spId = $("#serviceProvider").val();
		if (spId == "") {
			$("#spSelectError").show();
			return false;
		} else {
			$("#spSelectError").hide();
		}
		/* document.body.prepend(loadingEl);
		KTApp.showPageLoading(); */
		blockUI.block();
		spUpdateAjax = $.ajax({
			type: "POST",
			url: assignServiceProviderRoute,
			data: { _token: csrfToken, spId: spId, id: bookingId },
			beforeSend: function() {
				if(spUpdateAjax != null) {
					spUpdateAjax.abort();
				}
			},
			success: function (response) {
				$("#spDetailsDiv").html(response.html);
				$("#assignSpModel").modal("hide");
				Toast.fire({
					icon: "success",
					title:  "<span style='color:black'>"+ response.message +"</span>",
				});
				blockUI.release();
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
	});

	$("#amountUpdate").click(function (e) {
		e.preventDefault();
		var amount = $("#amount").val();
		if (amount == "") {
			$("#amountError").show();
			return false;
		} else {
			$("#amountError").hide();
		}
		document.body.prepend(loadingEl);
		KTApp.showPageLoading();
		amountUpdateAjax = $.ajax({
			method: "POST",
			url: updateAmountRoute,
			data: { _token: csrfToken, amount: amount, id: bookingId },
			beforeSend: function() {
				if(amountUpdateAjax != null) {
					amountUpdateAjax.abort();
				}
			},
			success: function (response) {
				Toast.fire({
					icon: "success",
					title:  "<span style='color:black'>"+ response.message +"</span>",
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
	});

	$("#btnRefund").click(function (e) {
		e.preventDefault();
		const refundVal = $("#refund").val();
		const refundableAmount = $("#refundable").val();
		if (refundVal == "" || refundVal <= 0) {
			$("#refundError").show();
			return false;
		} else {
			$("#refundError").hide();
		}
		refundModelBlockUI.block();
		Swal.fire({
			title: "Are you sure?",
			text: "You refund payments.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, refund it!",
			customClass: {
				confirmButton: "btn btn-sm btn-success",
				cancelButton: "btn btn-sm btn-danger",
			},
		}).then(function (result) {
			if (result.value) {
				refundAjax = $.ajax({
					method: "POST",
					url: refundAmountRoute,
					data: {
						_token: csrfToken,
						refundVal: refundVal,
						id: bookingId,
					},
					beforeSend: function() {
						if(refundAjax != null) {
							refundAjax.abort();
						}
					},
					success: function (response) {
						var tostIcon = 'error';
						if (response.status == true) {
							$.each(response.data, function (key, val) {
								$("#bookingPaymentStatusDiv_"+val.id).html(
									'<span class="fs-6 text-info d-flex align-items-center">\
										<span class="bullet bullet-dot bg-info mx-2"></span>\
										Refund\
									</span>'
								);
								$("#refundDetailsDiv_"+val.id).html(
									'<h4 class="mb-4 fw-bolder text-gray-600">\
										REFUND DETAILS\
									</h4>\
									<div class="row">\
										<div class="col-md-6 col-lg-6 col-sm-6 col-12">\
											<div class="mb-6">\
												<div class="fw-semibold text-gray-600 fs-7">Refund:</div>\
												<div class="fw-bold text-gray-800 fs-6">'+val.refund+'%</div>\
											</div>\
										</div>\
										<div class="col-md-6 col-lg-6 col-sm-6 col-12">\
											<div class="mb-6">\
												<div class="fw-semibold text-gray-600 fs-7">Refund Amount:</div>\
												<div class="fw-bold text-gray-800 fs-6">$'+val.refund_amount+'</div>\
											</div>\
										</div>\
									</div>'
								);
							});
							$("#refundLink").remove();
							tostIcon = 'success';
						}
						$("#refund").val(0).trigger("keyup");
						$("#refundModel").modal("hide");
						Toast.fire({
							icon: tostIcon,
							title: "<span style='color:black'>"+ response.message +"</span>",
						});
						refundModelBlockUI.release();
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
	});
});

function calculateRefund(e) {
	var value = $(e).val();
	if (value != "" || value > 0) {
		$("#refundError").hide();
	}
	var total_payment_amount = $(e).attr("total_payment_amount");
	var refundable = (total_payment_amount * value) / 100,
		refund = refundable.toFixed(2);
	$("#refundable").val(amountSign + refund);
}

$("#refundModel").on("hidden.bs.modal", function () {
	$("#refund").val(0).trigger("keyup");
});
