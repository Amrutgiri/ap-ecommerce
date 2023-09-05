
var currentChatId = '';
jQuery(document).ready(function () {
	socket = io(socketUrl);
	jQuery(".chat-section .chat-messages").animate({ scrollTop: jQuery(".chat-section .chat-messages").prop("scrollHeight") }, 500);

	/* socket.emit('connect_user', { type_id: adminId, type: 'admin' });
	socket.on("connect_user", function (data) { console.log("connect_user", data); });
	socket.on("connect_user_interval", function (data) { console.log("connect_user_interval", data); });
	setInterval(function () {
		socket.emit("connect_user_interval", { type_id: adminId, type: 'admin' });
	}, 25000);
	socket.on("connect_chat_user", function (data) { console.log("connect_chat_user", data); });
	socket.on("disconnect_user", function (data) { console.log("disconnect_user", data); });
	socket.on("disconnect_chat_user_interval", function (data) { console.log("disconnect_chat_user_interval", data); });
	socket.on("receive_message", function (data) { console.log("receive_message", data); }); */
	socket.on("connect_chat_user", function (data) { console.log("connect_chat_user", data); });
	socket.on("receive_message", function (data) {
		if(currentChatId == data.chat_id){
			var element = document.querySelector('#kt_drawer_chat_messenger')
			var messages = element.querySelector('[data-kt-element="messages"]');
			var messageOutTemplate = messages.querySelector('[data-kt-element="template-out"]');
			var messageInTemplate = messages.querySelector('[data-kt-element="template-in"]');
			var message;
			console.log(data);
			if (data.your_type == "sender") {
				// Show example outgoing message
				message = messageOutTemplate.cloneNode(true);
				message.classList.remove('d-none');
				if(data.message_type == "image"){
					message.querySelector('[data-kt-element="message-image"]').setAttribute("src", hostUrl+'/storage/'+data.message);
					message.querySelector('[data-kt-element="message-text"]').classList.add('d-none');
					message.querySelector('[data-kt-element="message-symbol"]').classList.remove('d-none');
				} else {
					message.querySelector('[data-kt-element="message-text"]').innerText = data.message;
					message.querySelector('[data-kt-element="message-symbol"]').classList.add('d-none');
					message.querySelector('[data-kt-element="message-text"]').classList.remove('d-none');
				}
				messages.appendChild(message);
				messages.scrollTop = messages.scrollHeight;
			} else {
				message = messageInTemplate.cloneNode(true);			
				message.classList.remove('d-none');
				if(data.message_type == "image"){
					message.querySelector('[data-kt-element="message-image"]').setAttribute("src", hostUrl+'/storage/'+data.message);
					message.querySelector('[data-kt-element="message-symbol"]').classList.remove('d-none');
					message.querySelector('[data-kt-element="message-text"]').classList.add('d-none');
				} else {
					message.querySelector('[data-kt-element="message-text"]').innerText = data.message;
					message.querySelector('[data-kt-element="message-symbol"]').classList.add('d-none');
					message.querySelector('[data-kt-element="message-text"]').classList.remove('d-none');
				}
				messages.appendChild(message);
				messages.scrollTop = messages.scrollHeight;
			}
			$('[data-kt-inbox-form="dropzone_upload"]').show();
			$('#send_message_text').show();
		}
	});
}).on("click", "#send_message", function () {
	var send_message_text = "";
	var type = "";
	if(jQuery("#send_message_text").val() != ''){
		send_message_text = jQuery("#send_message_text").val();
		type = "text";
	} else if(jQuery("#chat_image").val() != "" && jQuery("#chat_image").val() != "undefined") {
		send_message_text = jQuery("#chat_image").val();
		type = "image";
	} else {
		send_message_text = "";
		type = "";
	}
	const chat_id = $("#kt_drawer_chat_messenger").attr('data-chat-id');
	const chat_type = $("#kt_drawer_chat_messenger").attr('data-chat-type');
	const chat_type_id = $("#kt_drawer_chat_messenger").attr('data-chat-type-id');
	if (send_message_text != "" && type != "") {
		jQuery("#send_message_text").val("");
		jQuery("#chat_image").val("");
		jQuery(".dropzone-items").html("");
		socket.emit("send_message", { chat_id: chat_id, send_by_id: 1, send_by_type: 'admin', message: send_message_text, message_type: type });
	}
}).on("keypress", "#send_message_text", function (event) {
	if (event.which == 13 && !event.shiftKey) {
        event.preventDefault();
		var send_message_text = "";
		var type = "";
		if(jQuery("#send_message_text").val() != ''){
			send_message_text = jQuery("#send_message_text").val();
			type = "text";
		} else if(jQuery("#chat_image").val() != "" && jQuery("#chat_image").val() != "undefined") {
			send_message_text = jQuery("#chat_image").val();
			type = "image";
		} else {
			send_message_text = "";
			type = "";
		}
		const chat_id = $("#kt_drawer_chat_messenger").attr('data-chat-id');
		const chat_type = $("#kt_drawer_chat_messenger").attr('data-chat-type');
		const chat_type_id = $("#kt_drawer_chat_messenger").attr('data-chat-type-id');
		if (send_message_text != "" && type != "") {
			jQuery("#send_message_text").val("");
			jQuery("#chat_image").val("");
			jQuery(".dropzone-items").html("");
			socket.emit("send_message", { chat_id: chat_id, send_by_id: 1, send_by_type: 'admin', message: send_message_text, message_type: type });
		}
	}
});


