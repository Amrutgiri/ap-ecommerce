$(document).ready(function () {
	var userTable = $("#serviceProvider_table").DataTable({
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
				data: "email",
			},
			{
				data: "phone",
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
				width: "100px",
				targets: 0,
				title: "#",
			},
			{
				width: "50px",
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
						"</a>\
							</div>"
					);
				},
			},
			{
				width: "500px",
				targets: 2,
				render: function (data, type, full, meta) {
					return (
						'<div class="d-flex flex-column">\
								<a href="mailto:' +
						full.email +
						'" class="text-gray-400 text-hover-primary mb-1">' +
						full.email +
						"</a>\
							</div>"
					);
				},
			},
			{
				width: "200px",
				targets: 3,
				render: function (data, type, full, meta) {
					var needHelpHtml = "";
					if (full.need_help == "1" && full.flag == "3") {
						needHelpHtml =
							'<i class="fas fa-exclamation-circle ms-2 fs-5 text-warning" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" title="Need Help!"></i>';
					}
					return (
						'<label class="fs-6 fw-semibold mb-2">\
				<a class="text-gray-400 text-hover-primary" href="tel:' +
						data +
						'" >' +
						data +
						"</a>" +
						needHelpHtml +
						"\
			</label>"
					);
				},
			},
			{
				width: "120px",
				targets: -1,
				title: "Actions",
				orderable: false,
				render: function (data, type, full, meta) {
					if (full.verify == "0") {
						if (full.flag == "3" && full.need_help == "1") {
							return (
								'<a href="' +
								full.show_url +
								'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title="View Details">\
						<i class="fa-solid fa-eye"></i>\
						</a>\
						<a href="' +
								full.kyc_edit_url +
								'" class="btn btn-sm btn-icon btn-light-warning btn-active-warning" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title ="Edit KYC Details">\
							<span class="svg-icon">\
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
								<path opacity="0.3" d="M22.9558 10.2848L21.3341 8.6398C21.221 8.52901 21.1317 8.39637 21.0715 8.24996C21.0114 8.10354 20.9816 7.94641 20.9841 7.78814V5.4548C20.9826 5.13514 20.9179 4.81893 20.7938 4.52433C20.6697 4.22973 20.4887 3.96255 20.261 3.73814C20.0333 3.51374 19.7636 3.33652 19.4672 3.21668C19.1709 3.09684 18.8538 3.03673 18.5341 3.0398H16.2008C16.0425 3.04229 15.8854 3.01255 15.739 2.95238C15.5925 2.89221 15.4599 2.80287 15.3491 2.6898L13.7158 1.0448C13.2608 0.590273 12.6439 0.334961 12.0008 0.334961C11.3576 0.334961 10.7408 0.590273 10.2858 1.0448L8.64078 2.66647C8.52999 2.77954 8.39735 2.86887 8.25094 2.92904C8.10452 2.98922 7.94739 3.01896 7.78911 3.01647H5.45578C5.13612 3.01799 4.8199 3.08266 4.5253 3.20675C4.23071 3.33085 3.96353 3.51193 3.73912 3.73959C3.51471 3.96724 3.3375 4.237 3.21766 4.53335C3.09781 4.82971 3.0377 5.14682 3.04078 5.46647V7.7998C3.04327 7.95808 3.01353 8.11521 2.95335 8.26163C2.89318 8.40804 2.80385 8.54068 2.69078 8.65147L1.04578 10.2848C0.591249 10.7398 0.335938 11.3567 0.335938 11.9998C0.335938 12.6429 0.591249 13.2598 1.04578 13.7148L2.66745 15.3598C2.78051 15.4706 2.86985 15.6032 2.93002 15.7496C2.99019 15.8961 3.01994 16.0532 3.01745 16.2115V18.5448C3.01897 18.8645 3.08363 19.1807 3.20773 19.4753C3.33182 19.7699 3.5129 20.0371 3.74056 20.2615C3.96822 20.4859 4.23798 20.6631 4.53433 20.7829C4.83068 20.9028 5.14779 20.9629 5.46745 20.9598H7.80078C7.95906 20.9573 8.11619 20.9871 8.2626 21.0472C8.40902 21.1074 8.54166 21.1967 8.65245 21.3098L10.2974 22.9548C10.7525 23.4093 11.3693 23.6646 12.0124 23.6646C12.6556 23.6646 13.2724 23.4093 13.7274 22.9548L15.3608 21.3331C15.4716 21.2201 15.6042 21.1307 15.7506 21.0706C15.897 21.0104 16.0542 20.9806 16.2124 20.9831H18.5458C19.1894 20.9831 19.8066 20.7275 20.2617 20.2724C20.7168 19.8173 20.9724 19.2001 20.9724 18.5565V16.2231C20.97 16.0649 20.9997 15.9077 21.0599 15.7613C21.12 15.6149 21.2094 15.4823 21.3224 15.3715L22.9674 13.7265C23.1935 13.5002 23.3726 13.2314 23.4944 12.9357C23.6162 12.64 23.6784 12.3231 23.6773 12.0032C23.6762 11.6834 23.6119 11.3669 23.4881 11.072C23.3643 10.7771 23.1834 10.5095 22.9558 10.2848Z" fill="currentColor"/>\
								<path d="M12.0039 15.4998C11.7012 15.4998 11.4109 15.38 11.1969 15.1668C10.9829 14.9535 10.8626 14.6643 10.8626 14.3627V13.9382C10.8467 13.2884 10.9994 12.6456 11.306 12.0718C11.6126 11.4981 12.0627 11.013 12.6126 10.6634C12.7969 10.561 12.9505 10.4114 13.0575 10.2302C13.1645 10.049 13.221 9.84266 13.2213 9.63242C13.2213 9.31073 13.0931 9.00223 12.8648 8.77476C12.6365 8.5473 12.3268 8.41951 12.0039 8.41951C11.6811 8.41951 11.3714 8.5473 11.1431 8.77476C10.9148 9.00223 10.7865 9.31073 10.7865 9.63242C10.7865 9.93399 10.6663 10.2232 10.4523 10.4365C10.2382 10.6497 9.94792 10.7695 9.64522 10.7695C9.34253 10.7695 9.05223 10.6497 8.83819 10.4365C8.62415 10.2232 8.50391 9.93399 8.50391 9.63242C8.50763 9.02196 8.67214 8.42317 8.98099 7.89592C9.28984 7.36868 9.7322 6.93145 10.2639 6.62796C10.7955 6.32447 11.3978 6.16535 12.0105 6.16651C12.6233 6.16767 13.225 6.32908 13.7554 6.63458C14.2859 6.94009 14.7266 7.37899 15.0335 7.9074C15.3403 8.43582 15.5025 9.03522 15.5039 9.64569C15.5053 10.2562 15.3458 10.8563 15.0414 11.3861C14.7369 11.9159 14.2983 12.3568 13.7692 12.6647C13.5645 12.8132 13.4003 13.0101 13.2913 13.2378C13.1824 13.4655 13.1322 13.7167 13.1453 13.9685V14.3931C13.1373 14.6894 13.0136 14.9708 12.8004 15.1776C12.5872 15.3843 12.3014 15.4999 12.0039 15.4998Z" fill="currentColor"/>\
								<path d="M12.0026 18.9998C12.6469 18.9998 13.1693 18.4775 13.1693 17.8332C13.1693 17.1888 12.6469 16.6665 12.0026 16.6665C11.3583 16.6665 10.8359 17.1888 10.8359 17.8332C10.8359 18.4775 11.3583 18.9998 12.0026 18.9998Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>\
						<a href="javascript:void(0);" data-id="' +
								data +
								'" data-url="' +
								full.destroy_url +
								'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title="Delete Service Provider">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
									<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
									<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>'
							);
						} else if (full.flag == "4") {
							return (
								' <a href="' +
								full.show_url +
								'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
						<i class="fa-solid fa-eye"></i>\
						</a>\
						<a href="javascript:void(0);" data-url="' +
								full.verify_url +
								'"onClick="changeStatusVerify(this)" data-status="Verify" class="btn btn-sm btn-icon btn-light-success btn-active-success" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Verify">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
								<path opacity="0.3" d="M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor"/>\
								<path d="M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>\
						<a href="javascript:void(0);" data-url="' +
								full.verify_url +
								'" onClick="changeStatusVerify(this)" data-status="Reject" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Reject">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
								<path opacity="0.3" d="M6 19.7C5.7 19.7 5.5 19.6 5.3 19.4C4.9 19 4.9 18.4 5.3 18L18 5.3C18.4 4.9 19 4.9 19.4 5.3C19.8 5.7 19.8 6.29999 19.4 6.69999L6.7 19.4C6.5 19.6 6.3 19.7 6 19.7Z" fill="currentColor"/>\
								<path d="M18.8 19.7C18.5 19.7 18.3 19.6 18.1 19.4L5.40001 6.69999C5.00001 6.29999 5.00001 5.7 5.40001 5.3C5.80001 4.9 6.40001 4.9 6.80001 5.3L19.5 18C19.9 18.4 19.9 19 19.5 19.4C19.3 19.6 19 19.7 18.8 19.7Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>'
							);
						} else {
							return (
								'<a href="' +
								full.show_url +
								'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
						<i class="fa-solid fa-eye"></i>\
						</a>\
						<a href="javascript:void(0);" data-id="' +
								data +
								'" data-url="' +
								full.destroy_url +
								'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Delete Service Provider">\
								<span class="svg-icon">\
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
										<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
										<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
										<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
									</svg>\
								</span>\
							</a>'
							);
						}
					} else if (full.verify == "1") {
						return (
							'<a href="' +
							full.show_url +
							'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
					<i class="fa-solid fa-eye"></i>\
					</a>\
					<a href="' +
							full.edit_url +
							'" class="btn btn-sm btn-icon btn-light-primary btn-active-primary" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Edit Service Provider">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"/>\
									<path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"/>\
									<path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>\
						<a href="javascript:void(0);" data-id="' +
							data +
							'" data-url="' +
							full.destroy_url +
							'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Delete Service Provider">\
							<span class="svg-icon">\
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
									<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
									<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
									<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
								</svg>\
							</span>\
						</a>'
						);
					} else {
						return (
							'<a href="' +
							full.show_url +
							'" class="btn btn-sm btn-icon btn-light-dark btn-active-dark" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "View Details">\
					<i class="fa-solid fa-eye"></i>\
						</a>\
					<a href="javascript:void(0);" data-id="' +
							data +
							'" data-url="' +
							full.destroy_url +
							'" onClick="destroyFunction(this)" class="btn btn-sm btn-icon btn-light-danger btn-active-danger" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" title = "Delete Service Provider">\
								<span class="svg-icon">\
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
										<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>\
										<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>\
										<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>\
									</svg>\
								</span>\
							</a>'
						);
					}
				},
			},
			{
				width: "75px",
				targets: -2,
				render: function (data, type, full, meta) {
					var status = {
						0: {
							title: "Inactive",
							state: "danger",
						},
						1: {
							title: "Active",
							state: "success",
						},
					};
					if (typeof status[data] === "undefined") {
						return data;
					}

					if (full.verify == "0") {
						if (full.flag == "3" && full.need_help == "1") {
							return '<div class="badge badge-light-warning fw-bold">Need Help</div>';
						} else if (full.flag == "4") {
							return '<div class="badge badge-light-danger fw-bold">Unverified</div>';
						} else {
							return '<div class="badge badge-light-warning fw-bold">Profile Not Completed</div>';
						}
					} else if (full.verify == "1") {
						return (
							'<a href="javascript:void(0)" data-url="' +
							full.status_change_url +
							'" data-status="' +
							data +
							'" onClick="statusChangeFunction(this)"><div class="badge badge-light-' +
							status[data].state +
							' fw-bold">' +
							status[data].title +
							"</div></a>"
						);
					} else {
						return '<div class="badge badge-light-danger fw-bold">Rejected</div>';
					}
				},
			},
		],
	});
	$("#datatable_serviceProvider_search").on("keyup", function (e) {
		userTable.search(e.target.value, "search").draw();
	});
	$("#filter_table_by_verify").on("change", function (e) {
		userTable.search(e.target.value, "filter").draw();
	});
	$("input[type=search]").on("search", function () {
		userTable.search("").draw();
	});

	const documentTitle = "Service Provider Report";
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
					$("#serviceProvider_table").DataTable().ajax.reload();
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

