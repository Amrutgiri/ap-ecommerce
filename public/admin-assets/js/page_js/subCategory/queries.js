var query_repeater = $('#query_repeater').repeater({
	initEmpty: true,
	show: function () {
		var showFunctionThis = $(this);
		var index = showFunctionThis.closest("[data-repeater-item]").index();
		showFunctionThis.slideDown();
		// Re-init select2
		showFunctionThis.find('[name="query[' + index + '][type]').val('input_text').select2();
		showFunctionThis.find('[data-kt-repeater="select2"]').change(function (e) {
			var optionValue = $(e.currentTarget).find("option:selected").val();
			if (optionValue) {
				showFunctionThis.find(".option_box").not("." + optionValue).hide();
				showFunctionThis.find("." + optionValue).show();
			} else {
				showFunctionThis.find(".option_box").hide();
			}
		});

		// Re-init tagify
		new Tagify(this.querySelector('[data-kt-repeater="tagify"]'));
		if (myJson) {
			$.each(myJson, function (myJsonKey, data) {
				if (data.type != '' || data.type != null) {
					showFunctionThis.find('[name="query[' + myJsonKey + '][type]').val(data.type).select2();
				}
				if (data.query == null || data.query == '') {
					showFunctionThis.find('[name="query[' + myJsonKey + '][query]"]').addClass('is-invalid');
				}
				if (data.multiple_choice_value == null || data.multiple_choice_value == '') {
					showFunctionThis.find('[name="query[' + myJsonKey + '][multiple_choice_value]"]').parent('.multiple_choice').find('.tagify--empty').addClass('is-invalid');
				}
			});
		}
	},

	hide: function (deleteElement) {
		var hideFunctionThis = $(this);
		Swal.fire({
			title: "Are you sure?",
			text: "You won\'t be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			customClass: {
				confirmButton: 'btn btn-sm btn-success',
				cancelButton: 'btn btn-sm btn-danger',
			}
		}).then(function (result) {
			if (result.value) {
				hideFunctionThis.slideUp(deleteElement);
			}
		});
	},

	ready: function () {
		// Init select2
		$('[data-kt-repeater="select2"]').select2();
		// Init Tagify
		new Tagify(document.querySelector('[data-kt-repeater="tagify"]'));
	},

});
query_repeater.setList(myJson);
$('[data-kt-repeater="select2"]').trigger('change');