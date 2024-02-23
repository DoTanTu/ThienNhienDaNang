$(document).ready(function () {
	$('#formPageData').submit(function () {
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
  var dataImages = myDropzone.files.map(x => x.upload.path)
  formData.forEach(element => {
      if (element.name == 'images') {
        element.value = JSON.stringify(dataImages)
      }
      if (element.name == 'html') {
        element.value = fullEditor.root.innerHTML
      }
  });
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
		if (responseText.success == true) {
			window.location.href = "/admin";
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Thêm page không thành công!'
			})
		}
}
});