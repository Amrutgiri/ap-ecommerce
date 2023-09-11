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


