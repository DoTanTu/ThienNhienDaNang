$(document).ready(function () {
	$('#formAuthentication').submit(function (e) {
	  e.preventDefault();
      $.ajax({ 
          type: "POST",
          url: "/reset-password",
          data: $(this).serialize(),
          success: function(response) {
			if(response.success === true) {
				Swal.fire({
					title: "Mật khẩu đã được gửi về email của bạn.",
					showClass: {
					  popup: `
						animate__animated
						animate__fadeInDown
						animate__faster
					  `
					},
					hideClass: {
					  popup: `
						animate__animated
						animate__fadeOutUp
						animate__faster
					  `
					},
					willClose: () => {
						window.location.href = './'
					  }
				  });
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