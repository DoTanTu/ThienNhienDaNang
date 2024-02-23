$(document).ready(function () {
	$('#formAuthentication').submit(function (e) {
	  e.preventDefault();
      $.ajax({ 
          type: "POST",
          url: "/reset-password",
          data: $(this).serialize(),
          success: function(response) {
			if(response.success === true) {
				window.location.href = "./";
			}else{
				Toast.fire({
					icon: 'error',
					title: 'Thay đổi không thành công!'
				})
			}
          },
          error: function(xhr, status, error) {
			Toast.fire({
				icon: 'error',
				title: 'Đăng ký không thành công!'
			})
          }
      });
	});
});