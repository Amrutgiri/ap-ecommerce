$(document).ready(function () {
	$('.maxlength').maxlength({
		alwaysShow: false,
		threshold: 5,
		warningClass: "badge badge-success",
		limitReachedClass: "badge badge-danger",
		separator: ' of ',
		preText: 'You have ',
		postText: ' chars remaining.',
		validate: true
	});
	$('.maxlengthMobile').maxlength({
		alwaysShow: false,
		threshold: 5,
		warningClass: "badge badge-danger",
		limitReachedClass: "badge badge-success",
		separator: ' of ',
		preText: 'You have ',
		postText: ' digits remaining.',
		validate: true
	});
	var intltelinput_4 = window.intlTelInput(document.querySelector("#phone"), {
		preferredCountries: ["IN"],
		nationalMode: false,
		formatOnDisplay: false,
		onlyCountries: ["us"],
		utilsScript: utilsScript,
	});

	function reset_intltelinput_4() {
		jQuery("#phone").removeClass("text-danger");
	}
	jQuery("#phone").on("blur, change, keyup", function () {
		reset_intltelinput_4();
		if (typeof intlTelInputUtils !== "undefined") {
			var currentText = intltelinput_4.getNumber(intlTelInputUtils.numberFormat.E164);
			if (typeof currentText === "string") {
				intltelinput_4.setNumber(currentText);
				if (jQuery(this).val().trim()) {
					if (intltelinput_4.isValidNumber()) {
						jQuery("#phone").removeClass("text-danger");
						console.log(intltelinput_4.getSelectedCountryData());
					} else {
						var error = intltelinput_4.getValidationError();
						(typeof error_array[error] !== "undefined") ? console.log(error_array[
							error]) : "";
						jQuery("#phone").addClass("text-danger");
					}
				}
			}
		}
	});
	if (oldStateId) {
		getCities(oldStateId);
		$('#state_id').trigger('change.select2');
	}

	var date = new Date();
	date.setFullYear(date.getFullYear() - 18);
	$("#date_of_birth").flatpickr({
		defaultDate: currentDate,
		altInput: true,
		altFormat: dateFormat,
		dateFormat: "Y-m-d",
		maxDate: moment(date).format('Y-MM-DD')
	});
});

var getCitiesAjax = null;
function getCities(stateId) {
	$("#city_id").html('');
	getCitiesAjax = $.ajax({
		url: getCitiesUrl,
		type: "POST",
		data: {
			state_id: stateId,
			_token: csrfToken
		},
		dataType: 'json',
		beforeSend: function() {
			if(getCitiesAjax != null) {
				getCitiesAjax.abort();
			}
		},
		success: function (res) {
			$('#city_id').html('<option value="">Select a city</option>');
			$.each(res, function (key, value) {
				if (value.id == oldCitiesId) {
					$("#city_id").append('<option value="' + value.id + '" selected>' + value.name + '</option>');
				} else {
					$("#city_id").append('<option value="' + value.id + '">' + value.name + '</option>');
				}
			});
		},
		error: function (jqXHR, ajaxOptions, thrownError) {
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
