$(document).ready(function () {
	$('#editUserForm').submit(function () {
		var options = {
				beforeSubmit: showRequest, // pre-submit callback
				success: showResponse // post-submit callback
		};

		$(this).ajaxSubmit(options);
		// always return false to prevent standard browser submit and page navigation
		return false;
  });

  $('#formAuthentication').submit(function () {
	var options = {
			beforeSubmit: showRequestAuthen, // pre-submit callback
			success: showResponseChangePassword // post-submit callback
	};

	$(this).ajaxSubmit(options);
	// always return false to prevent standard browser submit and page navigation
	return false;
});

// pre-submit callback
function showRequest(formData, jqForm, options) {
    formData.forEach((element) => {
      if (element.name == 'avatar') {
		let path = ""
		try {
			path = myDropzone.files[0].upload.path
		}catch(error){}
        element.value = path
      }
    });
}

function showRequestAuthen(formData, jqForm, options) {
   
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
		if (responseText.success == true) {
           window.location.reload();
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Chỉnh sửa không thành công!'
			})
		}
}

function showResponseChangePassword(responseText, statusText, xhr, $form) {
	if (responseText.success == true) {
		Toast.fire({
			icon: 'success',
			title: 'Cập nhật thành công!'
		})
	}else{
		Toast.fire({
			icon: 'error',
			title: 'Cập nhật không thành công!'
		})
	}
}

});
