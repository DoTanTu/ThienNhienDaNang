$(document).ready(function () {
	$('#formAuthentication').submit(function () {
		var options = {
				beforeSubmit: showRequest, // pre-submit callback
				success: showResponse // post-submit callback
		};

		$(this).ajaxSubmit(options);
		// always return false to prevent standard browser submit and page navigation
		return false;
  });

// pre-submit callback
function showRequest(formData, jqForm, options) {
	 
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
		if (responseText.success == true) {
			window.location.href = "./";
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Đăng nhập không thành công!'
			})
		}
}
});