var chatDrawerAjax = null;
function chatDrawer(e) {
	jQuery("body").addClass("overflow-hidden");
	e.setAttribute("data-kt-indicator", "on");
	const url = $(e).data('url');
	const chat_type_id = $(e).data('chat-type-id');
	const chat_id = $(e).data('chat-id');
	currentChatId = chat_id;
	socket.emit('connect_chat_user', { chat_id: currentChatId, type_id: chat_type_id, type: 'admin' });
	// Ajax Call
	chatDrawerAjax = $.ajax({
		url: url,
		method: "GET",
		data: { "_token": csrfToken },
		beforeSend: function() {
			if(chatDrawerAjax != null) {
				chatDrawerAjax.abort();
			}
		},
		success: function (data) {
			$('#kt_drawer_chat').html(data.html);
			chat_drawer.show();
			var element = document.querySelector('#kt_drawer_chat_messenger')
			var messages = element.querySelector('[data-kt-element="messages"]');
			messages.scrollTop = messages.scrollHeight;
			e.removeAttribute("data-kt-indicator");
			const form = document.querySelector('#kt_drawer_chat_messenger_footer');
			attachImage(form);
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
var myInterval = null;
if(chat_drawer){
	chat_drawer.on("kt.drawer.hide", function (e) {
		jQuery("body").removeClass("overflow-hidden");
		const chat_id = $("#kt_drawer_chat_messenger").attr('data-chat-id');
		const chat_type_id = $("#kt_drawer_chat_messenger").attr('data-chat-type-id');
		socket.emit('disconnect_chat_user', { chat_id: chat_id, type_id: chat_type_id, type: 'admin' });
		clearInterval(myInterval);
	});

	chat_drawer.on("kt.drawer.shown", function () {
		const chat_id = $("#kt_drawer_chat_messenger").attr('data-chat-id');
		const chat_type_id = $("#kt_drawer_chat_messenger").attr('data-chat-type-id');
		myInterval = setInterval(function () {
			socket.emit("connect_chat_user_interval", { chat_id: chat_id, type_id: chat_type_id, type: 'admin' });
		}, 25000);
	});
}

function attachImage(el) {
	// set the dropzone container id
	const id = '[data-kt-inbox-form="dropzone"]';
	const dropzone = el.querySelector(id);
	const uploadButton = el.querySelector('[data-kt-inbox-form="dropzone_upload"]');
	var target = document.querySelector("#kt_drawer_chat_messenger");
	blockUI = new KTBlockUI(target);

	// set the preview element template
	var previewNode = dropzone.querySelector(".dropzone-item");
	previewNode.id = "";
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);
	var fileList = new Array;
	var i = 0;

	var myDropzone = new Dropzone(id, { // Make the whole body a dropzone
		url: hostUrl + "/api/single/image/upload", // Set the url for your upload script location
		method: 'post',
		parallelUploads: 200,
		acceptedFiles: ".jpeg,.jpg,.png",
		paramName: "image",
		params: {
			'folder_type': 'chat'
		},
		maxFiles: 200,
		maxFilesize: 50, // Max filesize in MB
		dictRemoveFileConfirmation: "Are you sure? You won't be able to revert this!",
		previewTemplate: previewTemplate,
		previewsContainer: id + " .dropzone-items", // Define the container to display the previews
		clickable: uploadButton, // Define the element that should be used as click trigger to select files.
		headers: {
			'X-CSRF-TOKEN': csrfToken,
			'KEY': 'Fixr@123*'
		},
	});


	myDropzone.on("addedfile", function (file) {
		// Hookup the start button
		const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
		dropzoneItems.forEach(dropzoneItem => {
			// dropzoneItem.style.display = '';
		});
		$('#send_message_text').hide();
	});

	// Update the total progress bar
	myDropzone.on("totaluploadprogress", function (progress) {
		const progressBars = dropzone.querySelectorAll('.progress-bar');
		progressBars.forEach(progressBar => {
			progressBar.style.width = progress + "%";
		});
	});

	myDropzone.on("sending", function (file) {
		uploadButton.style.display = "none";
		const dropzoneImage = dropzone.querySelector('img[data-dz-image]');
		dropzoneImage.setAttribute("src", file.dataURL);
		// Activate indicator
		el.querySelector('#send_message').setAttribute("data-kt-indicator", "on");
		// Show the total progress bar when upload starts
		const progressBars = dropzone.querySelectorAll('.progress-bar');
		progressBars.forEach(progressBar => {
			progressBar.style.opacity = "1";
		});
	});

	// Hide the total progress bar when nothing"s uploading anymore
	myDropzone.on("complete", function (progress) {
		const progressBars = dropzone.querySelectorAll('.dz-complete');
		// Activate indicator
		el.querySelector('#send_message').removeAttribute("data-kt-indicator");
		setTimeout(function () {
			progressBars.forEach(progressBar => {
				progressBar.querySelector('.progress-bar').style.opacity = "0";
				progressBar.querySelector('.progress').style.opacity = "0";
			});
		}, 300);
		
		const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
		dropzoneItems.forEach(dropzoneItem => {
			dropzoneItem.style.display = '';
		});
	});

	myDropzone.on("success", function(file, response) {
		const progressBars = dropzone.querySelector('.dropzone-delete');
		progressBars.setAttribute("dz-remove-url", response.data);
		const dropzoneImage = dropzone.querySelector('img[data-dz-image]');
		jQuery("#send_message_text").val("");
		fileList[i] = {
			"serverFileName": response,
			"fileName": file.name,
			"fileId": i
		};
		i += 1;

		const ele = document.createElement("input"); // or have the hidden field in the form already
		ele.name = "chat_img";
		ele.type = "hidden";
		ele.id = "chat_image";
		ele.value = response.data; // or data.approval if you have { "approval"="yes" } as return value
		progressBars.appendChild(ele);
		dropzoneImage.setAttribute("src", file.dataURL);

	});
	removeFileAjax = null;
	// On all files removed
	myDropzone.on("removedfile", function(file, response) {
		
		blockUI.block();
		const progressBars = dropzone;
		var rmvFile = "";
		for (var f = 0; f < fileList.length; f++) {
			if (fileList[f].fileName == file.name) {
				rmvFile = fileList[f].serverFileName;
			}
		}
		setTimeout(function() {
			var category_image_url = rmvFile.data;
			if (file.status == 'success') {
				removeFileAjax = $.ajax({
					method: "POST",
					url: hostUrl + "/api/single/image/delete",
					data: {
						path: category_image_url,
						"_token": csrfToken
					},
					headers: {
						'KEY': 'Fixr@123*'
					},
					beforeSend: function() {
						if(removeFileAjax != null) {
							removeFileAjax.abort();
						}
					},
					success: function(resultData) {
						Toast.fire({
							icon: 'success',
							title: "<span style='color:black'>" + resultData
								.message + "</span>",
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
				})
			}
		}, 500);
		uploadButton.style.display = "";
		$('#send_message_text').show();
	});
}