var statusChangeAjax = null;
function statusChangeFunction(e) {
	var url = $(e).attr("data-url");
	var status = $(e).attr("data-status");
	Swal.fire({
		title: "Are you sure?",
		text: "You want to change status!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, change it!",
		customClass: {
			confirmButton: "btn btn-sm btn-success",
			cancelButton: "btn btn-sm btn-danger",
		},
	}).then(function (result) {
		if (result.value) {
			$.ajaxSetup({
				headers: {
					"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
						"content"
					),
				},
			});
			document.body.prepend(loadingEl);
			KTApp.showPageLoading();
			statusChangeAjax = $.ajax({
				method: "POST",
				url: url,
				data: {
					status: status,
					_token: csrfToken,
				},
				beforeSend: function() {
					if(statusChangeAjax != null) {
						statusChangeAjax.abort();
					}
				},
				success: function (resultData) {
					$("#serviceProvider_table").DataTable().ajax.reload();
					KTApp.hidePageLoading();
					loadingEl.remove();
					Toast.fire({
						icon: "success",
						title: "<span style='color:black'>The status updated successfully.</span>",
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

var changeStatusVerifyAjax = null;
function changeStatusVerify(e) {
	var url = $(e).attr("data-url");

	var status = $(e).attr("data-status");
	var dataStatus = 0;
	if (status == "Verify") {
		dataStatus = 1;
	} else if (status == "Reject") {
		dataStatus = 2;
	}
	Swal.fire({
		title: "Are you sure?",
		text: "You want to " + status + " this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, " + status + " it!",
		customClass: {
			confirmButton: "btn btn-sm btn-success",
			cancelButton: "btn btn-sm btn-danger",
		},
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
				data: { status: dataStatus },
				url: url,
				beforeSend: function() {
					if(changeStatusVerifyAjax != null) {
						changeStatusVerifyAjax.abort();
					}
				},
				success: function (response) {
					$("#serviceProvider_table").DataTable().ajax.reload();
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
